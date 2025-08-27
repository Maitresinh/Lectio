import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminBooksPage() {
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
                Admin • Livres
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
            Gestion des Livres
          </h1>
          <a href="/admin/books/upload" className="lectio-btn lectio-btn-primary">
            Ajouter un livre
          </a>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-3">
          <select className="lectio-btn">
            <option value="all">Tous les formats</option>
            <option value="epub">EPUB</option>
            <option value="pdf">PDF</option>
          </select>
          <select className="lectio-btn">
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
          <input
            type="text"
            placeholder="Rechercher un livre..."
            className="px-3 py-2 border"
            style={{
              borderColor: 'var(--lectio-gray-300)',
              borderRadius: 'var(--lectio-radius-sm)',
              fontSize: 'var(--lectio-font-xs)'
            }}
          />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Sample book card */}
          <div className="border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <div className="aspect-[3/4] bg-cover bg-center"
                 style={{ 
                   backgroundColor: 'var(--lectio-gray-100)',
                   borderRadius: 'var(--lectio-radius-sm) var(--lectio-radius-sm) 0 0'
                 }}>
              <div className="w-full h-full flex items-center justify-center"
                   style={{ color: 'var(--lectio-gray-400)' }}>
                📖
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1" style={{ 
                fontSize: 'var(--lectio-font-sm)', 
                color: 'var(--lectio-gray-900)' 
              }}>
                Exemple de Livre
              </h3>
              <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                Par Auteur Example
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="px-2 py-1 text-xs rounded"
                      style={{ 
                        backgroundColor: 'var(--lectio-gray-100)', 
                        color: 'var(--lectio-gray-700)' 
                      }}>
                  EPUB
                </span>
                <div className="flex space-x-1">
                  <button className="text-xs p-1" style={{ color: 'var(--lectio-gray-400)' }}>
                    ✏️
                  </button>
                  <button className="text-xs p-1" style={{ color: '#EF4444' }}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Empty state card */}
          <div className="border-2 border-dashed flex flex-col items-center justify-center p-8 text-center"
               style={{ 
                 borderColor: 'var(--lectio-gray-300)',
                 borderRadius: 'var(--lectio-radius-sm)',
                 minHeight: '300px'
               }}>
            <div className="text-4xl mb-4" style={{ color: 'var(--lectio-gray-400)' }}>
              📚
            </div>
            <div style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-500)' }}>
              Aucun livre disponible
            </div>
            <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-400)' }}>
              Ajoutez votre premier livre
            </p>
            <a href="/admin/books/upload" className="mt-3 lectio-btn lectio-btn-primary">
              Ajouter un livre
            </a>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
            Affichage de 0 livres
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