import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-2 text-sm text-gray-600">
          Téléchargez vos documents importants et factures
        </p>
        
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Gestion des documents à venir...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
