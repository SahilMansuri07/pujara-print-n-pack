import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog } from "@/services/blogService";
import { Container } from "@/components/ui/Container";
import { ApiImage } from "@/components/home/ApiImage";
import { ContentBanner, ContentState } from "@/components/common/ContentPage";

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog;
  try { blog = await getBlog(slug); } catch {
    return <main className="content-page"><ContentBanner title="Blogs" /><Container><div className="content-body"><ContentState error label="this article" href={`/blogs/${encodeURIComponent(slug)}`} /></div></Container></main>;
  }
  if (!blog) notFound();
  return <main className="content-page"><ContentBanner title="Blogs" /><Container><article className="content-body blog-article"><Link href="/blogs">← All Blogs</Link><h1>{blog.title}</h1>{blog.author_name && <p>By {blog.author_name}</p>}<ApiImage src={blog.featured_image_url} alt={blog.title} /><div className="blog-article-content" dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || "" }} /></article></Container></main>;
}
