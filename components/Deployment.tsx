"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Cloud, Server, Dock as Docker, Zap, CheckCircle } from 'lucide-react';
import { translations, Language } from '@/lib/i18n';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DeploymentProps {
  language: Language;
}

export function Deployment({ language }: DeploymentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

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
        cardsRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        codeRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: codeRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const deploymentOptions = t.deployment.options.map((option, index) => ({
    ...option,
    icon: [Zap, Docker, Server, Cloud][index],
    color: [
      'from-orange-500 to-red-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500'
    ][index],
    recommended: index === 0
  }));

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-purple-950/30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent px-4"
        >
          {t.deployment.title}
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
          {deploymentOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card
                key={index}
                className={`bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:transform hover:scale-105 backdrop-blur-sm relative overflow-hidden h-full ${
                  option.recommended ? 'ring-2 ring-orange-500/50' : ''
                }`}
              >
                {option.recommended && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                    {t.deployment.recommended}
                  </Badge>
                )}
                <CardHeader>
                  <div className={`inline-flex p-2 md:p-3 rounded-full bg-gradient-to-r ${option.color} mb-4 w-fit`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-white group-hover:text-gray-200 transition-colors">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm md:text-base text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div ref={codeRef} className="max-w-4xl mx-auto px-4">
          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Terminal className="h-6 w-6 text-green-400" />
                <CardTitle className="text-lg md:text-xl text-white">{t.deployment.quickStart}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-950/80 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto">
                <div className="text-gray-400 mb-2"># Clone repository</div>
                <div className="text-green-400 mb-4">git clone https://github.com/your-org/FFHS.git</div>
                
                <div className="text-gray-400 mb-2"># Add .env </div>
                <div className="text-red-400 mb-4">touch .env</div>
                
                <div className="text-gray-400 mb-2"># Docker-compose</div>
                <div className="text-purple-400">docker-compose up -d</div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Terminal className="mr-2 h-4 w-4" />
                  {t.deployment.installGuide}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Docker className="mr-2 h-4 w-4" />
                  {t.deployment.dockerHub}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}