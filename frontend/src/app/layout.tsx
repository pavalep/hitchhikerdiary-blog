import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hitchhiker Diary | Cinema, Travel & Politics",
  description: "A filmmaker's journal documenting cinema, travel across India, and political observations. From SRFTI to the road - stories that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:var(--page-surface)]/85 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--page-muted)] mb-1">Field Notes and Cinema</p>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-cinema-text leading-none">
                  Hitchhiker Diary
                </h1>
                <p className="text-cinema-muted text-sm md:text-base mt-2">
                  Cinema, Travel & Political Witness
                </p>
              </div>
              <nav className="hidden md:flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] p-2">
                <Link href="/" className="px-4 py-2 rounded-full text-cinema-text hover:bg-black/5 hover:text-cinema-accent transition-colors">Home</Link>
                <Link href="/about" className="px-4 py-2 rounded-full text-cinema-text hover:bg-black/5 hover:text-cinema-accent transition-colors">About</Link>
                <Link href="/cinema" className="px-4 py-2 rounded-full text-cinema-text hover:bg-black/5 hover:text-cinema-accent transition-colors">Cinema</Link>
                <Link href="/travel" className="px-4 py-2 rounded-full text-cinema-text hover:bg-black/5 hover:text-cinema-accent transition-colors">Travel</Link>
                <Link href="/politics" className="px-4 py-2 rounded-full text-cinema-text hover:bg-black/5 hover:text-cinema-accent transition-colors">Politics</Link>
              </nav>
            </div>

            <nav className="mt-4 md:hidden -mx-1 flex items-center gap-2 overflow-x-auto pb-1">
              <Link href="/" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">Home</Link>
              <Link href="/about" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">About</Link>
              <Link href="/cinema" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">Cinema</Link>
              <Link href="/travel" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">Travel</Link>
              <Link href="/politics" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">Politics</Link>
              <Link href="/contact" className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-cinema-text">Contact</Link>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-[#1f1a16] text-white py-14 mt-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent mb-10" />
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">About This Journal</h3>
                <p className="text-white/80 leading-relaxed">
                  A filmmaker&apos;s notebook documenting the intersections of cinema, travel, and politics across India. 
                  Every entry is written with care, because stories matter.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Categories</h3>
                <ul className="space-y-2 text-white/80">
                  <li><Link href="/cinema" className="hover:text-white transition-colors">Cinema Practice</Link></li>
                  <li><Link href="/travel" className="hover:text-white transition-colors">Travel Notes</Link></li>
                  <li><Link href="/politics" className="hover:text-white transition-colors">People & Politics</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About the Journal</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Connect</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  For collaboration on films, essays, or projects that center human stories.
                </p>
                <Link href="/contact" className="text-cinema-accent hover:text-white transition-colors">
                  Get in touch →
                </Link>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
              <p>&copy; {new Date().getFullYear()} Hitchhiker Diary. Stories travel far.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
