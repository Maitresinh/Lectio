'use client';

import { useEffect, useRef } from 'react';
import { auth } from '@/lib/auth';

export default function BasicReaderPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadEpubReader = async () => {
      // Dynamically import ePub.js to avoid SSR issues
      const ePub = (await import('epubjs')).default;
      
      if (!containerRef.current) return;

      // Initialize EPUB reader with Lectio styling
      const book = ePub();
      const rendition = book.renderTo(containerRef.current, {
        width: '100%',
        height: '600px',
        spread: 'none'
      });

      // Apply Lectio theme
      rendition.themes.default({
        'body': {
          'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          'font-size': '0.875rem',
          'line-height': '1.5',
          'color': '#171717',
          'background-color': '#ffffff'
        },
        'p': {
          'margin-bottom': '0.75rem'
        }
      });

      // Sample content for testing
      rendition.display();
    };

    loadEpubReader();
  }, []);

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
                Lecteur EPUB
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="lectio-btn">
                Annotations
              </button>
              <button className="lectio-btn">
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Reader Container */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium" style={{ color: 'var(--lectio-gray-900)' }}>
              Lecteur EPUB Basique
            </h2>
            <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Chargez un fichier EPUB pour commencer la lecture
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-6 p-4 border-2 border-dashed" 
               style={{ 
                 borderColor: 'var(--lectio-gray-300)',
                 borderRadius: 'var(--lectio-radius-sm)' 
               }}>
            <div className="text-center">
              <input
                type="file"
                accept=".epub"
                className="mb-3"
                style={{ fontSize: 'var(--lectio-font-xs)' }}
              />
              <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                Sélectionnez un fichier EPUB à lire
              </p>
            </div>
          </div>

          {/* Reader */}
          <div className="border" 
               style={{ 
                 borderColor: 'var(--lectio-gray-200)',
                 borderRadius: 'var(--lectio-radius-sm)',
                 backgroundColor: 'var(--lectio-white)'
               }}>
            <div ref={containerRef} style={{ minHeight: '600px' }} />
          </div>

          {/* Reader Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="lectio-btn">
                ← Précédent
              </button>
              <button className="lectio-btn">
                Suivant →
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                Page 1 de 1
              </span>
              <div className="flex space-x-1">
                <button className="lectio-btn" title="Zoom moins">
                  A-
                </button>
                <button className="lectio-btn" title="Zoom plus">
                  A+
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}