/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // enables static export for browser extensions
  images: { 
    unoptimized: true 
  }, // avoid image optimization
  basePath: "/extension", // routing
};

export default nextConfig;
