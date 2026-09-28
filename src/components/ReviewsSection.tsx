'use client';

import { Star, Quote, CheckCircle2, ThumbsUp } from 'lucide-react';

export default function ReviewsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sophia Laurent',
      role: 'Interior Designer',
      rating: 5,
      title: 'Transforms the mood of any room instantly',
      comment: 'Akaza Candles are on another level compared to standard luxury brands. The Royal Oud scent fills my living room with a rich, velvety warmth, and the wooden wick crackle is pure serenity.',
      candle: 'Royal Oud & Amber Solace',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Ananya Roy',
      role: 'Holistic Therapist',
      rating: 5,
      title: 'Clean burn with zero headaches',
      comment: 'As someone sensitive to artificial perfumes, finding pure soy candles with genuine essential oils was a revelation. The Eucalyptus & Wild Mint is my essential study ritual companion.',
      candle: 'Eucalyptus & Wild Mint Revive',
      verified: true
    },
    {
      id: 3,
      name: 'Julian Vance',
      role: 'Architecture Critic',
      rating: 5,
      title: 'Stunning design aesthetic & long burn time',
      comment: 'The gold line details on the vessel are breathtaking. It burns evenly down to the last millimeter without tunneling. Truly exceptional craftsmanship.',
      candle: 'Golden Diya Serenity',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-[#090807] relative overflow-hidden border-b border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1814] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-[#d4af37]" /> Verified Customer Voices
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f8f5ee]">
            Loved in 10,000+ Homes
          </h2>
          <p className="text-xs sm:text-sm text-[#c5beb1] font-light mt-2">
            Discover why candle connoisseurs choose Akaza Candles for their everyday rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#13110e] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#d4af37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#d4af37]/30" />
                </div>

                <h3 className="text-sm font-serif font-bold text-[#f8f5ee] mb-2">"{t.title}"</h3>
                <p className="text-xs text-[#c5beb1] font-light leading-relaxed mb-4">
                  {t.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#f8f5ee] flex items-center gap-1">
                    {t.name}
                    {t.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />}
                  </div>
                  <div className="text-[10px] text-[#8c8477]">{t.role}</div>
                </div>

                <span className="text-[10px] text-[#d4af37] bg-[#1c1814] px-2 py-1 rounded border border-[#d4af37]/20 font-medium">
                  {t.candle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
