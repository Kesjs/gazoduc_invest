import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FiCheckCircle, FiDollarSign, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

type Plan = {
  id: string;
  name: string;
  price: number;
  dailyEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  totalEarnings: number;
  fee: number;
  features: string[];
  popular: boolean;
};

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 32,
    dailyEarnings: 0.48,
    weeklyEarnings: 2.4,
    monthlyEarnings: 9.6,
    totalEarnings: 96,
    fee: 0,
    features: [
      'Parfait pour commencer',
      'Retraits quotidiens',
      'Support prioritaire',
      'Accès à la communauté'
    ],
    popular: false
  },
  {
    id: 'croissance',
    name: 'Croissance',
    price: 75,
    dailyEarnings: 1.12,
    weeklyEarnings: 5.6,
    monthlyEarnings: 22.5,
    totalEarnings: 225,
    fee: 0,
    features: [
      'Tout dans Starter',
      'Rendements plus élevés',
      'Analyse mensuelle',
      'Accès aux webinaires'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    dailyEarnings: 14.99,
    weeklyEarnings: 74.95,
    monthlyEarnings: 299.8,
    totalEarnings: 2997,
    fee: 30,
    features: [
      'Tout dans Croissance',
      'Accès VIP',
      'Rencontres trimestrielles',
      'Conseiller dédié'
    ],
    popular: false
  },
  {
    id: 'elite',
    name: 'Élite',
    price: 1999,
    dailyEarnings: 29.99,
    weeklyEarnings: 149.95,
    monthlyEarnings: 599.8,
    totalEarnings: 5997,
    fee: 30,
    features: [
      'Tout dans Premium',
      'Accès exclusif',
      'Événements privés',
      'Support 24/7'
    ],
    popular: false
  }
];

export default function InvestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin?redirect=/invest');
    }
  }, [user, loading, router]);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;
    
    setIsPaying(true);
    
    try {
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would process the payment here
      // const response = await processPayment(selectedPlan, paymentMethod);
      
      setPaymentSuccess(true);
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Investir - Gazoduc Invest</title>
        <meta name="description" content="Choisissez votre plan d'investissement et commencez à générer des revenus passifs avec Gazoduc Invest." />
      </Head>
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Choisissez votre plan d'investissement</h1>
          <p className="mt-1 text-sm text-gray-600">
            Sélectionnez le plan qui correspond à vos objectifs financiers et commencez à générer des revenus passifs.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary transform -translate-y-1' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                    Le plus populaire
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
                  <div className="text-3xl font-bold text-center mb-4">
                    ${plan.price}
                    {plan.fee > 0 && (
                      <span className="text-sm font-normal text-gray-500 block">+ ${plan.fee} de frais</span>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="text-center mb-2">
                      <span className="text-sm text-gray-600">Gains quotidiens:</span>
                      <div className="font-semibold text-lg">${plan.dailyEarnings.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <span className="text-xs text-gray-500 block">Hebdomadaire</span>
                        <span className="font-medium">${plan.weeklyEarnings.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">Mensuel</span>
                        <span className="font-medium">${plan.monthlyEarnings.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-center text-sm">
                      <span className="text-gray-500">Total sur 10 mois:</span>{' '}
                      <span className="font-semibold">${plan.totalEarnings}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <FiCheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-lg font-medium ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Choisir ce plan
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Choisissez votre plan</h3>
                  <p className="text-sm text-gray-600">Sélectionnez le plan qui correspond à vos objectifs financiers.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-medium mb-1">Effectuez le paiement</h3>
                  <p className="text-sm text-gray-600">Paiement sécurisé par carte bancaire ou crypto-monnaie.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Recevez vos gains</h3>
                  <p className="text-sm text-gray-600">Gagnez des revenus passifs quotidiennement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Questions sur les investissements ?</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Notre équipe est là pour vous aider à choisir le meilleur plan en fonction de vos objectifs.</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-600"
                  >
                    Contacter le support <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Confirmer l'investissement</h2>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isPaying}
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {!paymentSuccess ? (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Plan sélectionné:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Montant de l'investissement:</span>
                      <span className="font-medium">${selectedPlan.price}</span>
                    </div>
                    {selectedPlan.fee > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Frais de traitement:</span>
                        <span className="font-medium">${selectedPlan.fee}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total à payer:</span>
                      <span>${selectedPlan.price + selectedPlan.fee}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium mb-2">Gains estimés:</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white p-2 rounded">
                          <div className="text-gray-500">Quotidien</div>
                          <div className="font-medium">${selectedPlan.dailyEarnings.toFixed(2)}</div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-gray-500">Hebdomadaire</div>
                          <div className="font-medium">${selectedPlan.weeklyEarnings.toFixed(2)}</div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-gray-500">Mensuel</div>
                          <div className="font-medium">${selectedPlan.monthlyEarnings.toFixed(2)}</div>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <div className="text-gray-500">Total (10 mois)</div>
                          <div className="font-medium">${selectedPlan.totalEarnings}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Méthode de paiement
                    </label>
                    <div className="space-y-2">
                      <div 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          paymentMethod === 'card' ? 'border-primary bg-primary-50' : 'border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => {}}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                          Carte de crédit/débit
                        </label>
                      </div>
                      
                      <div 
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          paymentMethod === 'crypto' ? 'border-primary bg-primary-50' : 'border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('crypto')}
                      >
                        <input
                          type="radio"
                          id="crypto"
                          name="paymentMethod"
                          checked={paymentMethod === 'crypto'}
                          onChange={() => {}}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="crypto" className="ml-3 block text-sm font-medium text-gray-700">
                          Crypto-monnaie
                        </label>
                      </div>
                      
                      {/* Add more payment methods as needed */}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FiAlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Les investissements sont soumis à des risques. Veuillez lire nos conditions générales avant de procéder.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={isPaying}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={isPaying}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                      {isPaying ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement...
                        </>
                      ) : (
                        `Payer $${selectedPlan.price + selectedPlan.fee}`
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Paiement réussi !</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Votre investissement de ${selectedPlan.price} a été effectué avec succès.
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Vous serez redirigé vers votre tableau de bord dans quelques instants...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
