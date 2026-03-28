import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPosts, type Post } from '@/lib/ghost';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const POSTS_PAGE_SIZE = 200;

const getPostFromIndex = async (slug: string): Promise<Post | null> => {
  const { posts } = await getPosts(POSTS_PAGE_SIZE, 1);
  return posts.find((item) => item.slug === slug) ?? null;
};

export async function generateStaticParams() {
  const { posts } = await getPosts(POSTS_PAGE_SIZE, 1);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostFromIndex(slug);

  if (!post) {
    return {
      title: 'Post not found | Hitchhiker Diary',
    };
  }

  return {
    title: `${post.title} | Hitchhiker Diary`,
    description: post.excerpt || post.plaintext.slice(0, 160),
  };
}

const toTokens = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);

const scoreSlugSimilarity = (requestedSlug: string, candidateSlug: string) => {
  const requested = new Set(toTokens(requestedSlug));
  const candidate = new Set(toTokens(candidateSlug));

  if (requested.size === 0 || candidate.size === 0) {
    return 0;
  }

  let overlap = 0;
  for (const token of requested) {
    if (candidate.has(token)) {
      overlap += 1;
    }
  }

  return overlap / requested.size;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostFromIndex(slug);

  if (!post) {
    const { posts } = await getPosts(50, 1);
    const bestMatch = posts
      .map((item) => ({
        item,
        score: scoreSlugSimilarity(slug, item.slug),
      }))
      .sort((a, b) => b.score - a.score)[0];

    if (bestMatch && bestMatch.score >= 0.6) {
      redirect(`/posts/${bestMatch.item.slug}`);
    }

    return (
      <main className="max-w-4xl mx-auto px-4 py-14 md:py-20">
        <section className="editorial-panel rounded-3xl p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">Post unavailable</p>
          <h1 className="text-4xl md:text-5xl font-serif text-cinema-text leading-tight">This story link is outdated</h1>
          <p className="mt-4 text-lg text-stone-700 leading-relaxed max-w-3xl">
            The post may have been renamed or unpublished. Use the latest stories below to continue reading.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-[color:var(--page-accent)] px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Back to home
            </Link>
            <Link
              href="/travel"
              className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-cinema-text font-semibold hover:bg-white transition-colors"
            >
              Browse travel notes
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-[color:var(--page-muted)] hover:bg-white transition-colors"
      >
        Back to stories
      </Link>

      <article className="mt-6 paper-card ink-ring rounded-3xl overflow-hidden">
        {post.feature_image && (
          <div className="relative aspect-[16/9]">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">
            {post.primary_tag?.name || 'Story'}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-cinema-text leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 text-sm text-cinema-muted flex flex-wrap items-center gap-3">
            <span>{post.primary_author?.name || 'Hitchhiker Diary'}</span>
            <span>•</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.reading_time} min read</span>
          </div>

          <div
            className="prose prose-stone prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
    </main>
  );
}
