import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiClock } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Colonne 1: Logo et description */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                GAZODUC INVEST
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leader de l'investissement dans le Gaz Naturel Liquéfié en Afrique de l'Ouest. 
              Nous offrons des opportunités d'investissement sécurisées et rentables 
              dans le secteur énergétique en pleine croissance.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-yellow-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Liens rapides</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Accueil
              </Link></li>
              <li><Link href="/invest" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Investir
              </Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> À propos
              </Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Contact
              </Link></li>
            </ul>
          </div>
          
          {/* Colonne 3: Liens légaux */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Informations</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Conditions d'utilisation
              </Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Confidentialité
              </Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> FAQ
              </Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center">
                <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2"></span> Blog
              </Link></li>
            </ul>
          </div>
          
          {/* Colonne 4: Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">Nous contacter</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-yellow-400 bg-opacity-10 p-2 rounded-full mr-4 flex-shrink-0">
                  <FiMapPin className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white">Adresse</h5>
                  <p className="text-gray-400 text-sm">Rue 333, Immeuble Le Général<br />Godomey, Cotonou<br />Bénin</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-yellow-400 bg-opacity-10 p-2 rounded-full mr-4 flex-shrink-0">
                  <FiMail className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white">Email</h5>
                  <a href="mailto:contact@gazoduc-invest.bj" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                    contact@gazoduc-invest.bj
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-yellow-400 bg-opacity-10 p-2 rounded-full mr-4 flex-shrink-0">
                  <FiPhone className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white">Téléphone</h5>
                  <a href="tel:+22961234567" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                    +229 61 23 45 67
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-yellow-400 bg-opacity-10 p-2 rounded-full mr-4 flex-shrink-0">
                  <FiClock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-medium text-white">Heures d'ouverture</h5>
                  <p className="text-gray-400 text-sm">
                    Lundi - Vendredi: 08:00 - 18:00<br />
                    Samedi: 09:00 - 13:00<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Gazoduc Invest. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link href="/cookies" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">
                Politique des cookies
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">
                Conditions générales
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-yellow-400 text-sm transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
