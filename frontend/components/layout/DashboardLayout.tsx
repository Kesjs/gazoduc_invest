import { Fragment, ReactNode, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const navigation = [
  { 
    name: 'Tableau de bord', 
    href: '/dashboard', 
    icon: HomeIcon, 
    current: true,
    description: 'Vue d\'ensemble de votre activité'
  },
  { 
    name: 'Investissements', 
    href: '/dashboard/investments', 
    icon: CurrencyDollarIcon, 
    current: false,
    description: 'Gérez vos investissements et consultez les performances'
  },
  { 
    name: 'Transactions', 
    href: '/dashboard/transactions', 
    icon: CreditCardIcon, 
    current: false,
    description: 'Historique de toutes vos opérations financières'
  },
  { 
    name: 'Parrainage', 
    href: '/dashboard/referrals', 
    icon: UserGroupIcon, 
    current: false,
    description: 'Parrainez des amis et gagnez des récompenses'
  },
  { 
    name: 'Rapports', 
    href: '/dashboard/reports', 
    icon: ChartBarIcon, 
    current: false,
    description: 'Analyses et rapports détaillés de votre portefeuille'
  },
  { 
    name: 'Documents', 
    href: '/dashboard/documents', 
    icon: DocumentTextIcon, 
    current: false,
    description: 'Téléchargez vos documents importants et factures'
  },
];

const settingsNavigation = [
  { 
    name: 'Profil', 
    href: '/dashboard/profile', 
    icon: UserCircleIcon, 
    current: false,
    description: 'Gérez vos informations personnelles'
  },
  { 
    name: 'Sécurité', 
    href: '/dashboard/security', 
    icon: ShieldCheckIcon, 
    current: false,
    description: 'Sécurisez votre compte et vérifiez les connexions'
  },
  { 
    name: 'Préférences', 
    href: '/dashboard/settings', 
    icon: Cog6ToothIcon, 
    current: false,
    description: 'Personnalisez votre expérience utilisateur'
  },
  { 
    name: 'Aide & Support', 
    href: '/dashboard/help', 
    icon: QuestionMarkCircleIcon, 
    current: false,
    description: 'Centre d\'aide et support client'
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { isInstallable, installApp } = usePWAInstall();

  // Update navigation active state based on current route
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: router.pathname === item.href,
  }));

  const updatedSettingsNavigation = settingsNavigation.map(item => ({
    ...item,
    current: router.pathname === item.href,
  }));

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Fermer la barre latérale</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <h1 className="text-white text-xl font-bold">Gazoduc Invest</h1>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-1">
                      <li>
                        <div className="px-3 py-2 text-xs font-semibold text-primary-200 uppercase tracking-wider">
                          Navigation
                        </div>
                        <ul role="list" className="mt-1 space-y-1">
                          {updatedNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-primary-dark text-white'
                                    : 'text-primary-100 hover:bg-primary-dark hover:text-white',
                                  'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors duration-150'
                                )}
                                onClick={() => setSidebarOpen(false)}
                                title={item.description}
                              >
                                <div className={classNames(
                                  item.current 
                                    ? 'bg-primary-600 text-white' 
                                    : 'bg-primary-700/50 text-primary-200 group-hover:bg-primary-600 group-hover:text-white',
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg'
                                )}>
                                  <item.icon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <span className="truncate">{item.name}</span>
                                {item.current && (
                                  <span className="ml-auto inline-block h-2 w-2 rounded-full bg-white"></span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      
                      <li className="mt-2">
                        <button 
                          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                          className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-primary-200 uppercase tracking-wider hover:text-white focus:outline-none"
                        >
                          <span>Paramètres</span>
                          <ChevronDownIcon 
                            className={`h-4 w-4 text-primary-300 transition-transform duration-200 ${isSettingsOpen ? 'transform rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        <Transition
                          show={isSettingsOpen}
                          enter="transition-all duration-200 ease-in-out"
                          enterFrom="opacity-0 max-h-0"
                          enterTo="opacity-100 max-h-96"
                          leave="transition-all duration-200 ease-in-out"
                          leaveFrom="opacity-100 max-h-96"
                          leaveTo="opacity-0 max-h-0"
                        >
                          <div className="overflow-hidden">
                            <ul role="list" className="mt-1 space-y-1">
                            {updatedSettingsNavigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-primary-dark text-white'
                                      : 'text-primary-100 hover:bg-primary-dark hover:text-white',
                                    'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors duration-150'
                                  )}
                                  onClick={() => setSidebarOpen(false)}
                                  title={item.description}
                                >
                                  <div className={classNames(
                                    item.current 
                                      ? 'bg-primary-600 text-white' 
                                      : 'bg-primary-700/50 text-primary-200 group-hover:bg-primary-600 group-hover:text-white',
                                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg'
                                  )}>
                                    <item.icon className="h-5 w-5" aria-hidden="true" />
                                  </div>
                                  <span className="truncate">{item.name}</span>
                                  {item.current && (
                                    <span className="ml-auto inline-block h-2 w-2 rounded-full bg-white"></span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          </div>
                        </Transition>
                      </li>
                      <li className="mt-auto pt-2 border-t border-primary-700/30">
                        <button
                          onClick={handleSignOut}
                          className="group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-primary-100 hover:bg-red-600 hover:bg-opacity-50 hover:text-white transition-colors duration-150"
                          title="Se déconnecter de votre compte"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600/20 text-red-400 group-hover:bg-red-500/30 group-hover:text-white">
                            <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <span>Se déconnecter</span>
                        </button>
                        
                        {isInstallable && (
                          <button
                            onClick={installApp}
                            className="mt-2 group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-primary-100 hover:bg-primary-dark hover:text-white transition-colors duration-150"
                            title="Installer l'application sur votre appareil"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-500/30 group-hover:text-white">
                              <DevicePhoneMobileIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <span>Installer l'app</span>
                          </button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-6">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center mr-3">
                <svg className="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3.9c1.1 0 2.1.5 2.8 1.3l6.4 6.4c1.7 1.7 1.7 4.5 0 6.2l-6.4 6.4c-1.7 1.7-4.5 1.7-6.2 0l-6.4-6.4c-1.7-1.7-1.7-4.5 0-6.2l6.4-6.4c.7-.8 1.7-1.3 2.8-1.3zm0-2.9c-1.5 0-2.9.6-4 1.7l-6.4 6.4c-2.3 2.3-2.3 6.1 0 8.4l6.4 6.4c1.1 1.1 2.5 1.7 4 1.7s2.9-.6 4-1.7l6.4-6.4c2.3-2.3 2.3-6.1 0-8.4l-6.4-6.4c-1.1-1.1-2.5-1.7-4-1.7z"/>
                  <path d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                </svg>
              </div>
              <h1 className="text-white text-xl font-bold">Gazoduc Invest</h1>
            </Link>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              <li>
                <div className="px-3 py-2 text-xs font-semibold text-primary-200 uppercase tracking-wider">
                  Navigation
                </div>
                <ul role="list" className="mt-1 space-y-1">
                  {updatedNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-primary-dark text-white'
                            : 'text-primary-100 hover:bg-primary-dark hover:text-white',
                          'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors duration-150'
                        )}
                        title={item.description}
                      >
                        <div className={classNames(
                          item.current 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-primary-700/50 text-primary-200 group-hover:bg-primary-600 group-hover:text-white',
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150'
                        )}>
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="truncate">{item.name}</span>
                        {item.current && (
                          <span className="ml-auto inline-block h-2 w-2 rounded-full bg-white"></span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="mt-2">
                <div className="px-3 py-2 text-xs font-semibold text-primary-200 uppercase tracking-wider">
                  Paramètres
                </div>
                <ul role="list" className="mt-1 space-y-1">
                  {updatedSettingsNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-primary-dark text-white'
                            : 'text-primary-100 hover:bg-primary-dark hover:text-white',
                          'group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 transition-colors duration-150'
                        )}
                        title={item.description}
                      >
                        <div className={classNames(
                          item.current 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-primary-700/50 text-primary-200 group-hover:bg-primary-600 group-hover:text-white',
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150'
                        )}>
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="truncate">{item.name}</span>
                        {item.current && (
                          <span className="ml-auto inline-block h-2 w-2 rounded-full bg-white"></span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="mt-auto pt-4 border-t border-primary-700/30">
                <div className="px-3 py-2">
                  <div className="bg-primary-700/30 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-white">Besoin d'aide ?</h3>
                    <p className="mt-1 text-xs text-primary-100">Notre équipe est là pour vous aider à tout moment.</p>
                    <div className="mt-3 flex">
                      <Link
                        href="/dashboard/help"
                        className="text-xs font-medium text-primary-200 hover:text-white flex items-center"
                      >
                        <span>Contacter le support</span>
                        <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="mt-2 group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-primary-100 hover:bg-red-600 hover:bg-opacity-50 hover:text-white transition-colors duration-150"
                  title="Se déconnecter de votre compte"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600/20 text-red-400 group-hover:bg-red-500/30 group-hover:text-white">
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span>Se déconnecter</span>
                </button>
                
                {isInstallable && (
                  <button
                    onClick={installApp}
                    className="mt-2 group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-primary-100 hover:bg-emerald-600 hover:bg-opacity-20 hover:text-white transition-colors duration-150"
                    title="Installer l'application sur votre appareil"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-500/30 group-hover:text-white">
                      <DevicePhoneMobileIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span>Installer l'application</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div 
          className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm transition-all duration-200 sm:gap-x-6 sm:px-6 lg:px-8 ${
            scrolled ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              {/* Search bar can be added here */}
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {isInstallable && (
                <button
                  onClick={installApp}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-800 bg-primary-50 rounded-full hover:bg-primary-100 transition-colors"
                >
                  <DevicePhoneMobileIcon className="h-5 w-5" />
                  <span>Installer l'application</span>
                </button>
              )}
              
              <button
                type="button"
                className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Ouvrir le menu utilisateur</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      {user?.email}
                    </span>
                    <svg
                      className="ml-2 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboard/profile"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Votre profil
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboard/settings"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Paramètres
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Se déconnecter
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="min-h-[calc(100vh-4rem)] py-6 sm:py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">© {new Date().getFullYear()} Gazoduc Invest. Tous droits réservés.</span>
                <div className="hidden md:block h-4 w-px bg-gray-200"></div>
                <div className="flex space-x-4">
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Conditions d'utilisation</Link>
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Politique de confidentialité</Link>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
