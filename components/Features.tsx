"use client";

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import {
  FolderOpen,
  Zap,
  Shield,
  Code,
  FileText,
  Settings,
  Database,
  Globe,
} from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturesProps {
  language: Language;
}

const DEFAULT_ICONS = [
  FolderOpen,
  Zap,
  Shield,
  Code,
  FileText,
  Settings,
  Database,
  Globe,
];
const DEFAULT_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-yellow-500 to-orange-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-teal-500 to-cyan-500',
  'from-red-500 to-pink-500',
  'from-violet-500 to-purple-500',
];

export function Features({ language }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  const features = useMemo(() => {
    const items = Array.isArray(t.features?.items) ? t.features.items : [];
    return items.map((item, index) => ({
      title: item.title || '',
      description: item.description || '',
      icon: DEFAULT_ICONS[index] || FolderOpen,
      color: DEFAULT_COLORS[index] || 'from-slate-500 to-slate-600',
    }));
  }, [t.features]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        gsap.fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
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
          cardsRef.current?.children || [],
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else {
        if (titleRef.current) {
          gsap.set(titleRef.current, { opacity: 1, y: 0 });
        }
        if (cardsRef.current) {
          Array.from(cardsRef.current.children).forEach((el) =>
            gsap.set(el, { opacity: 1, y: 0, scale: 1 })
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const patternSvg = encodeURIComponent(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.08"><path d="M10 10h8v8h-8zM30 10h8v8h-8zM50 10h8v8h-8zM10 30h8v8h-8zM30 30h8v8h-8zM50 30h8v8h-8zM10 50h8v8h-8zM30 50h8v8h-8zM50 50h8v8h-8z"/></g></g></svg>`
  );

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-blue-950/40" />

        <div
          className="absolute inset-0 opacity-5"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,${patternSvg}")`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating subtle file icons para dar textura */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute text-[1.2rem] opacity-10 animate-pulse"
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
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-950/30 bg-clip-text text-transparent px-4"
        >
          {t.features?.title || 'Features'}
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="bg-slate-900/60 border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:scale-105 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 h-full"
              >
                <CardContent className="p-6 md:p-8 text-center h-full flex flex-col">
                  <div
                    className={`inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r ${feature.color} mb-4 w-auto h-auto group-hover:scale-110 transition-transform duration-300`}
                    style={{ minWidth: 0 }}
                  >
                    <Icon
                      className="h-6 w-6 md:h-8 md:w-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
