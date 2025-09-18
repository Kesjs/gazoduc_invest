import { useState } from 'react';
import Head from 'next/head';
import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Réinitialisation du mot de passe - Gazoduc Invest</title>
        <meta name="description" content="Réinitialisez votre mot de passe Gazoduc Invest pour retrouver l'accès à votre compte." />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <Link href="/auth/signin" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <FiArrowLeft className="mr-2" /> Retour à la connexion
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Mot de passe oublié ?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>
          
          <AuthForm type="forgot-password" />
          
          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <Link href="/auth/signup" className="font-medium text-primary hover:text-primary-dark">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
