import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function Photo({ src, alt, className, imageClassName, priority = false, sizes }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 40vw, 100vw"}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
