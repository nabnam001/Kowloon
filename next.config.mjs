/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static frontend — no backend, no server runtime required.
  output: "export",
  images: {
    // next/image optimization needs a server; with static export we serve files as-is.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
