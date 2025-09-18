import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShieldCheckIcon, DevicePhoneMobileIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de changement de mot de passe
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Sécurité</h1>
        <p className="mt-2 text-sm text-gray-600">
          Gérez la sécurité de votre compte et consultez l'activité récente
        </p>
        
        <div className="mt-8 space-y-6">
          {/* Section Mot de passe */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <LockClosedIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Mot de passe</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Mettez à jour votre mot de passe pour sécuriser votre compte.
            </p>
            
            <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          </div>

          {/* Section Authentification à deux facteurs */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Authentification à deux facteurs (2FA)</h2>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  twoFactorEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                <span className="sr-only">Activer l'authentification à deux facteurs</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Ajoutez une couche de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs.
            </p>
            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                <p className="text-sm text-indigo-700">
                  Scannez le code QR avec votre application d'authentification préférée (comme Google Authenticator ou Authy) et entrez le code généré.
                </p>
                <div className="mt-3">
                  {/* Placeholder pour le QR code */}
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-xs text-gray-500">QR Code</span>
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Code de vérification"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Vérifier
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <EnvelopeIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Notifications par email</h2>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
                onClick={() => setEmailNotifications(!emailNotifications)}
              >
                <span className="sr-only">Activer les notifications par email</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Recevez des notifications par email pour les activités importantes sur votre compte.
            </p>
          </div>

          {/* Section Appareils connectés */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <DevicePhoneMobileIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Appareils connectés</h2>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Gérez les appareils qui ont accès à votre compte.
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-md">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">iPhone 13</p>
                    <p className="text-xs text-gray-500">Connecté il y a 2 heures</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-red-600 hover:text-red-500">
                  Déconnecter
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-md">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">MacBook Pro</p>
                    <p className="text-xs text-gray-500">Connecté il y a 2 jours</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-red-600 hover:text-red-500">
                  Déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
