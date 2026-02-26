import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Post {
  id: string;
  date: string;
  title: string;
  author_bio: string;
  reading_time: string;
  hero_image_url: string;
  content_markdown: string;
  ai_category: string;
  featured: number;
}
