import { posts } from "../posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: { slug: string } }) {
  // 1. Find the post that matches the slug
  const post = posts.find((p) => p.slug === params.slug);

  // 2. If no post is found, show a 404 page
  if (!post) {
    notFound();
  }

  return (
    <div className="page-content">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/writing"
          className="text-gray-500 hover:text-black transition-colors"
        >
          ← Back to all essays
        </Link>
      </div>

      {/* Header */}
      <p className="text-gray-500 text-sm mb-2">{post.date}</p>
      <h1 className="text-3xl font-medium mb-8">{post.title}</h1>

      {/* Content */}
      <div className="prose prose-gray">{post.content}</div>
    </div>
  );
}
