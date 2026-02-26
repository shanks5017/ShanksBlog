import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("blog.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    author_bio TEXT,
    reading_time TEXT,
    hero_image_url TEXT,
    content_markdown TEXT NOT NULL,
    ai_category TEXT,
    featured INTEGER DEFAULT 0
  )
`);

// Add sample data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (count.count === 0) {
  const samplePosts = [
    {
      id: "the-future-of-silicon",
      date: new Date().toISOString(),
      title: "The Future of Silicon: Beyond the Von Neumann Bottleneck",
      author_bio: "Lead Architect at Digital Obsidian. Exploring the intersection of hardware and neural computation.",
      reading_time: "8 min read",
      hero_image_url: "https://picsum.photos/seed/silicon/1920/1080",
      ai_category: "Hardware",
      featured: 1,
      content_markdown: `
# The Future of Silicon
...
`
    },
    {
      id: "generative-aesthetics",
      date: new Date(Date.now() - 86400000).toISOString(),
      title: "Generative Aesthetics: The New Language of Design",
      author_bio: "Creative Director. Specializing in algorithmic art and procedural systems.",
      reading_time: "6 min read",
      hero_image_url: "https://picsum.photos/seed/design/1920/1080",
      ai_category: "Design",
      featured: 0,
      content_markdown: `
# Generative Aesthetics
...
`
    },
    {
      id: "quantum-ethics",
      date: new Date(Date.now() - 172800000).toISOString(),
      title: "Quantum Ethics: Navigating the Probabilistic Moral Landscape",
      author_bio: "Ethicist & Researcher. Focusing on the societal impact of quantum supremacy.",
      reading_time: "12 min read",
      hero_image_url: "https://picsum.photos/seed/quantum/1920/1080",
      ai_category: "Ethics",
      featured: 0,
      content_markdown: `
# Quantum Ethics
...
`
    }
  ];

  const insert = db.prepare(`
    INSERT INTO posts (id, date, title, author_bio, reading_time, hero_image_url, content_markdown, ai_category, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const post of samplePosts) {
    insert.run(post.id, post.date, post.title, post.author_bio, post.reading_time, post.hero_image_url, post.content_markdown, post.ai_category, post.featured);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY date DESC").all();
    res.json(posts);
  });

  app.get("/api/posts/:id", (req, res) => {
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });

  // Webhook for n8n
  app.post("/api/posts", (req, res) => {
    const { id, date, title, author_bio, reading_time, hero_image_url, content_markdown, ai_category } = req.body;
    
    if (!id || !title || !content_markdown) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO posts (id, date, title, author_bio, reading_time, hero_image_url, content_markdown, ai_category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(id, date || new Date().toISOString(), title, author_bio, reading_time, hero_image_url, content_markdown, ai_category);
      res.status(201).json({ success: true, id });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save post" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
