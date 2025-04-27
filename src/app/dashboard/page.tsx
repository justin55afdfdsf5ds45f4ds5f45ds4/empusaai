'use client';
import PostCard from '../../components/PostCard';
import { usePosts } from '../../context/PostsContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { posts } = usePosts();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login');
    },
  });
  const [postsToday, setPostsToday] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(100);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    async function fetchPostsToday() {
      const res = await fetch('/api/user/posts-today');
      const data = await res.json();
      if (res.ok) {
        setPostsToday(data.postsToday);
        setLimit(data.limit);
        setLimitReached(data.postsToday >= data.limit);
      }
    }
    fetchPostsToday();
  }, []);

  if (status === 'loading') {
    return <div className="text-center py-12">Checking authentication...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded text-sm font-semibold">
          Posts today: {postsToday !== null ? `${postsToday}/${limit}` : '--/--'}
        </span>
      </div>
      {limitReached && (
        <div className="mb-6 px-4 py-2 bg-red-100 text-red-700 rounded shadow text-center max-w-md">
          Daily generation limit reached. Come back tomorrow!
        </div>
      )}
      {posts.length === 0 ? (
        <div className="text-gray-500 text-center w-full py-12">No posts to display. Generate content from the homepage.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      )}
    </div>
  );
} 