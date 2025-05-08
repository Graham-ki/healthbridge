'use client';

import { useEffect, useState } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }

      // Show prompt only if not already dismissed in session
      const dismissed = sessionStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPopup(true);
        setTimeout(() => setIsVisible(true), 100); // Delay for animation
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also check if PWA is already installed
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handlerMediaQuery = () => {
      if (mediaQuery.matches) {
        setShowPopup(false);
      }
    };
    mediaQuery.addEventListener('change', handlerMediaQuery);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      mediaQuery.removeEventListener('change', handlerMediaQuery);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      console.log('✅ App installed');
    } else {
      console.log('❌ Install dismissed');
    }

    closePopup();
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
      sessionStorage.setItem('pwa-install-dismissed', 'true');
    }, 300); // Match this with your CSS transition duration
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={closePopup}
      />
      
      {/* Popup */}
      <div 
        className={`fixed bottom-6 right-6 z-50 max-w-xs w-full bg-white shadow-2xl border border-gray-200 rounded-2xl p-4 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-install-heading"
      >
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close install prompt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="/icons/icon.png"
            alt="App Icon"
            className="w-10 h-10 rounded-lg border border-gray-300"
          />
          <div>
            <h3 id="pwa-install-heading" className="text-sm font-semibold text-gray-800">Install HealthBridge</h3>
            <p className="text-xs text-gray-500">Get the app on your home screen</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={closePopup}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded"
          >
            Maybe Later
          </button>
          <button
            onClick={handleInstallClick}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            autoFocus
          >
            Install
          </button>
        </div>
      </div>
    </>
  );
}