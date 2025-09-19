import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Register service worker only in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        } catch (error) {
          console.error('ServiceWorker registration failed: ', error);
        }
      };
      
      window.addEventListener('load', registerServiceWorker);
      
      return () => {
        window.removeEventListener('load', registerServiceWorker);
      };
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default MyApp;
