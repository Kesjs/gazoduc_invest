import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon, DocumentTextIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "Comment créer un nouveau compte ?",
    answer: "Pour créer un compte, cliquez sur le bouton 'S\'inscrire' en haut à droite de la page d'accueil et suivez les instructions. Vous devrez fournir une adresse email valide et créer un mot de passe sécurisé."
  },
  {
    question: "Comment réinitialiser mon mot de passe ?",
    answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion. Un email vous sera envoyé avec un lien pour réinitialiser votre mot de passe."
  },
  {
    question: "Comment effectuer un dépôt ?",
    answer: "Connectez-vous à votre compte, allez dans la section 'Portefeuille' et cliquez sur 'Déposer'. Choisissez votre méthode de paiement préférée et suivez les instructions à l'écran."
  },
  {
    question: "Quels sont les frais de transaction ?",
    answer: "Les frais de transaction varient en fonction de la méthode de paiement et du montant. Vous pouvez consulter nos frais dans la section 'Tarifs' du site web."
  },
  {
    question: "Comment contacter le support client ?",
    answer: "Vous pouvez nous contacter 24/7 via le formulaire de contact sur cette page, par email à support@votresite.com ou par téléphone au +33 1 23 45 67 89."
  }
];

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Formulaire soumis :', contactForm);
    alert('Votre message a été envoyé avec succès !');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Aide & Support</h1>
        <p className="mt-2 text-sm text-gray-600">
          Trouvez des réponses à vos questions ou contactez notre équipe de support
        </p>
        
        <div className="mt-8 space-y-8">
          {/* Section FAQ */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <QuestionMarkCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Questions fréquemment posées</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Consultez notre FAQ pour trouver rapidement des réponses à vos questions
              </p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                    <ChevronDownIcon 
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {activeFaq === index && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section Contact */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Contactez-nous</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Notre équipe est là pour vous aider. Remplissez le formulaire ci-dessous.
              </p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="account">Problème de compte</option>
                      <option value="payment">Paiement et facturation</option>
                      <option value="technical">Problème technique</option>
                      <option value="other">Autre question</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Section Contact rapide */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Autres moyens de nous contacter</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-md">
                    <PhoneIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Téléphone</h3>
                    <p className="mt-1 text-sm text-gray-500">+33 1 23 45 67 89</p>
                    <p className="mt-1 text-xs text-gray-400">Lun-Ven, 9h-18h (CET)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-md">
                    <EnvelopeIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-sm text-gray-500">support@votresite.com</p>
                    <p className="mt-1 text-xs text-gray-400">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-md">
                    <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Centre d'aide</h3>
                    <p className="mt-1 text-sm text-gray-500">Consultez notre base de connaissances</p>
                    <a href="#" className="mt-1 inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-500">
                      Accéder au centre d'aide
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
