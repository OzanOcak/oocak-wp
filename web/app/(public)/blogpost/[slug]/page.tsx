import { marked } from "marked";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blog";
import ContentTable from "@/components/blog/ContentTable";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: "Blog Post",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  let html = await marked.parse(post.content);

  const links: { text: string; id: string }[] = [];
  let headingIndex = 0;

  html = html.replace(/<h2>(.*?)<\/h2>/g, (_match, heading: string) => {
    headingIndex++;

    const id = `h2-${headingIndex}`;
    const title = heading.replace(/<[^>]*>/g, "").trim();

    links.push({ text: title, id });

    return `<h2 id="${id}">${heading}</h2>`;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>

        <p className="text-gray-500">
          {post.author}
          {post.author && post.date ? " · " : ""}
          {post.date}
        </p>

        {post.description && (
          <p className="text-lg text-gray-600">{post.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {links.length > 0 && <ContentTable links={links} />}
      </div>
    </main>
  );
}
