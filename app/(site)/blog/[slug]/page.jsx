import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { POSTS } from "@/lib/blog-data";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return { title: post?.title || "Article" };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={`SAVÉMOI · ${post.tag}`} title={post.title} date={`By ${post.author} · ${post.minutes} min read`} />
      <article className="wrap-xs section">
        <span className="label">Key Takeaways</span>
        <ul className="dash-list">
          {post.points.map((pt) => <li key={pt} style={{ fontSize: 16 }}>{pt}</li>)}
        </ul>
        {post.related && (
          <Link className="text-link" href={post.related.href} style={{ display: "inline-block", marginTop: 16, fontSize: 13 }}>
            {post.related.label}
          </Link>
        )}
        <div style={{ marginTop: 40 }}>
          <Link className="btn btn-outline" href="/blog">← Back to Journal</Link>
        </div>
      </article>
    </>
  );
}
