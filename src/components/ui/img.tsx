import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Custom loader for Cloudinary / CDN with q=70 and AVIF/WebP auto-format
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const q = quality || 70;
  if (src.startsWith("https://res.cloudinary.com/")) {
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      return `${parts[0]}/upload/w_${width},q_${q},f_auto/${parts[1]}`;
    }
  }
  return src;
}

export type ImgProps = Omit<ImageProps, "alt"> & {
  alt: string; // Strictly required alt prop (omitting is a type error)
  className?: string;
};

export function Img({
  src,
  alt,
  width,
  height,
  fill,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1240px",
  quality = 70,
  className,
  priority = false,
  ...props
}: ImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loader={typeof src === "string" && src.startsWith("https://res.cloudinary.com/") ? cloudinaryLoader : undefined}
      className={cn("object-cover transition-opacity duration-300", className)}
      {...props}
    />
  );
}
