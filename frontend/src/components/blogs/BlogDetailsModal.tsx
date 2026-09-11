"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { WhatsAppLink } from "@/components/common/WhatsApp";
import type { Blog } from "@/services/blogService";
import type { ApiResponse } from "@/types/api";
import { resolveImageUrl } from "@/lib/image-url";

export function BlogDetailsModal({ blog, open, onClose }: { blog: Blog | null; open: boolean; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open || !blog) return;
    setContent(null);
    setFailed(false);
    const controller = new AbortController();
    fetch(`/api/blogs/${encodeURIComponent(blog.slug)}`, { signal: controller.signal })
      .then(response => response.json())
      .then((result: ApiResponse<Blog & { content: string | null }>) => {
        if (result.code === 1 && result.data) setContent(result.data.content || blog.excerpt || "");
        else setFailed(true);
      })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [open, blog]);

  if (!blog) return null;
  const date = blog.published_at ? new Date(blog.published_at) : null;

  return <Modal open={open} onClose={onClose} labelledBy={`blog-modal-title-${blog.id}`}>
    <div className="app-modal-media">
      {blog.featured_image_url
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={resolveImageUrl(blog.featured_image_url) ?? undefined} alt={blog.title} />
        : <div className="flex h-full w-full items-center justify-center"><FileText size={56} className="text-brand-violet/40" aria-hidden="true" /></div>}
    </div>
    <div className="app-modal-body">
      {blog.category_name && <span className="app-modal-tag">{blog.category_name}</span>}
      <h2 id={`blog-modal-title-${blog.id}`}>{blog.title}</h2>
      <div className="app-modal-meta">
        {date && !Number.isNaN(date.getTime()) && <span>{date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}</span>}
        {blog.author_name && <span>By {blog.author_name}</span>}
      </div>
      {content === null && !failed && <p className="app-modal-loading">Loading article…</p>}
      {failed && <p className="app-modal-desc">{blog.excerpt || "We couldn't load the full article right now."}</p>}
      {content && <div className="app-modal-desc" dangerouslySetInnerHTML={{ __html: content }} />}
      <div className="app-modal-actions">
        <Link href={`/blogs/${encodeURIComponent(blog.slug)}`} className="app-modal-secondary">Open Full Article</Link>
        <WhatsAppLink label="Ask us about this on WhatsApp" className="app-modal-cta">Ask Us <span aria-hidden="true">→</span></WhatsAppLink>
      </div>
    </div>
  </Modal>;
}
