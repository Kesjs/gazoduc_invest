/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pskiaoavhmpunojjilma.supabase.co'],
    unoptimized: true, // Disable image optimization if not needed
  },
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },

  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },

  // Disable ETag generation
  generateEtags: false,

  // Enable production browser source maps
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
