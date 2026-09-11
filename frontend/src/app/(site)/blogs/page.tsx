import type { Metadata } from "next";
import Link from "next/link";
import Form from "next/form";
import { Container } from "@/components/ui/Container";
import { ContentBanner, ContentCTA, ContentPagination, ContentState } from "@/components/common/ContentPage";
import { BlogCard } from "@/components/blogs/BlogCard";
import { getBlogs } from "@/services/blogService";
import { getNavigationCategories } from "@/services/siteService";

export const metadata: Metadata = { title: "Our Blogs | Pujara Print N Pack", description: "Printing tips, packaging ideas and news from Pujara Print N Pack." };

export default async function BlogsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category.slice(0, 150) : "";
  const search = typeof params.search === "string" ? params.search.trim().slice(0, 150) : "";
  const requestedPage = Number(params.page);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const query = new URLSearchParams({ page: String(page), limit: "4" });
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  if (params.featured === "1") query.set("featured", "1");
  const href = (nextPage = 1, nextCategory = category) => {
    const next = new URLSearchParams(query);
    next.delete("limit"); next.set("page", String(nextPage));
    if (nextCategory) next.set("category", nextCategory); else next.delete("category");
    return `/blogs?${next}`;
  };
  const [blogsResult, categoriesResult] = await Promise.allSettled([getBlogs(query), getNavigationCategories("blog-categories")]);
  const result = blogsResult.status === "fulfilled" ? blogsResult.value : null;
  const categories = categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  return <main className="content-page"><ContentBanner title="Blogs" /><Container><section className="content-body" aria-label="Blog articles">
    <div className="blog-toolbar"><nav className="blog-filters" aria-label="Blog categories">{[{ name: "All Blogs", slug: "" }, ...categories].map(item => <Link href={href(1, item.slug)} key={item.slug} aria-current={item.slug === category ? "page" : undefined}>{item.name}</Link>)}</nav>
      <Form action="/blogs" className="blog-search" role="search">{category && <input type="hidden" name="category" value={category} />}{params.featured === "1" && <input type="hidden" name="featured" value="1" />}<input type="search" name="search" defaultValue={search} key={search} maxLength={150} aria-label="Search blogs" placeholder="Search blogs…" /><button type="submit">Search</button></Form>
    </div>
    {categoriesResult.status === "rejected" && <p role="status">Category filters are temporarily unavailable.</p>}
    {!result || !result.data.length ? <ContentState error={!result} label="blogs" href={result ? "/blogs" : href(page)} /> : <div className="blogs-layout"><BlogCard blog={result.data[0]} lead /><div className="blog-list">{result.data.slice(1).map(blog => <BlogCard key={blog.id} blog={blog} />)}</div></div>}
    <ContentPagination pagination={result?.pagination} href={href} /><ContentCTA />
  </section></Container></main>;
}
