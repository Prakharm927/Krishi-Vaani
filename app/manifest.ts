import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Krishi Vaani - Voice-First Agricultural Advisory",
    short_name: "Krishi Vaani",
    description: "AI-powered agricultural advice through voice in 10+ Indian languages",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5eb",
    theme_color: "#3c7f3c",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
