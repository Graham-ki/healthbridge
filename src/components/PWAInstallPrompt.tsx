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

      if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }

      const dismissed = sessionStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPopup(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handlerMediaQuery = () => {
      if (mediaQuery.matches) setShowPopup(false);
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
    closePopup();
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
      sessionStorage.setItem('pwa-install-dismissed', 'true');
    }, 200);
  };

  if (!showPopup) return null;

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div 
        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-3 flex items-start justify-between gap-3"
        role="alert"
        aria-labelledby="pwa-install-heading"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <h3 id="pwa-install-heading" className="text-sm font-medium text-gray-800">Add to Home Screen</h3>
          </div>
          <p className="text-xs text-gray-600 mt-1 pl-7">Install HealthBridge for a better experience</p>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleInstallClick}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition"
          >
            Install
          </button>
          <button
            onClick={closePopup}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}