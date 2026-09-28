'use client';

import { CRAFTSMANSHIP_STEPS } from '@/data/candles';
import { Leaf, Sparkles, Flame, ShieldCheck, Heart } from 'lucide-react';

export default function CraftsmanshipSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-6 h-6 text-[#d4af37]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#ff9e2c]" />;
      case 'Flame': return <Flame className="w-6 h-6 text-[#ff9e2c]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#d4af37]" />;
      default: return <Heart className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section className="py-20 bg-[#090807] relative overflow-hidden border-t border-b border-[#d4af37]/15">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-bold">
            The Akaza Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f8f5ee] mt-2 mb-4">
            Uncompromising Artisan Craftsmanship
          </h2>
          <p className="text-sm sm:text-base text-[#c5beb1] font-light leading-relaxed">
            Every Akaza candle is a blend of ancient ritual traditions and modern botanical perfumery. We hand-pour in small batches to preserve fragrance integrity.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFTSMANSHIP_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-[#13110e] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1c1814] border border-[#d4af37]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(step.icon)}
                </div>
                <span className="text-2xl font-serif font-bold text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#f8f5ee] mb-2 group-hover:text-[#d4af37] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-[#c5beb1] font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
