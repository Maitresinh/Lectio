import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/auth/signin');
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
                Admin • Utilisateurs
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="/admin" className="lectio-btn">
                Retour Admin
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--lectio-gray-900)' }}>
            Gestion des Utilisateurs
          </h1>
          <a href="/admin/users/create" className="lectio-btn lectio-btn-primary">
            Créer un utilisateur
          </a>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-3">
          <select className="lectio-btn">
            <option value="all">Tous les rôles</option>
            <option value="admin">Administrateurs</option>
            <option value="moderator">Modérateurs</option>
            <option value="reader">Lecteurs</option>
          </select>
          <select className="lectio-btn">
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
          </select>
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-3 py-2 border"
            style={{
              borderColor: 'var(--lectio-gray-300)',
              borderRadius: 'var(--lectio-radius-sm)',
              fontSize: 'var(--lectio-font-xs)'
            }}
          />
        </div>

        {/* Users Table */}
        <div className="border" style={{ 
          borderColor: 'var(--lectio-gray-200)', 
          borderRadius: 'var(--lectio-radius-sm)' 
        }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--lectio-gray-200)' }}>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Utilisateur
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Email
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Rôle
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Statut
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Inscription
                  </th>
                  <th className="text-right p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Sample user row */}
                <tr className="border-b" style={{ borderColor: 'var(--lectio-gray-100)' }}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: 'var(--lectio-gray-200)' }}>
                        <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                          A
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-900)' }}>
                          Admin User
                        </div>
                        <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                          @admin
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                    admin@lectio.local
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded"
                          style={{ 
                            backgroundColor: 'var(--lectio-gray-900)', 
                            color: 'white' 
                          }}>
                      Admin
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded"
                          style={{ 
                            backgroundColor: '#10B981', 
                            color: 'white' 
                          }}>
                      Actif
                    </span>
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                    Aujourd'hui
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="lectio-btn">
                        Modifier
                      </button>
                      <button className="lectio-btn" style={{ color: '#EF4444' }}>
                        Suspendre
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Empty state */}
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-500)' }}>
                      Aucun utilisateur trouvé
                    </div>
                    <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-400)' }}>
                      Les utilisateurs apparaîtront ici une fois la base de données configurée
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
            Affichage de 0 utilisateurs
          </div>
          <div className="flex space-x-2">
            <button className="lectio-btn" disabled>
              Précédent
            </button>
            <button className="lectio-btn" disabled>
              Suivant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}