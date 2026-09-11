"use client";

import { useState } from "react";
import type { Blog } from "@/services/blogService";
import { ApiImage } from "@/components/home/ApiImage";
import { BlogDetailsModal } from "./BlogDetailsModal";

export function BlogCard({ blog, lead = false }: { blog: Blog; lead?: boolean }) {
  const [open, setOpen] = useState(false);
  const date = blog.published_at ? new Date(blog.published_at) : null;
  return <article className={lead ? "blog-lead" : "blog-row"}>
    <ApiImage src={blog.featured_image_url} alt={blog.title} className="blog-image" />
    <div className={lead ? "blog-lead-copy" : ""}>
      {blog.category_name && <span className="blog-category">{blog.category_name}</span>}
      <h2><button type="button" className="blog-title-btn" onClick={() => setOpen(true)}>{blog.title}</button></h2>
      {blog.excerpt && <p>{blog.excerpt}</p>}
      <div className="blog-meta">{date && !Number.isNaN(date.getTime()) && <time dateTime={date.toISOString()}>{date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}</time>}{blog.author_name && <span>By {blog.author_name}</span>}</div>
      <button type="button" className="blog-read" aria-label={`Read ${blog.title}`} onClick={() => setOpen(true)}>Read More →</button>
    </div>
    <BlogDetailsModal blog={blog} open={open} onClose={() => setOpen(false)} />
  </article>;
}
