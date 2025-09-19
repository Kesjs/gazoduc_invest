/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['pskiaoavhmpunojjilma.supabase.co'],
    unoptimized: true, // Désactive l'optimisation d'image si non nécessaire
  },
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  // Configuration pour ngrok
  publicRuntimeConfig: {
    // URL de base pour les requêtes API
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'  // URL de développement local
      : process.env.NEXT_PUBLIC_VERCEL_URL || 'https://your-ngrok-url.ngrok.io',  // URL de production ou ngrok
  },
  
  // Redirections personnalisées
  // (Aucune redirection automatique configurée)

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
