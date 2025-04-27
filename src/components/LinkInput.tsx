import { useState } from 'react';

interface LinkInputProps {
  onGenerate: (url: string) => void;
  loading: boolean;
  error: string | null;
}

export default function LinkInput({ onGenerate, loading, error }: LinkInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Paste a link (URL) here..."
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={url}
        onChange={e => setUrl(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
} 