"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Globe,
  FolderOpen,
  ChevronDown
} from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function Navbar({ language, setLanguage }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // Animate logo letters
  //     gsap.fromTo(
  //       logoRef.current?.children || [],
  //       {
  //         y: -50,
  //         opacity: 0,
  //         rotationX: 90,
  //       },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         rotationX: 0,
  //         duration: 1,
  //         stagger: 0.1,
  //         ease: 'back.out(1.7)',
  //         delay: 0.2,
  //       }
  //     );

  //     // Continuous floating animation for logo
  //     gsap.to(logoRef.current, {
  //       y: -5,
  //       duration: 2,
  //       repeat: -1,
  //       yoyo: true,
  //       ease: 'power2.inOut',
  //     });
  //   }, navRef);

  //   return () => ctx.revert();
  // }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const logoText = 'FFHS';
  const splitLogo = logoText.split('').map((char, index) => (
    <span 
      key={index} 
      className="inline-block hover:text-blue-400 transition-colors duration-300"
      style={{
        textShadow: '0 0 10px currentColor',
      }}
    >
      {char}
    </span>
  ));

  const navItems = [
    { key: 'home', id: 'hero' },
    { key: 'features', id: 'features' },
    { key: 'showcase', id: 'showcase' },
    { key: 'deployment', id: 'deployment' },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blue-900/0 backdrop-blur-md border-b border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <FolderOpen className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              {splitLogo}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-100  duration-300 font-medium relative group"
              >
                {t.nav[item.key as keyof typeof t.nav]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language.toUpperCase()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-800/50 transition-colors ${
                      language === 'es' ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    🇪🇸 Español
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-800/50 transition-colors ${
                      language === 'en' ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-650/95 backdrop-blur-md border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300 rounded-md"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
              
              <div className="border-t border-gray-800 pt-2 mt-2">
                <button
                  onClick={() => {
                    setLanguage(language === 'es' ? 'en' : 'es');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300 rounded-md"
                >
                  <Globe className="h-4 w-4 mr-2 inline" />
                  {language === 'es' ? '🇺🇸 English' : '🇪🇸 Español'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}