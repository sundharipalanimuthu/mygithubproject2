"use client";

import React, { useState, useRef, useEffect } from "react";
import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import { blogs as rawBlogs } from "@/.velite";

interface Blog {
  link: string;
  body: string;
  title: string;
  tag: string;
  description: string; // fixed typo here
  date: string;
  published: boolean;
  thumbnail: string;
  author: string;
  slugAsParams: string;
  pubDate?: string;
}

const perPage = 6;

const Blogs = () => {
  const blogsRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sort by pubDate, fallback to date or 0 if invalid
  const sortedBlogs = [...(rawBlogs as unknown as Blog[])].sort((a, b) => {
    const dateA = new Date(a.pubDate || a.date || 0).getTime() || 0;
    const dateB = new Date(b.pubDate || b.date || 0).getTime() || 0;
    return dateB - dateA;
  });

  const totalPages = Math.ceil(sortedBlogs.length / perPage);

  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    blogsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section
      ref={blogsRef}
      className="py-16 px-4 sm:px-6 lg:px-8 xl:px-56"
      id="blogs"
    >
      <h2 className="text-3xl font-bold mb-10">
        Blogs<span className="text-pink-500">.</span>
      </h2>

      <div className="py-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.slugAsParams} blog={blog} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Blogs;

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-md">
      <div className="relative">
        <a
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read full blog: ${blog.title}`}
        >
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={400}
            height={208}
            className="w-full h-52 object-cover"
            loading="lazy"
            priority={false}
          
          />
        </a>
        <span className="absolute bottom-0 left-0 bg-pink-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-tr uppercase">
          {blog.tag}
        </span>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold mb-1 leading-snug">
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            aria-label={`Read full blog: ${blog.title}`}
          >
            {blog.title}
          </a>
        </h3>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
          {blog.description}
        </p>
        <div className="mt-auto text-right">
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium uppercase text-gray-500 hover:text-pink-500 transition"
            aria-label={`Read more about ${blog.title}`}
          >
            Read More ...
          </a>
        </div>
      </div>
    </div>
  );
};
