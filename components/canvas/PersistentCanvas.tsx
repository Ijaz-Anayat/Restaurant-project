"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Photo } from "@/components/ui/Photo";
import { useWebGL } from "@/hooks/useWebGL";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useExperienceStore } from "@/store/useExperienceStore";

const WebGLCanvas = dynamic(
  () => import("@/components/canvas/WebGLCanvas").then((mod) => mod.WebGLCanvas),
  { ssr: false },
);

export function PersistentCanvas() {
  const pathname = usePathname();
  const webgl = useWebGL();
  const preloaderDone = useExperienceStore((state) => state.preloaderDone);
  const [storyVisible, setStoryVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setStoryVisible(false);
      return;
    }

    const node = document.getElementById("story");
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStoryVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [pathname]);

  const show = storyVisible && pathname === "/";
  const rendering = pathname === "/" && (show || !preloaderDone) && !pageHidden;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      {webgl === false ? (
        <>
          <Photo src={site.heroPoster} alt="" className="h-full w-full" priority sizes="100vw" />
          <div className="absolute inset-0 bg-charcoal/45" />
        </>
      ) : null}
      {webgl === true ? <WebGLCanvas active={rendering} /> : null}
    </div>
  );
}
