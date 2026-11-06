import SearchedPosts from "@/components/blog/SearchedPosts";
import { getAllBlogs } from "@/lib/blog";

export const metadata = {
  title: "Blog Posts",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-12">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <SearchedPosts blogs={blogs} />
    </main>
  );
}
