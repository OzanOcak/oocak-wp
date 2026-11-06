"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogType } from "@/lib/blog";

interface SearchedPostsProps {
  blogs: BlogType[];
}

export default function SearchedPosts({ blogs }: SearchedPostsProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const publishedBlogs = useMemo(
    () => blogs.filter((blog) => blog.published),
    [blogs],
  );

  const tags = useMemo(
    () => [...new Set(publishedBlogs.flatMap((blog) => blog.tags))].sort(),
    [publishedBlogs],
  );

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return publishedBlogs.filter((blog) => {
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => blog.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [publishedBlogs, search, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={selected}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <Link href={`/blogpost/${blog.slug}`} className="block">
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={blog.imageUrl || "/images/1.webp"}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3 p-5">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>

                  <p className="text-sm text-gray-600">{blog.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">
                    {blog.author}
                    {blog.author && blog.date ? " · " : ""}
                    {blog.date}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
