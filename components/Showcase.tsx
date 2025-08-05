"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseProps {
  language: Language;
}

export function Showcase({ language }: ShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const t = translations[language];

  const screenshots = t.showcase.items.map((item, index) => ({
    ...item,
    image: [

    ][index],
    device: ['desktop', 'postman', 'code'][index]
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-slate-900"></div>

      {/* Floating file icons */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? '📁' : i % 3 === 1 ? '📄' : '🗂️'}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent px-4"
        >
          {t.showcase.title}
        </h2>

        <div ref={carouselRef} className="relative px-4">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px]">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {screenshots.map((screenshot, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                        <div className="flex items-center gap-2 mb-2">
                          {getDeviceIcon(screenshot.device)}
                          <span className="text-gray-300 text-xs md:text-sm uppercase tracking-wider">
                            {screenshot.device}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2">
                          {screenshot.title}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons */}
                <Button
                  onClick={prevSlide}
                  size="sm"
                  variant="ghost"
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
                >
                  <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                </Button>

                <Button
                  onClick={nextSlide}
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3"
                >
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}