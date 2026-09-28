'use client';

import Image from 'next/image';
import { Sparkles, Flame, ShieldCheck, ArrowRight, Award, Star, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenQuiz: () => void;
}

export default function Hero({ onExplore, onOpenQuiz }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#090807] via-[#120e0b] to-[#090807]">
      {/* Background Ambient Glow & Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ff9e2c]/15 via-[#d4af37]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#b8860b]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        {/* Central Brand Logo Medallion */}
        <div className="mb-6 relative group cursor-pointer" onClick={onExplore}>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#ff9e2c] to-[#b8860b] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#fff2cb] to-[#aa841c] shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <div className="w-full h-full rounded-full bg-[#090807] overflow-hidden flex items-center justify-center border border-[#d4af37]/50">
              <Image
                src="/logo.png"
                alt="Akaza Candles Emblem"
                width={140}
                height={140}
                className="object-cover w-full h-full transform group-hover:scale-110 transition duration-700"
                priority
              />
            </div>
          </div>
        </div>

        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1814]/90 border border-[#d4af37]/40 text-[#f4e5b6] text-xs sm:text-sm font-medium mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <Flame className="w-4 h-4 text-[#ff9e2c] animate-flame" />
          <span>Hand-Poured Artisan Candles & Ritual Scents</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#f8f5ee] max-w-4xl leading-[1.15] mb-6">
          Illuminate Your Sanctuary with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff2cb] via-[#d4af37] to-[#e5c158]">
            Artisanal Warmth
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#c5beb1] max-w-2xl font-light leading-relaxed mb-10">
          Handcrafted in small batches using 100% organic soy wax, pure essential oil blends, and crackling wood wicks. Designed for serene spaces & elevated moments.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1c1814]/80 text-[#f4e5b6] font-semibold text-sm border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#25201a] transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#ff9e2c]" />
            <span>Find Your Signature Scent</span>
          </button>
        </div>

        {/* Trust Indicators Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-[#d4af37]/20">
          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-[#13110e]/60 border border-[#d4af37]/15">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-[#f8f5ee]">100% Organic Soy</div>
              <div className="text-[10px] text-[#8c8477]">Zero Paraffin & Lead</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-[#13110e]/60 border border-[#d4af37]/15">
            <Flame className="w-5 h-5 text-[#ff9e2c] shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-[#f8f5ee]">60+ Hr Clean Burn</div>
              <div className="text-[10px] text-[#8c8477]">Crackling Wood Wick</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-[#13110e]/60 border border-[#d4af37]/15">
            <Award className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-[#f8f5ee]">Small-Batch Poured</div>
              <div className="text-[10px] text-[#8c8477]">Hand Cured 14 Days</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-[#13110e]/60 border border-[#d4af37]/15">
            <Star className="w-5 h-5 text-[#f4e5b6] fill-[#d4af37] shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-[#f8f5ee]">4.9 / 5.0 Rating</div>
              <div className="text-[10px] text-[#8c8477]">10,000+ Happy Homes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
