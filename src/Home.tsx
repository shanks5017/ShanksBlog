import React, { useEffect, useState } from 'react';
import { HeroPost } from './components/HeroPost';
import { PostCard } from './components/PostCard';
import { Post } from './lib/utils';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-display uppercase tracking-widest">Loading...</div>;

  const featuredPost = posts.find(p => p.featured === 1) || posts[0];
  const archivedPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <main className="bg-obsidian-bg">
      {featuredPost ? (
        <>
          <HeroPost post={featuredPost} />
          
          <section className="px-6 md:px-12 pb-32">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                <h2 className="text-5xl font-display font-bold uppercase tracking-tighter text-glow">Archive</h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-accent">
                  {archivedPosts.length} Entries
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                {archivedPosts.length > 0 ? (
                  archivedPosts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-obsidian-muted uppercase tracking-widest text-xs">
                    No archived entries yet.
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="fluid-text-hero font-bold mb-8">Empty Obsidian</h1>
          <p className="text-obsidian-muted max-w-md mx-auto uppercase tracking-widest text-xs leading-loose">
            The vault is currently empty. Connect n8n to begin the automated ingestion of digital insights.
          </p>
        </div>
      )}
    </main>
  );
};
