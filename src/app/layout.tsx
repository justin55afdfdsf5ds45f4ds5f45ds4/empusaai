import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { PostsProvider } from '../context/PostsContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <PostsProvider>
          <Navbar />
          <main className="max-w-3xl mx-auto w-full p-4">{children}</main>
        </PostsProvider>
      </body>
    </html>
  );
} 