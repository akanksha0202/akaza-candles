'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Sparkles, Flame, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090807] border-t border-[#d4af37]/25 text-[#c5beb1] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#d4af37]/15">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#f7ebbe] to-[#b8860b] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <div className="w-full h-full rounded-full bg-[#090807] overflow-hidden flex items-center justify-center">
                  <Image src="/logo.png" alt="AKAZA CANDLES Logo" width={48} height={48} className="object-cover" />
                </div>
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff2cb] via-[#d4af37] to-[#e5c158] tracking-widest">
                  AKAZA CANDLES
                </span>
                <p className="text-[10px] text-[#8c8477] uppercase tracking-widest">Handcrafted Organic Soy Scents</p>
              </div>
            </div>

            <p className="text-xs font-light leading-relaxed max-w-sm">
              Artisan poured candles designed to transform everyday living spaces into serene, fragrant sanctuaries. 100% organic soy wax, non-toxic essential oils, and crackling FSC-certified wood wicks.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#f8f5ee] block mb-2">
                Join the Akaza Ritual Club • Receive 10% Off
              </span>
              {subscribed ? (
                <div className="text-xs text-[#10b981] flex items-center gap-1.5 bg-[#10b981]/10 p-2.5 rounded-xl border border-[#10b981]/30">
                  <Check className="w-4 h-4" /> Welcome to the family! Check your inbox for your 10% discount code.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#13110e] border border-[#d4af37]/30 rounded-xl px-3.5 py-2 text-xs text-[#f8f5ee] placeholder-[#8c8477] focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] text-xs font-bold hover:scale-105 transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f8f5ee] uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Signature Soy Candles</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Aromatherapy Scents</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Festive Saffron & Diya</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Luxury Gift Vaults</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Crackling Wooden Wicks</a></li>
            </ul>
          </div>

          {/* Col 3: Craftsmanship */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f8f5ee] uppercase tracking-wider">Our Craft</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">100% Organic Soy Sourcing</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Wooden Wick Care Guide</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Fragrance Pyramids</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Sustainability Pledge</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Bulk Wedding Favors</a></li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#f8f5ee] uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#contact" className="hover:text-[#d4af37] transition-colors">Contact Concierge</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">30-Day Guarantee</a></li>
              <li><a href="#" className="hover:text-[#d4af37] transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8c8477] gap-4">
          <p>© {new Date().getFullYear()} AKAZA CANDLES. All Rights Reserved. Hand-poured with love.</p>
          <div className="flex items-center gap-4">
            <span>256-Bit SSL Secure Payment</span>
            <span>•</span>
            <span>Worldwide Climate-Neutral Express Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
