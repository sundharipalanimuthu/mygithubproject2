import { notFound } from "next/navigation";
import { blogs } from "@/.velite";
import { Mdx } from "@/components/MdxComponent";
import Image from "next/image";
import readingTime from "reading-time";
import type { Metadata } from "next";

// ✅ Define the correct prop type for Next.js 15
interface PageProps {   
  params: Promise<{ slug: string }>;
}

// ✅ generateMetadata function for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slugAsParams === slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.discription,
    authors: [{ name: blog.author }],
  };
}

// ✅ Page component – slug fetched using await params
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slugAsParams === slug);
  if (!blog) return notFound();

  const stats = readingTime(blog.body);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex justify-between text-lg text-slate-800">
        <p>
          Published on{" "}
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-sm font-medium shadow-sm">
          {stats.text}
        </p>
      </div>

      <h1 className="mb-4 text-4xl font-extrabold text-slate-800">
        {blog.title}
      </h1>

      <div className="mb-6 flex items-center space-x-3">
        <Image
          src={blog.thumbnail}
          alt={blog.author}
          width={40}
          height={40}
          className="rounded-full border border-purple-500"
        />
        <div className="text-sm">
          <p className="font-semibold">{blog.author}</p>
          <p>@{blog.author.toLowerCase()}</p>
        </div>
      </div>

      {blog.thumbnail && (
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={800}
          height={400}
          className="my-10 rounded-xl border border-gray-200 shadow-sm"
        />
      )}

      <div
        className="relative prose max-w-none dark:prose-invert"
        data-rehype-pretty-code-wrapper
      >
        <Mdx code={blog.body} />
      </div>
    </article>
  );
}
