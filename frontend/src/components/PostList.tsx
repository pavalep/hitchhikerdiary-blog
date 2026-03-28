import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/ghost';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const toneClasses = [
    'from-amber-50/80 to-white/70',
    'from-rose-50/70 to-white/80',
    'from-emerald-50/70 to-white/80',
    'from-sky-50/70 to-white/80'
  ];

  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-6 auto-rows-fr">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className={`paper-card ink-ring rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 story-reveal ${
            index === 0 ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1 lg:col-span-2'
          }`}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          {post.feature_image && (
            <Link href={`/posts/${post.slug}`} className="block">
              <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: 'grayscale(20%) contrast(104%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </Link>
          )}
          
          <div className={`p-6 md:p-7 bg-gradient-to-br ${toneClasses[index % toneClasses.length]}`}>
            <div className="mb-3 flex items-center justify-between gap-2 text-xs uppercase tracking-[0.12em] text-[color:var(--page-muted)]">
              <span>{post.primary_tag?.name || 'Story'}</span>
              <span>{post.reading_time} min read</span>
            </div>

            <h3 className={`font-serif font-bold text-cinema-text mb-3 leading-tight ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
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
              <span>Published</span>
            </div>

            {(post.excerpt || post.plaintext) && (
              <p className="text-cinema-text/90 leading-relaxed mb-6">
                {post.excerpt || post.plaintext.substring(0, 150) + '...'}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-black/10">
              {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cinema-accent hover:bg-black/10 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
              )}
              <Link href={`/posts/${post.slug}`} className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-cinema-accent hover:bg-white transition-colors">
                Read more {'->'}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
