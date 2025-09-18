import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/auth/AuthForm';
import Head from 'next/head';

export default function SignUp() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { ref } = router.query; // For referral links

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Créer un compte - Gazoduc Invest</title>
        <meta name="description" content="Créez votre compte Gazoduc Invest et commencez à investir dans le Gaz Naturel Liquéfié dès aujourd'hui." />
      </Head>
      <AuthForm type="signup" />
    </>
  );
}
