import Image from "next/image";
import { images, type ImageId } from "@/theme/images";

type StillId = {
  [K in ImageId]: (typeof images)[K]["kind"] extends "image" ? K : never;
}[ImageId];

export function ProductStill({
  id,
  alt,
  className,
  priority = false,
  fill = false,
  sizes,
}: {
  id: StillId;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}) {
  const image = images[id];
  if (fill) {
    return (
      <Image
        src={image.src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={className}
      />
    );
  }
  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
