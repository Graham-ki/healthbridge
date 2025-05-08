'use client';

import ProtectedRoute from '@/components/protectedRoute';
import Link from 'next/link';
import { supabase } from '@/utils/client'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <PWAInstallPrompt />
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome back to HealthBridge!</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>

        <Link href="/" className="mt-4 text-blue-600 underline">
          Back to Welcome
        </Link>
      </main>
    </ProtectedRoute>
  );
}
