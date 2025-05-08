'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/client'; // Adjust the import path as necessary

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return authenticated ? <>{children}</> : null;
}
