import type { NextConfig } from "next";

// Static export so the site can be served from GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is set to "/claudebuild-healthcare" in the Pages workflow.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
