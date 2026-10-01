import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // NFVCB Pick posters are hosted on Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
