/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? "export" : "standalone",
  ...(isStaticExport && {
    basePath: "/VibeVault260",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
