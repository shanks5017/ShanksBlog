import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-end">
        <Link to="/" className="group">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <span className="font-display text-2xl font-bold tracking-tighter uppercase text-obsidian-accent text-glow">Digital</span>
            <span className="font-display text-2xl font-bold tracking-tighter uppercase -mt-2 text-white">Obsidian</span>
          </motion.div>
        </Link>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-obsidian-accent transition-colors">Archive</Link>
          <a href="#" className="hover:text-obsidian-accent transition-colors">About</a>
          <a href="#" className="hover:text-obsidian-accent transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};
