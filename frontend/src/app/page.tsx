import { getPosts, getFeaturedPosts, Post } from '@/lib/ghost';
import Hero from '@/components/Hero';
import PostList from '@/components/PostList';
import Link from 'next/link';

export default async function HomePage() {
  let featuredPosts: Post[] = [];
  let posts: Post[] = [];
  let errorMessage = '';

  try {
    // Fetch featured posts for the hero carousel
    featuredPosts = await getFeaturedPosts(6);
    
    // Fetch regular posts for the main content
    const result = await getPosts(12);
    posts = result.posts;
  } catch (error) {
    console.error('API Error:', error);
    errorMessage = 'Failed to load posts from Ghost CMS';
  }

  const trendingTags = posts
    .flatMap((post) => post.tags)
    .filter((tag, index, list) => list.findIndex((item) => item.slug === tag.slug) === index)
    .slice(0, 8);
  const totalReadingMinutes = posts.reduce((sum, post) => sum + post.reading_time, 0);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-56 h-72 w-72 rounded-full bg-[color:var(--page-accent-soft)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-[520px] h-80 w-80 rounded-full bg-amber-200/35 blur-3xl" />

      {/* Hero Section with Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <Hero featuredPosts={featuredPosts} />
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-14 story-reveal grid gap-6 lg:grid-cols-[1fr_290px]">
            <section className="editorial-panel paper-noise rounded-3xl px-6 py-7 md:px-10 md:py-9 overflow-hidden">
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--page-muted)]">
                Newly Published
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-bold text-stone-900 font-serif leading-tight">
                Latest Stories from the Road
              </h2>
              <p className="mt-4 text-lg text-stone-700 max-w-3xl leading-relaxed">
                Dispatches on cinema, people, and place, written while moving across India with a camera, a notebook, and a stubborn curiosity.
              </p>

              {trendingTags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tags/${tag.slug}`}
                      className="rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--page-muted)] hover:bg-white transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <aside className="editorial-panel rounded-3xl p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--page-muted)] mb-3">Logbook</p>
              <p className="text-stone-800 leading-relaxed">
                Every post starts as a location note, then becomes a story when the details settle.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[color:var(--page-muted)]">Stories Loaded</p>
                  <p className="text-2xl font-semibold text-stone-900">{posts.length}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[color:var(--page-muted)]">Reading Minutes</p>
                  <p className="text-2xl font-semibold text-stone-900">{totalReadingMinutes}</p>
                </div>
              </div>
            </aside>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
              <h3 className="text-red-800 font-semibold mb-2">API Connection Error</h3>
              <p className="text-red-600">{errorMessage}</p>
              <p className="text-sm text-red-500 mt-2">
                Please check your Ghost Content API key in .env.local
              </p>
            </div>
          )}

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-700 text-lg">
                {errorMessage ? 'Unable to load posts due to API error' : 'No posts found. Please check your Ghost CMS configuration.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
