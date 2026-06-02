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
  eslint: {
    // Lint is run as a separate `npm run lint` step (and in CI), so we skip the
    // slow inline lint pass during `next build` for faster production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
