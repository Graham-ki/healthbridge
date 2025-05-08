'use client';

import { useState } from 'react';
import { supabase } from '@/utils/client'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contact: '',
    nextOfKin: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    const { email, password, name, address, contact, nextOfKin } = formData;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Failed to register.');
      return;
    }

    // Insert additional data to 'users' table
    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      name,
      email,
      address,
      contact,
      next_of_kin: nextOfKin,
    });

    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      {['name', 'email', 'password', 'address', 'contact', 'nextOfKin'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={(formData as any)[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}
      <button onClick={handleRegister} className="w-full bg-green-600 text-white py-2 rounded">
        Register
      </button>
    </main>
  );
}
