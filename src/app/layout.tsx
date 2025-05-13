// src/app/layout.tsx
'use client';
import './globals.css';
import { useEffect } from 'react';
import '../utils/serviceWorkerRegistration';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // This ensures PWA prompt works across the app
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <title>HealthBridge</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}

