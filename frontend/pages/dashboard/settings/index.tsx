import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { SunIcon, MoonIcon, LanguageIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [profileVisibility, setProfileVisibility] = useState('public');

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Préférences</h1>
        <p className="mt-2 text-sm text-gray-600">
          Personnalisez votre expérience utilisateur selon vos préférences
        </p>
        
        <div className="mt-8 space-y-6">
          {/* Thème */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              {theme === 'light' ? (
                <SunIcon className="h-6 w-6 text-yellow-500 mr-2" />
              ) : (
                <MoonIcon className="h-6 w-6 text-indigo-600 mr-2" />
              )}
              <h2 className="text-lg font-medium text-gray-900">Apparence</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Personnalisez l'apparence de l'application
            </p>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thème
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 border rounded-lg text-left ${theme === 'light' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-md mr-3">
                      <SunIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Clair</p>
                      <p className="text-sm text-gray-500">Thème clair par défaut</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 border rounded-lg text-left ${theme === 'dark' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-800 rounded-md mr-3">
                      <MoonIcon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sombre</p>
                      <p className="text-sm text-gray-500">Pour une utilisation nocturne</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Langue */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <LanguageIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Langue</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Choisissez votre langue préférée
            </p>
            
            <div className="mt-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <BellIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Contrôlez comment vous recevez les notifications
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Activer les notifications par email</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.email ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Notifications push</p>
                  <p className="text-sm text-gray-500">Recevoir des notifications sur cet appareil</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('push')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Activer les notifications push</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.push ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS</p>
                  <p className="text-sm text-gray-500">Recevoir des notifications par SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('sms')}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Activer les notifications SMS</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.sms ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Confidentialité */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <UserCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Confidentialité</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Contrôlez qui peut voir votre profil et vos informations
            </p>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibilité du profil
              </label>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="public">Public</option>
                <option value="friends">Amis uniquement</option>
                <option value="private">Privé</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {profileVisibility === 'public' 
                  ? 'Votre profil est visible par tout le monde.'
                  : profileVisibility === 'friends'
                  ? 'Seuls vos amis peuvent voir votre profil.'
                  : 'Votre profil est privé et invisible pour les autres utilisateurs.'
                }
              </p>
            </div>
          </div>

          {/* Bouton de sauvegarde */}
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
