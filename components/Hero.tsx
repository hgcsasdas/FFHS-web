"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Github, Download, Zap, Folder, File, FolderOpen } from 'lucide-react';
import { translations, Language } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = translations[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // Etapa 1 → aparece
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )

        // Etapa 1 → desaparece
        .to([titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: -50,
          duration: 1,
          delay: 2,
          ease: "power2.in",
        })

        // Etapa 2 → aparece
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )

        // Etapa 2 → desaparece
        .to([titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: -50,
          duration: 1,
          delay: 2,
          ease: "power2.in",
        });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  const titleText = t.hero.title;
  const splitTitle = titleText.split('').map((char, index) => (
    <span key={index} className="inline-block">
      {char}
    </span>
  ));

  const handleClick = () => {
    router.push('https://github.com/hgcsasdas/FFHS');
  };

  https://github.com/hgcsasdas/FFHS

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-purple-500/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Connected starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 ${4 + Math.random() * 8}px currentColor`,
            }}
          />
        ))}

        {/* Connection lines */}
        {/* <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#gradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg> */}
      </div>

      {/* Floating file system elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-blue-400/40">
          <Folder className="w-12 h-12" />
        </div>
        <div className="absolute top-40 right-20 text-purple-400/40">
          <File className="w-8 h-8" />
        </div>
        <div className="absolute bottom-40 left-20 text-green-400/40">
          <FolderOpen className="w-10 h-10" />
        </div>
        <div className="absolute bottom-20 right-10 text-blue-400/40">
          <File className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 left-5 text-purple-400/40">
          <Folder className="w-7 h-7" />
        </div>
        <div className="absolute top-1/3 right-5 text-green-400/40">
          <File className="w-9 h-9" />
        </div>
      </div>

      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          {splitTitle}
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 font-light tracking-wide px-4"
        >
          {t.hero.subtitle}
        </p>

        <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          {t.hero.description}
        </p>

        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          {/* <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25"
          >
            <Download className="mr-2 h-5 w-5" />
            {t.hero.startButton}
          </Button> */}

          <Button
            size="lg"
            variant="outline"
            onClick={handleClick}
            className="w-full sm:w-auto border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-green-400/25"
          >
            <Github className="mr-2 h-5 w-5" />
            {t.hero.githubButton}
          </Button>


        </div>
      </div>
    </section>
  );
}