import { useState } from 'react';

interface PostCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function PostCard({ imageUrl, title, description }: PostCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'title' | 'description') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded mb-3" />
      <div className="font-semibold text-lg mb-1 flex items-center">
        {title}
        <button
          className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          onClick={() => handleCopy(title, 'title')}
        >
          {copied === 'title' ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="text-gray-600 mb-2 flex items-center">
        {description}
        <button
          className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
          onClick={() => handleCopy(description, 'description')}
        >
          {copied === 'description' ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <a
        href={imageUrl}
        download
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
      >
        Download
      </a>
    </div>
  );
} 