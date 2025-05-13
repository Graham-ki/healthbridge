// src/app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <title>HealthBridge</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

