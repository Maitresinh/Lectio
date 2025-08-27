import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--lectio-white)' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--lectio-gray-200)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="font-bold text-xl" style={{ color: 'var(--lectio-gray-900)' }}>
                Lectio
              </a>
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                Administration
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                {session.user?.email}
              </span>
              <a href="/" className="lectio-btn">
                Retour
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--lectio-gray-900)' }}>
            Panneau d'Administration
          </h1>
          <p style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-600)' }}>
            Gestion de la plateforme Lectio
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--lectio-gray-900)' }}>
              0
            </div>
            <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Utilisateurs
            </div>
          </div>
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--lectio-gray-900)' }}>
              0
            </div>
            <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Livres
            </div>
          </div>
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--lectio-gray-900)' }}>
              0
            </div>
            <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Groupes
            </div>
          </div>
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--lectio-gray-900)' }}>
              0
            </div>
            <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Annotations
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users Management */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Gestion des Utilisateurs
            </h2>
            <div className="space-y-3">
              <a href="/admin/users" className="block lectio-btn w-full text-left">
                Liste des utilisateurs
              </a>
              <a href="/admin/users/create" className="block lectio-btn w-full text-left">
                Créer un utilisateur
              </a>
            </div>
          </div>

          {/* Books Management */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Gestion des Livres
            </h2>
            <div className="space-y-3">
              <a href="/admin/books" className="block lectio-btn w-full text-left">
                Liste des livres
              </a>
              <a href="/admin/books/upload" className="block lectio-btn w-full text-left">
                Ajouter un livre
              </a>
            </div>
          </div>

          {/* Groups Management */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Gestion des Groupes
            </h2>
            <div className="space-y-3">
              <a href="/admin/groups" className="block lectio-btn w-full text-left">
                Liste des groupes
              </a>
              <a href="/admin/groups/create" className="block lectio-btn w-full text-left">
                Créer un groupe
              </a>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 p-6 border" style={{ 
          borderColor: 'var(--lectio-gray-200)', 
          borderRadius: 'var(--lectio-radius-sm)' 
        }}>
          <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
            État du Système
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3"
                 style={{ backgroundColor: 'var(--lectio-gray-50)', borderRadius: 'var(--lectio-radius-sm)' }}>
              <span style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                Base de données
              </span>
              <span className="px-2 py-1 text-xs rounded"
                    style={{ backgroundColor: '#10B981', color: 'white' }}>
                Connecté
              </span>
            </div>
            <div className="flex items-center justify-between p-3"
                 style={{ backgroundColor: 'var(--lectio-gray-50)', borderRadius: 'var(--lectio-radius-sm)' }}>
              <span style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                Stockage
              </span>
              <span className="px-2 py-1 text-xs rounded"
                    style={{ backgroundColor: '#10B981', color: 'white' }}>
                OK
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}