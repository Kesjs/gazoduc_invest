import DashboardLayout from '@/components/layout/DashboardLayout';

export default function InvestmentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Investissements</h1>
        <p className="mt-2 text-sm text-gray-600">
          Gérez vos investissements et consultez les performances
        </p>
        
        {/* Contenu de la page à compléter */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Contenu des investissements à venir...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
