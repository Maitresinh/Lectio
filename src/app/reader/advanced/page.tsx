'use client';

import { useEffect, useRef, useState } from 'react';

export default function AdvancedReaderPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  useEffect(() => {
    const loadPdfReader = async () => {
      // Dynamically import PDF.js to avoid SSR issues
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker path
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      // For testing, we'll just show the interface
      console.log('PDF.js loaded');
    };

    loadPdfReader();
  }, []);

  const loadPdf = async (file: File) => {
    if (!file) return;

    const pdfjsLib = await import('pdfjs-dist');
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    
    const pdf = await loadingTask.promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    
    renderPage(pdf, 1);
  };

  const renderPage = async (pdf: any, pageNum: number) => {
    if (!canvasRef.current || !pdf) return;

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.2 });
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
  };

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages && pdfDoc) {
      setCurrentPage(pageNum);
      renderPage(pdfDoc, pageNum);
    }
  };

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
                Lecteur PDF
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
              Lecteur PDF Avancé
            </h2>
            <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
              Chargez un fichier PDF pour commencer la lecture avec annotations
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
                accept=".pdf"
                className="mb-3"
                style={{ fontSize: 'var(--lectio-font-xs)' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) loadPdf(file);
                }}
              />
              <p style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-500)' }}>
                Sélectionnez un fichier PDF à lire
              </p>
            </div>
          </div>

          {/* Reader */}
          <div className="border text-center" 
               style={{ 
                 borderColor: 'var(--lectio-gray-200)',
                 borderRadius: 'var(--lectio-radius-sm)',
                 backgroundColor: 'var(--lectio-white)',
                 padding: 'var(--lectio-space-4)'
               }}>
            <canvas 
              ref={canvasRef}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                boxShadow: 'var(--lectio-shadow)'
              }}
            />
            {!pdfDoc && (
              <div style={{ 
                minHeight: '400px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--lectio-gray-500)',
                fontSize: 'var(--lectio-font-sm)'
              }}>
                Aucun PDF chargé
              </div>
            )}
          </div>

          {/* Reader Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button 
                className="lectio-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                ← Précédent
              </button>
              <button 
                className="lectio-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Suivant →
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span style={{ fontSize: 'var(--lectio-font-xs)', color: 'var(--lectio-gray-600)' }}>
                Page {currentPage} de {totalPages}
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border text-center"
                  style={{
                    borderColor: 'var(--lectio-gray-300)',
                    borderRadius: 'var(--lectio-radius-sm)',
                    fontSize: 'var(--lectio-font-xs)'
                  }}
                />
                <div className="flex space-x-1">
                  <button className="lectio-btn" title="Zoom moins">
                    -
                  </button>
                  <button className="lectio-btn" title="Zoom plus">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}