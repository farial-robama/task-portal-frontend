import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Taskboard — Project & Task Management",
    short_name: "Taskboard",
    description: "Track project work from open to done.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F3F4F7",
    theme_color: "#245A52",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}