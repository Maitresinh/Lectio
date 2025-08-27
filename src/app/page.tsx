import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
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
              <h1 className="font-bold text-xl" style={{ color: 'var(--lectio-gray-900)' }}>
                Lectio
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="/reader" className="lectio-btn">
                  Lecteur
                </a>
                <a href="/annotations" className="lectio-btn">
                  Annotations
                </a>
                {session?.user?.role === 'ADMIN' && (
                  <a href="/admin" className="lectio-btn">
                    Administration
                  </a>
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                {session.user?.email}
              </span>
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="lectio-btn">
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Actions rapides
            </h2>
            <div className="space-y-3">
              <a href="/reader/basic" className="block lectio-btn w-full">
                Lecteur EPUB
              </a>
              <a href="/reader/advanced" className="block lectio-btn w-full">
                Lecteur PDF
              </a>
              <a href="/annotations" className="block lectio-btn w-full">
                Mes annotations
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Activité récente
            </h2>
            <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
              Aucune activité récente
            </p>
          </div>

          {/* Statistics */}
          <div className="p-6 border" style={{ 
            borderColor: 'var(--lectio-gray-200)', 
            borderRadius: 'var(--lectio-radius-sm)' 
          }}>
            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--lectio-gray-900)' }}>
              Statistiques
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                  Livres lus:
                </span>
                <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-900)' }}>
                  0
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                  Annotations:
                </span>
                <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-900)' }}>
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}