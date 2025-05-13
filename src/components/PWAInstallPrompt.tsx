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
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div 
        className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 p-4 flex items-center justify-between gap-4"
        role="alert"
        aria-labelledby="pwa-install-heading"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-blue-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          </div>
          <div>
            <h3 id="pwa-install-heading" className="text-base font-semibold text-gray-900 leading-tight">
              Install HealthBridge
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">Get quick access on your device</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Install
          </button>
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Dismiss"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}