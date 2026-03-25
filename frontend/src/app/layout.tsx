import type { Metadata } from "next";
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
        <header className="bg-cinema-bg border-b border-cinema-border">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-cinema-text">
                  Hitchhiker Diary
                </h1>
                <p className="text-cinema-muted text-sm md:text-base">
                  Cinema, Travel & Political Witness
                </p>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-cinema-text hover:text-cinema-accent transition-colors">Home</a>
                <a href="/about" className="text-cinema-text hover:text-cinema-accent transition-colors">About</a>
                <a href="/cinema" className="text-cinema-text hover:text-cinema-accent transition-colors">Cinema</a>
                <a href="/travel" className="text-cinema-text hover:text-cinema-accent transition-colors">Travel</a>
                <a href="/politics" className="text-cinema-text hover:text-cinema-accent transition-colors">Politics</a>
              </nav>
            </div>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-cinema-text text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">About This Journal</h3>
                <p className="text-white/80 leading-relaxed">
                  A filmmaker's notebook documenting the intersections of cinema, travel, and politics across India. 
                  Every entry is written with care, because stories matter.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Categories</h3>
                <ul className="space-y-2 text-white/80">
                  <li><a href="/cinema" className="hover:text-white transition-colors">Cinema Practice</a></li>
                  <li><a href="/travel" className="hover:text-white transition-colors">Travel Notes</a></li>
                  <li><a href="/politics" className="hover:text-white transition-colors">People & Politics</a></li>
                  <li><a href="/photo-essays" className="hover:text-white transition-colors">Photo Essays</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl mb-4">Connect</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  For collaboration on films, essays, or projects that center human stories.
                </p>
                <a href="/contact" className="text-cinema-accent hover:text-white transition-colors">
                  Get in touch →
                </a>
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
