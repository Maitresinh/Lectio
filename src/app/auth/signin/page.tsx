import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ backgroundColor: 'var(--lectio-gray-50)' }}>
      <div className="w-full max-w-md p-8 border"
           style={{ 
             borderColor: 'var(--lectio-gray-200)', 
             borderRadius: 'var(--lectio-radius-sm)',
             backgroundColor: 'var(--lectio-white)'
           }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--lectio-gray-900)' }}>
            Lectio
          </h1>
          <p style={{ fontSize: 'var(--lectio-font-sm)', color: 'var(--lectio-gray-600)' }}>
            Plateforme de lecture collaborative
          </p>
        </div>

        <form action={async (formData) => {
          'use server';
          await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirectTo: '/',
          });
        }}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" 
                     style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-700)' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border"
                style={{
                  borderColor: 'var(--lectio-gray-300)',
                  borderRadius: 'var(--lectio-radius-sm)',
                  fontSize: 'var(--lectio-font-sm)'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" 
                     style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-700)' }}>
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border"
                style={{
                  borderColor: 'var(--lectio-gray-300)',
                  borderRadius: 'var(--lectio-radius-sm)',
                  fontSize: 'var(--lectio-font-sm)'
                }}
              />
            </div>

            <button type="submit" className="lectio-btn lectio-btn-primary w-full">
              Se connecter
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
            Une alternative open source aux plateformes comme Glose
          </p>
        </div>
      </div>
    </div>
  );
}