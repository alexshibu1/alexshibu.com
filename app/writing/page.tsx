import Link from "next/link";
import { posts } from "./posts";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Writing() {
  return (
    <div className="page-content">
      <h1>writing</h1>

      <div className="writing-list">
        {posts.map((post) => (
          <div key={post.slug} className="writing-item">
            <h2>
              <Link href={`/writing/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{formatDate(post.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
