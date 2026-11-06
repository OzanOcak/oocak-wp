import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BlogType {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: string;
  date: string;
  tags: string[];
  published: boolean;
}

export interface BlogPost extends BlogType {
  content: string;
}

function getMetadata(data: Record<string, unknown>, slug: string): BlogType {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    description: typeof data.description === "string" ? data.description : "",
    imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : undefined,
    author: typeof data.author === "string" ? data.author : "",
    date: typeof data.date === "string" ? data.date : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    published: data.published === true,
  };
}

function getDateValue(date: string): number {
  // Supports the existing dd.MM.yyyy format.
  const match = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    return new Date(`${year}-${month}-${day}`).getTime();
  }

  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function getAllBlogs(): Promise<BlogType[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("blog");
  const files = await readdir(CONTENT_DIR);

  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const blogs = await Promise.all(
    markdownFiles.map(async (file) => {
      const filePath = path.join(CONTENT_DIR, file);
      const source = await readFile(filePath, "utf8");
      const { data } = matter(source);

      const slug = file.replace(/\.md$/, "");

      return getMetadata(data, slug);
    }),
  );

  return blogs.sort((a, b) => getDateValue(b.date) - getDateValue(a.date));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  "use cache";

  cacheLife("hours");
  cacheTag("blog");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    return null;
  }

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  try {
    const source = await readFile(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      ...getMetadata(data, slug),
      content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
