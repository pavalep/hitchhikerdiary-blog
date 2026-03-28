import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">404</p>
      <h1 className="text-4xl md:text-5xl font-serif mb-4">Page not found</h1>
      <p className="text-lg text-stone-700 mb-8">
        This route does not exist yet. Return to the latest stories.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-[color:var(--page-accent)] px-6 py-3 text-white font-semibold"
      >
        Back to home
      </Link>
    </main>
  );
}
