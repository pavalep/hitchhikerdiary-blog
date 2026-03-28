import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByTag, getTags } from '@/lib/ghost';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [tags, posts] = await Promise.all([getTags(), getPostsByTag(slug, 1)]);
  const tag = tags.find((item) => item.slug === slug) || posts[0]?.tags?.find((item) => item.slug === slug);
  const displayName = tag?.name || slug.replace(/-/g, ' ');

  if (!tag && posts.length === 0) {
    return {
      title: 'Tag not found | Hitchhiker Diary',
    };
  }

  return {
    title: `${displayName} | Hitchhiker Diary`,
    description: tag?.description || `Stories filed under ${displayName}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const [tags, posts] = await Promise.all([getTags(), getPostsByTag(slug, 24)]);
  const tag = tags.find((item) => item.slug === slug) || posts[0]?.tags?.find((item) => item.slug === slug);
  const displayName = tag?.name || slug.replace(/-/g, ' ');

  if (!tag && posts.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-14 md:py-20">
        <section className="editorial-panel rounded-3xl p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">Tag unavailable</p>
          <h1 className="text-4xl md:text-5xl font-serif text-cinema-text leading-tight">No stories found for this tag</h1>
          <p className="mt-4 text-lg text-stone-700 leading-relaxed max-w-3xl">
            This tag may have been removed or changed. Browse the latest stories to continue reading.
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
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="editorial-panel rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">Tag archive</p>
        <h1 className="text-4xl md:text-5xl font-serif text-cinema-text leading-tight">{displayName}</h1>
        {tag?.description && (
          <p className="mt-4 text-lg text-stone-700 max-w-3xl leading-relaxed">{tag.description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-8 text-center">
          <p className="text-stone-700">No stories are available under this tag yet.</p>
          <Link href="/" className="inline-flex mt-4 rounded-full border border-black/10 px-4 py-2 font-semibold text-cinema-accent hover:bg-white transition-colors">
            Return home
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="paper-card ink-ring rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--page-muted)] mb-2">
                {post.reading_time} min read
              </p>
              <h2 className="font-serif text-2xl text-cinema-text leading-tight">
                <Link href={`/posts/${post.slug}`} className="hover:text-cinema-accent transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-stone-700 leading-relaxed">
                {post.excerpt || post.plaintext.slice(0, 140)}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex mt-5 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-cinema-accent hover:bg-white transition-colors"
              >
                Read story
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
