import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // NFVCB Pick posters are hosted on Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
      // News covers and profile photos are served from Convex file storage.
      { protocol: "https", hostname: "*.convex.cloud" },
    ],
  },
};

export default nextConfig;
