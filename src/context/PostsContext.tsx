import { createContext, useContext, useState, ReactNode } from 'react';

export interface Post {
  image_url: string;
  title: string;
  description: string;
}

interface PostsContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within a PostsProvider');
  return ctx;
} 