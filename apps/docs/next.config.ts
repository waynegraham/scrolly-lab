import type { NextConfig } from "next";

const repo = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo || undefined,
  assetPrefix: repo ? `${repo}/` : undefined
};

export default nextConfig;
