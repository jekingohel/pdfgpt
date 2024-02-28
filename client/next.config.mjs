/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_APP_API_ENDPOINT:
      "https://47sb4qx745.us-east-1.awsapprunner.com",
  },
};

export default nextConfig;
