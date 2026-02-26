import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Post } from '../lib/utils';
import { format } from 'date-fns';

interface HeroPostProps {
  post: Post;
}

export const HeroPost: React.FC<HeroPostProps> = ({ post }) => {
  // Artistic title splitting logic
  const titleWords = post.title.split(' ');
  const firstHalf = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const secondHalf = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden border-b border-white/10">
      {/* Left Side: Massive Typography & Info */}
      <div className="flex-1 pt-40 pb-20 px-6 md:px-12 flex flex-col justify-between relative z-10 bg-black">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-[1px] bg-obsidian-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-obsidian-accent">
              Featured Insight
            </span>
          </div>

          <Link to={`/post/${post.id}`} className="group block relative">
            <h1 className="fluid-text-hero font-bold mb-4 flex flex-col">
              <span className="text-white group-hover:text-obsidian-accent transition-colors duration-500">
                {firstHalf}
              </span>
              <span className="text-obsidian-accent text-glow italic">
                {secondHalf}
              </span>
            </h1>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
        >
          <div className="space-y-6">
            <p className="text-obsidian-muted text-xl leading-relaxed font-body max-w-sm">
              {post.author_bio}
            </p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-1">
                <span className="text-obsidian-accent">Date</span>
                <span className="text-white">{format(new Date(post.date), 'MM.dd.yy')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-obsidian-accent">Category</span>
                <span className="text-white">{post.ai_category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-obsidian-accent">Time</span>
                <span className="text-white">{post.reading_time}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Link 
              to={`/post/${post.id}`}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-obsidian-accent text-obsidian-accent hover:bg-obsidian-accent hover:text-black transition-all duration-500 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest group-hover:scale-110 transition-transform">Read<br/>More</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Immersive Image */}
      <div className="flex-1 relative h-[60vh] lg:h-auto overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={post.hero_image_url || `https://picsum.photos/seed/${post.id}/1920/1080`}
            alt={post.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
        </motion.div>

        {/* Vertical Rail Text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <span className="writing-mode-vertical text-[10px] font-bold uppercase tracking-[1em] text-white/20 rotate-180">
            Digital Obsidian Editorial — {format(new Date(post.date), 'yyyy')}
          </span>
        </div>
      </div>
    </section>
  );
};
