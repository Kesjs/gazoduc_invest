import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiMail, FiLock, FiPhone, FiUser, FiArrowLeft } from 'react-icons/fi';

type AuthFormProps = {
  type: 'signin' | 'signup' | 'forgot-password' | 'reset-password';
};

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  const { signIn, signUp, resetPassword } = useAuth();

  const isSignIn = type === 'signin';
  const isSignUp = type === 'signup';
  const isForgotPassword = type === 'forgot-password';
  const isResetPassword = type === 'reset-password';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        router.push('/dashboard');
      } 
      
      else if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        const { error } = await signUp(email, password, phone);
        if (error) throw error;
        setMessage('Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.');
      } 
      
      else if (isForgotPassword) {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setMessage('Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.');
      }
      
      // Handle reset password (you'll need to implement this in your auth context)
      // else if (isResetPassword) { ... }
      
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <FiArrowLeft className="mr-2" /> Retour à l'accueil
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isSignIn && 'Connectez-vous à votre compte'}
            {isSignUp && 'Créez votre compte'}
            {isForgotPassword && 'Réinitialiser votre mot de passe'}
            {isResetPassword && 'Définir un nouveau mot de passe'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn && 'Ou '}
            {isSignIn && (
              <Link href="/auth/signup" className="font-medium text-primary hover:text-primary-dark">
                créez un compte
              </Link>
            )}
            {isSignUp && 'Déjà inscrit ? '}
            {isSignUp && (
              <Link href="/auth/signin" className="font-medium text-primary hover:text-primary-dark">
                Connectez-vous
              </Link>
            )}
            {isForgotPassword && 'Entrez votre email pour recevoir un lien de réinitialisation'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{message}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                  placeholder="Votre adresse email"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required={isSignUp}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                    {isSignUp && ' (minimum 8 caractères)'}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      required
                      minLength={isSignUp ? 8 : undefined}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder={isSignUp ? 'Créez un mot de passe sécurisé' : 'Votre mot de passe'}
                    />
                  </div>
                </div>

                {isSignUp && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmez le mot de passe
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                        placeholder="Confirmez votre mot de passe"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isSignIn && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Chargement...</span>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-primary-light group-hover:text-primary-lighter" />
                </span>
              )}
              {isSignIn && 'Se connecter'}
              {isSignUp && 'Créer un compte'}
              {isForgotPassword && 'Envoyer le lien de réinitialisation'}
              {isResetPassword && 'Réinitialiser le mot de passe'}
            </button>
          </div>
        </form>

        {isSignIn && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuez avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="sr-only">Se connecter avec Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
