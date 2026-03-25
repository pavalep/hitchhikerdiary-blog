import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/ghost';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="bg-cinema-card border border-cinema-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {post.feature_image && (
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: 'grayscale(28%) contrast(102%)' }}
                />
              </div>
            </Link>
          )}
          
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-cinema-text mb-3 leading-tight">
              <Link href={`/posts/${post.slug}`} className="hover:text-cinema-accent transition-colors">
                {post.title}
              </Link>
            </h3>

            <div className="flex items-center gap-3 text-sm text-cinema-muted mb-4">
              {post.primary_author?.name && (
                <span>{post.primary_author.name}</span>
              )}
              <span>•</span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{post.reading_time} min read</span>
            </div>

            {(post.excerpt || post.plaintext) && (
              <p className="text-cinema-text/90 leading-relaxed mb-4">
                {post.excerpt || post.plaintext.substring(0, 150) + '...'}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="text-cinema-accent hover:text-cinema-accent/80 transition-colors font-semibold text-sm"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
