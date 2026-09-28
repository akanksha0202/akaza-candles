'use client';

import { Sparkles, Gift, ArrowRight, HeartHandshake, Check } from 'lucide-react';
import Image from 'next/image';

interface GiftSetsSectionProps {
  onExploreGiftSets: () => void;
}

export default function GiftSetsSection({ onExploreGiftSets }: GiftSetsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-[#120e0b] via-[#1a1510] to-[#090807] relative border-b border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Imagery */}
          <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <div className="relative h-[420px] w-full bg-[#1c1814]">
              <Image
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Candle Gift Set Box"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#090807]/85 backdrop-blur-md border border-[#d4af37]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                <Gift className="w-4 h-4 text-[#ff9e2c]" /> Custom Gift Personalization
              </div>
              <p className="text-xs text-[#c5beb1]">
                Every gift vault includes a hand-written gold ink calligraphy note card and silk velvet ribbon tying.
              </p>
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1814] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#ff9e2c]" /> Corporate & Wedding Gifting
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f8f5ee] leading-tight">
              The Art of Unforgettable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff2cb] via-[#d4af37] to-[#e5c158]">
                Luxe Gifting
              </span>
            </h2>

            <p className="text-sm text-[#c5beb1] font-light leading-relaxed">
              Whether celebrating weddings, festive holidays, or corporate milestones, Akaza Candles crafts bespoke candle sets that leave a lasting memory of warmth and elegance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#f8f5ee]">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Check className="w-3 h-3" />
                </div>
                <span>Curate 3-piece or 6-piece bespoke scent combinations</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#f8f5ee]">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Check className="w-3 h-3" />
                </div>
                <span>Custom gold foil engraved glass vessels for weddings & events</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#f8f5ee]">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Check className="w-3 h-3" />
                </div>
                <span>Worldwide express delivery with climate-controlled packaging</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreGiftSets}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Browse Gift Vaults</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
