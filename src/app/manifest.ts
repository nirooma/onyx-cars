import type { MetadataRoute } from "next";
import { brand } from "@/theme/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    start_url: "/",
    display: "standalone",
    background_color: brand.background,
    theme_color: brand.background,
    icons: [
      { src: brand.icons.png512, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: brand.icons.apple, sizes: "180x180", type: "image/png" },
      { src: brand.icons.svg, sizes: "any", type: "image/svg+xml" },
    ],
  };
}
