import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ReferralsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Parrainage</h1>
        <p className="mt-2 text-sm text-gray-600">
          Parrainez des amis et gagnez des récompenses
        </p>
        
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Système de parrainage à venir...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
