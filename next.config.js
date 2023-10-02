/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  // allow cloudinary images
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
