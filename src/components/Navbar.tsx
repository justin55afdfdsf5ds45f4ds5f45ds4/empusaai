'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-xl text-blue-600">Empusa AI</span>
      </div>
      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
            <Link href="/profile" className="hover:text-blue-600 transition">Profile</Link>
            <button
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/auth/login" className="hover:text-blue-600 transition">Login</Link>
            <Link href="/auth/register" className="hover:text-blue-600 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
} 