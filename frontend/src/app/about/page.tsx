export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--page-muted)] mb-3">About</p>
      <h1 className="text-4xl md:text-5xl font-serif mb-5">Hitchhiker Diary</h1>
      <p className="text-lg leading-relaxed text-stone-700">
        A filmmaker&apos;s journal documenting cinema, travel, and political life across India.
        These entries are field notes from roads, stations, screenings, and conversations.
      </p>
    </main>
  );
}
