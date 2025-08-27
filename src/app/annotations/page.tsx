import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AnnotationsPage() {
  const session = await auth();

  if (!session) {
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
                Mes Annotations
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                {session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--lectio-gray-900)' }}>
            Mes Annotations
          </h1>
          <div className="flex items-center space-x-3">
            <select className="lectio-btn">
              <option value="all">Tous les livres</option>
              <option value="recent">Récents</option>
            </select>
            <select className="lectio-btn">
              <option value="all">Tous types</option>
              <option value="highlight">Surlignages</option>
              <option value="note">Notes</option>
              <option value="question">Questions</option>
            </select>
          </div>
        </div>

        {/* Annotations List */}
        <div className="space-y-4">
          {/* Sample annotation */}
          <div className="p-4 border" 
               style={{ 
                 borderColor: 'var(--lectio-gray-200)',
                 borderRadius: 'var(--lectio-radius-sm)',
                 backgroundColor: 'var(--lectio-white)'
               }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium" style={{ 
                  fontSize: 'var(--lectio-font-base)', 
                  color: 'var(--lectio-gray-900)' 
                }}>
                  Exemple de livre
                </h3>
                <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                  Page 42 • Il y a 2 heures
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs rounded"
                      style={{ 
                        backgroundColor: 'var(--lectio-gray-100)',
                        color: 'var(--lectio-gray-700)',
                        fontSize: 'var(--lectio-font-xs)'
                      }}>
                  Note
                </span>
                <button className="text-xs" style={{ color: 'var(--lectio-gray-400)' }}>
                  ⋯
                </button>
              </div>
            </div>
            
            {/* Selected text */}
            <blockquote className="p-3 mb-3 border-l-4"
                        style={{ 
                          borderLeftColor: '#FCD34D',
                          backgroundColor: 'var(--lectio-gray-50)',
                          fontSize: 'var(--lectio-font-sm)',
                          color: 'var(--lectio-gray-700)'
                        }}>
              "Texte sélectionné dans le livre qui a été annoté..."
            </blockquote>
            
            {/* Annotation content */}
            <div style={{ 
              fontSize: 'var(--lectio-font-sm)', 
              color: 'var(--lectio-gray-800)'
            }}>
              Voici ma note sur ce passage important du livre.
            </div>
          </div>

          {/* Empty state */}
          <div className="text-center py-12">
            <div style={{ fontSize: 'var(--lectio-font-base)', color: 'var(--lectio-gray-500)' }}>
              Aucune annotation trouvée
            </div>
            <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-400)' }}>
              Commencez à lire pour créer vos premières annotations
            </p>
            <div className="mt-4">
              <a href="/reader/basic" className="lectio-btn lectio-btn-primary">
                Commencer à lire
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}