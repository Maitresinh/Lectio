import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminGroupsPage() {
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
                Admin • Groupes
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
            Gestion des Groupes
          </h1>
          <a href="/admin/groups/create" className="lectio-btn lectio-btn-primary">
            Créer un groupe
          </a>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-3">
          <select className="lectio-btn">
            <option value="all">Tous les groupes</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
          <select className="lectio-btn">
            <option value="all">Toutes les visibilités</option>
            <option value="public">Publics</option>
            <option value="private">Privés</option>
          </select>
          <input
            type="text"
            placeholder="Rechercher un groupe..."
            className="px-3 py-2 border"
            style={{
              borderColor: 'var(--lectio-gray-300)',
              borderRadius: 'var(--lectio-radius-sm)',
              fontSize: 'var(--lectio-font-xs)'
            }}
          />
        </div>

        {/* Groups Table */}
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
                    Groupe
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Propriétaire
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Membres
                  </th>
                  <th className="text-left p-4" style={{ 
                    fontSize: 'var(--lectio-font-xs)', 
                    color: 'var(--lectio-gray-600)',
                    fontWeight: '500'
                  }}>
                    Livres
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
                    Créé
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
                {/* Sample group row */}
                <tr className="border-b" style={{ borderColor: 'var(--lectio-gray-100)' }}>
                  <td className="p-4">
                    <div>
                      <div style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-900)' }}>
                        Club de Lecture Classique
                      </div>
                      <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                        lecture-classique
                      </div>
                    </div>
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                    admin@lectio.local
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                    0 / 50
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-700)' }}>
                    0
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs rounded"
                            style={{ 
                              backgroundColor: '#10B981', 
                              color: 'white' 
                            }}>
                        Actif
                      </span>
                      <span className="px-2 py-1 text-xs rounded"
                            style={{ 
                              backgroundColor: 'var(--lectio-gray-100)', 
                              color: 'var(--lectio-gray-700)' 
                            }}>
                        Privé
                      </span>
                    </div>
                  </td>
                  <td className="p-4" style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                    Aujourd'hui
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="lectio-btn">
                        Voir
                      </button>
                      <button className="lectio-btn">
                        Modifier
                      </button>
                      <button className="lectio-btn" style={{ color: '#EF4444' }}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Empty state */}
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-500)' }}>
                      Aucun groupe trouvé
                    </div>
                    <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-400)' }}>
                      Les groupes apparaîtront ici une fois créés
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
            Affichage de 0 groupes
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