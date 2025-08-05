"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Showcase } from '@/components/Showcase';
import { Deployment } from '@/components/Deployment';
import { Footer } from '@/components/Footer';
import { Language } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize smooth scrolling and global animations
      gsap.to('body', {
        backgroundColor: '#0a0a0a',
        duration: 0.1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
      <Navbar language={language} setLanguage={setLanguage} />
      <div id="hero">
        <Hero language={language} />
      </div>
      <div id="features">
        <Features language={language} />
      </div>
      <div id="showcase">
        <Showcase language={language} />
      </div>
      <div id="deployment">
        <Deployment language={language} />
      </div>
      <Footer language={language} />
    </main>
  );
}