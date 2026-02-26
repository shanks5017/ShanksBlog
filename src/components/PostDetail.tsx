import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Post } from '../lib/utils';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-display uppercase tracking-widest">Loading...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">Post not found</div>;

  return (
    <div className="bg-obsidian-bg min-h-screen relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-obsidian-accent z-[60] origin-left shadow-[0_0_15px_rgba(184,239,67,0.5)]"
        style={{ scaleX }}
      />
      
      <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 hover:text-obsidian-accent transition-colors">
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-obsidian-accent text-black font-bold rounded-sm text-[10px] uppercase tracking-widest">
              {post.ai_category || 'Insight'}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-muted">
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </span>
          </div>
          <h1 className="fluid-text-h2 font-bold max-w-5xl mb-12 text-obsidian-accent text-glow">
            {post.title}
          </h1>
          <div className="aspect-[21/9] overflow-hidden rounded-sm border border-white/10">
            <motion.img
              layoutId={`image-${post.id}`}
              src={post.hero_image_url || `https://picsum.photos/seed/${post.id}/1920/1080`}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-32">
          <aside className="md:col-span-3">
            <div className="sticky top-32">
              <div className="mb-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-accent mb-4">Author</h4>
                <p className="text-lg font-medium">{post.author_bio || 'Digital Obsidian Editorial'}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-accent mb-4">Reading Time</h4>
                <p className="text-lg font-medium">{post.reading_time || '5 min read'}</p>
              </div>
            </div>
          </aside>
          
          <article className="md:col-span-8 md:col-start-5">
            <div className="markdown-body">
              <ReactMarkdown>{post.content_markdown}</ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
