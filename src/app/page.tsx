import Link from 'next/link';

export default function WelcomePage() {
  return (
    <>
      <head>
        <title>HealthBridge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1D4ED8" />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to HealthBridge</h1>
        <p className="text-lg mb-8">Your digital gateway to better health.</p>
        <div className="space-x-4">
          <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </Link>
          <Link href="/register" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Register
          </Link>
        </div>
      </main>
    </>
  );
}
