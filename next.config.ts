import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Use an explicit absolute path so Next doesn't infer a parent workspace root.
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
