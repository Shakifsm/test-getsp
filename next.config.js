/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ibb.co', 'ecom2021.s3.ap-south-1.amazonaws.com', 's3.amazonaws.com', 'graph.facebook.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
