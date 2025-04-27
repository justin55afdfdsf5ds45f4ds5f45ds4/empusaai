import { useState } from 'react';
import LinkInput from '../components/LinkInput';
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';
import { usePosts } from '../context/PostsContext';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setPosts } = usePosts();

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const handleGenerate = async (url: string) => {
    setError(null);
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data) || data.length === 0) {
        setError(data.error || 'Failed to generate posts. Try again.');
        setLoading(false);
        return;
      }
      setPosts(data);
      setLoading(false);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Failed to generate posts. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Welcome to Empusa AI<br /><span className="text-blue-600">AI-Powered Content World</span></h1>
      <LinkInput onGenerate={handleGenerate} loading={loading} error={error} />
      {loading && <div className="mt-6"><Loader /></div>}
      {error && (
        <div className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded shadow text-center max-w-md">
          {error}
        </div>
      )}
    </div>
  );
} 