import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Post } from '../lib/utils';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link to={`/post/${post.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-obsidian-secondary border border-white/5">
          <motion.img
            layoutId={`image-${post.id}`}
            src={post.hero_image_url || `https://picsum.photos/seed/${post.id}/800/1000`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex justify-between items-start mb-4">
          <span className="px-2 py-0.5 bg-white/10 text-white font-bold text-[9px] uppercase tracking-widest rounded-sm">
            {post.ai_category || 'General'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-obsidian-accent">
            {post.reading_time || '5 min'}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-tight text-obsidian-accent text-glow">
          {post.title}
        </h3>
      </Link>
    </motion.div>
  );
};
