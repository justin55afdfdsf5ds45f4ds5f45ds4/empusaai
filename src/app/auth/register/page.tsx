'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed.');
        setLoading(false);
        return;
      }
      // Auto-login after registration
      const loginRes = await signIn('credentials', {
        redirect: false,
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (loginRes?.error) {
        setError('Registration succeeded, but login failed.');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError('Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
} 