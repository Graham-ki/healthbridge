// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head 
        />
      <title>HealthBridge</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icons/icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: 'HealthBridge',
  description: 'Your digital gateway to better health.',
  themeColor: '#1D4ED8',
  icons: {
    icon: '/icons/icon.png',
    shortcut: '/icons/icon.png',
    apple: '/icons/icon.png',
  },
};
