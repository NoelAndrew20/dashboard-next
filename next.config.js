/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/Login', 
        permanent: true, 
      },
    ]
  },
}

module.exports = nextConfig
