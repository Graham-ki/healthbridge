'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(event);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPopup(false);
    if (result.outcome === 'accepted') {
      console.log('App installed');
    } else {
      console.log('Install dismissed');
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs w-full bg-white shadow-2xl border border-gray-200 rounded-2xl p-4 animate-fade-in">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src="/icons/icon.png"
          alt="App Icon"
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">Install HealthBridge</p>
          <p className="text-xs text-gray-500">Get the app on your home screen</p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowPopup(false)}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded"
        >
          Maybe Later
        </button>
        <button
          onClick={handleInstallClick}
          className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          Install
        </button>
      </div>
    </div>
  );
}
