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
      <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white text-center">
          Hitchhiker Diary
        </h1>
      </section>
    );
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
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
                style={{ filter: 'grayscale(78%) contrast(105%) brightness(0.98)' }}
                priority={index === 0}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-6xl mx-auto">
                <p className="text-white/90 text-sm md:text-base font-semibold uppercase tracking-wide mb-3">
                  {post.primary_tag?.name || 'Journal'}
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-white/80 text-lg md:text-xl max-w-3xl mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <Link 
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-300 rounded-md"
                >
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={prevSlide}
          className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-300 rounded-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-300 rounded-md"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
