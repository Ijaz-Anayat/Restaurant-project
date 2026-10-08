import Image from "next/image";
import { heroCopy } from "@/data/hero";

export function StatCounter() {
  const { stat, images } = heroCopy;

  return (
    <div
      data-stat
      className="hero-stat-shadow relative w-full max-w-[240px] rounded-[24px] bg-gradient-to-br from-hero-stat-from to-hero-stat-to px-5 py-4 text-hero-white md:max-w-[190px] md:-mt-14 lg:max-w-[230px]"
    >
      <p className="font-hero text-5xl leading-none tracking-wide md:text-4xl lg:text-6xl">
        <span data-stat-value>0</span>
        <span>{stat.suffix}</span>
      </p>
      <p className="mt-1 max-w-[12rem] text-sm font-semibold text-hero-white">{stat.label}</p>
      <div className="mt-3 flex items-center">
        {images.avatars.map((avatar, index) => (
          <span
            key={avatar.src}
            data-avatar
            className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-hero-white"
            style={{ marginLeft: index === 0 ? 0 : -10 }}
          >
            <Image src={avatar.src} alt={avatar.alt} fill sizes="36px" className="object-cover" />
          </span>
        ))}
      </div>
    </div>
  );
}
