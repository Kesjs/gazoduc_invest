import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FiDollarSign, FiTrendingUp, FiUsers, FiCreditCard, FiClock, FiAlertCircle } from 'react-icons/fi';

type InvestmentPlan = {
  id: string;
  name: string;
  amount: number;
  dailyEarnings: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
};

type ReferralStats = {
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
};

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [investments, setInvestments] = useState<InvestmentPlan[]>([]);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarned: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    if (loading) return;
    
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock investments data
      const mockInvestments: InvestmentPlan[] = [
        {
          id: '1',
          name: 'Starter',
          amount: 32,
          dailyEarnings: 0.48,
          startDate: '2023-10-15',
          endDate: '2024-08-15',
          status: 'active',
        },
        // Add more mock investments as needed
      ];
      
      // Mock referral stats
      const mockReferralStats: ReferralStats = {
        totalReferrals: 5,
        activeReferrals: 3,
        totalEarned: 124.50,
      };
      
      setInvestments(mockInvestments);
      setReferralStats(mockReferralStats);
      setIsLoading(false);
    };
    
    fetchData();
  }, [loading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate total earnings and next payout
  const totalEarnings = investments.reduce((sum, inv) => sum + (inv.dailyEarnings * 30), 0);
  const nextPayout = new Date();
  nextPayout.setDate(nextPayout.getDate() + 1);
  nextPayout.setHours(0, 0, 0, 0);

  return (
    <DashboardLayout>
      <Head>
        <title>Tableau de bord - Gazoduc Invest</title>
      </Head>
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-600">
            Bienvenue, {user?.email}. Voici un aperçu de vos activités.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Balance */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 p-3 rounded-md">
                    <FiDollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Solde total</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">${(totalEarnings).toFixed(2)}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span>+3.2%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-dark">
                    Voir toutes les transactions
                  </a>
                </div>
              </div>
            </div>
            
            {/* Next Payout */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
                    <FiClock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Prochain paiement</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {nextPayout.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="text-gray-600">
                    Paiement quotidien estimé: <span className="font-medium">${(investments.reduce((sum, inv) => sum + inv.dailyEarnings, 0)).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Active Investments */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                    <FiTrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Investissements actifs</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{investments.length}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span>+{investments.length} ce mois-ci</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-dark">
                    Voir les détails
                  </a>
                </div>
              </div>
            </div>
            
            {/* Referral Stats */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-md">
                    <FiUsers className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Parrainage</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{referralStats.totalReferrals}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span>+{referralStats.activeReferrals} actifs</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href="/dashboard/referrals" className="font-medium text-primary hover:text-primary-dark">
                    Voir le programme
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium text-gray-900">Mes investissements</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Un aperçu de tous vos investissements actifs et terminés.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
                  onClick={() => router.push('/invest')}
                >
                  Nouvel investissement
                </button>
              </div>
            </div>
            
            {investments.length === 0 ? (
              <div className="mt-8 text-center bg-white shadow rounded-lg p-12">
                <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun investissement</h3>
                <p className="mt-1 text-sm text-gray-500">Commencez par effectuer votre premier investissement.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => router.push('/invest')}
                  >
                    <FiTrendingUp className="-ml-1 mr-2 h-5 w-5" />
                    Investir maintenant
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Plan
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Montant
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Gains quotidiens
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Date de début
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Date de fin
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Statut
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {investments.map((investment) => (
                            <tr key={investment.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {investment.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                ${investment.amount.toFixed(2)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                ${investment.dailyEarnings.toFixed(2)}/jour
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {new Date(investment.startDate).toLocaleDateString('fr-FR')}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {new Date(investment.endDate).toLocaleDateString('fr-FR')}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  investment.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {investment.status === 'active' ? 'Actif' : 'Terminé'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="mt-12">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <button
                  onClick={() => router.push('/invest')}
                  className="bg-white overflow-hidden shadow rounded-lg p-6 text-left hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                      <FiTrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Nouvel investissement</h3>
                      <p className="mt-1 text-sm text-gray-500">Investissez dans un nouveau plan</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => router.push('/dashboard/withdraw')}
                  className="bg-white overflow-hidden shadow rounded-lg p-6 text-left hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
                      <FiDollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Retirer des fonds</h3>
                      <p className="mt-1 text-sm text-gray-500">Retirez vos gains</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => router.push('/dashboard/referrals')}
                  className="bg-white overflow-hidden shadow rounded-lg p-6 text-left hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-md">
                      <FiUsers className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Parrainer un ami</h3>
                      <p className="mt-1 text-sm text-gray-500">Gagnez des récompenses</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => router.push('/dashboard/settings')}
                  className="bg-white overflow-hidden shadow rounded-lg p-6 text-left hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-100 p-3 rounded-md">
                      <FiCreditCard className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Méthodes de paiement</h3>
                      <p className="mt-1 text-sm text-gray-500">Gérez vos moyens de paiement</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
