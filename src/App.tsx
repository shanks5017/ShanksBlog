/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './Home';
import { PostDetail } from './components/PostDetail';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-obsidian-accent selection:text-black overflow-x-hidden">
        <div className="bg-noise fixed inset-0 z-[100]" />
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            } />
            <Route path="/post/:id" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PostDetail />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>

        <footer className="py-32 px-6 md:px-12 border-t border-white/5 bg-obsidian-secondary relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <div className="font-display text-6xl font-bold tracking-tighter uppercase mb-8 leading-none">
                Digital<br/>
                <span className="text-obsidian-accent text-glow">Obsidian</span>
              </div>
              <p className="text-obsidian-muted text-[10px] font-bold uppercase tracking-[0.3em]">© 2026 Crafted for the Future</p>
            </div>
            <div className="grid grid-cols-2 gap-24 text-[10px] font-bold uppercase tracking-[0.2em]">
              <div className="flex flex-col gap-6">
                <span className="text-obsidian-accent">Connect</span>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-obsidian-accent">Explore</span>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
