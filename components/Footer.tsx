"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import {
  Github,
  Heart,
  Star,
  ExternalLink,
  FileText,
  Code
} from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/20 to-purple-950/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/5 to-transparent"></div>

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent px-4">
            {t.footer.title}
          </h3>
          <p className="text-base md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
            {t.footer.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Github className="mr-2 h-5 w-5" />
              {t.footer.starButton}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              {t.footer.docsButton}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
          <div className='flex flex-col justify-center items-center'>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.sections.project.title}</h4>
            <ul className="space-y-2 text-gray-400">
              {t.footer.sections.project.links.map((link, index) => (
                <li key={index}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.sections.community.title}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><Github className="h-4 w-4 mr-2" />{t.footer.sections.community.links[0]}</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><Code className="h-4 w-4 mr-2" />{t.footer.sections.community.links[1]}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.sections.community.links[2]}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.sections.community.links[3]}</a></li>
            </ul>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.sections.support.title}</h4>
            <ul className="space-y-2 text-gray-400">
              {/* <li><a href="#" className="hover:text-white transition-colors">{t.footer.sections.support.links[0]}</a></li> */}
              <li><a href="#" className="hover:text-white transition-colors flex items-center"><FileText className="h-4 w-4 mr-2" />{t.footer.sections.support.links[1]}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.sections.support.links[2]}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.sections.support.links[3]}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p className="mb-4 md:mb-0">
              {t.footer.madeWith} <Heart className="h-4 w-4 inline text-red-500" /> {t.footer.community}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm">MIT License</span>
              <span className="text-sm">•</span>
              <span className="text-sm">© 2025 FFHS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}