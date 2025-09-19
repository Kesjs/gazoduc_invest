/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactivation de l'export statique pour permettre le chargement des variables d'environnement côté client
  // output: 'export',
  // distDir: 'out',
  images: {
    // unoptimized: true,
    domains: ['pskiaoavhmpunojjilma.supabase.co'],
  },
  trailingSlash: true,
  // Configuration des redirections
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig;
