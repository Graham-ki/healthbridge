'use client';

import { useEffect, useState } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('App installed');
    } else {
      console.log('Install dismissed');
    }
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
      <img
    src="/icons/icon.png"
    alt="HealthBridge Icon"
    className="w-12 h-12 rounded-full shadow border border-gray-300"
  />
      <p className="mb-2 font-medium text-gray-700">Install HealthBridge?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowPopup(false)}
          className="px-3 py-1 text-gray-500 hover:text-gray-800"
        >
          Dismiss
        </button>
        <button
          onClick={handleInstallClick}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Install
        </button>
      </div>
    </div>
  );
}
