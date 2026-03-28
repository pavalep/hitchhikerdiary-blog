'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '@/lib/ghost';

interface HeroProps {
  featuredPosts: Post[];
}

export default function Hero({ featuredPosts }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (featuredPosts.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  if (featuredPosts.length === 0) {
    return (
      <section className="relative h-[60vh] bg-[#2b211b] flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white text-center">
          Hitchhiker Diary
        </h1>
      </section>
    );
  }

  return (
    <section className="relative h-[74vh] min-h-[560px] overflow-hidden story-reveal">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredPosts.map((post, index) => (
          <div key={post.id} className="min-w-full relative">
            {post.feature_image && (
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover"
                style={{ filter: 'grayscale(36%) contrast(108%) brightness(0.82)' }}
                priority={index === 0}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,195,170,0.28)_0%,transparent_42%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12">
              <div className="max-w-6xl mx-auto">
                <p className="mb-4 text-white/70 text-[11px] md:text-xs uppercase tracking-[0.22em]">Hitchhiker Diary</p>
                <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-white/95 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] mb-4 backdrop-blur-md">
                  {post.primary_tag?.name || 'Journal'}
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight max-w-4xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-white/85 text-base md:text-xl max-w-3xl mb-7 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-[color:var(--page-accent)] border border-[color:var(--page-accent)] text-white hover:opacity-90 transition-opacity duration-300 rounded-full font-semibold"
                  >
                    Read Story
                  </Link>
                  <span className="text-white/80 text-sm md:text-base">Slide {index + 1} of {featuredPosts.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-5 right-5 flex gap-2">
        <button
          onClick={prevSlide}
          className="p-2.5 bg-black/30 backdrop-blur-sm border border-white/30 text-white hover:bg-black/40 transition-colors duration-300 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2.5 bg-black/30 backdrop-blur-sm border border-white/30 text-white hover:bg-black/40 transition-colors duration-300 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 right-5 flex gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-2 backdrop-blur-md">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-28 h-1 rounded-full bg-white/25 overflow-hidden">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / featuredPosts.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
