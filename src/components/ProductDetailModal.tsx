'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Star, Flame, Sparkles, ShieldCheck, Heart, ShoppingBag, Check, Award, ChevronRight } from 'lucide-react';
import { CandleProduct } from '@/data/candles';

interface ProductDetailModalProps {
  product: CandleProduct | null;
  onClose: () => void;
  onAddToCart: (product: CandleProduct, quantity: number, wick: string) => void;
  onToggleWishlist: (product: CandleProduct) => void;
  isWishlisted: boolean;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductDetailModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedWick, setSelectedWick] = useState(product.wickType);
  const [activeTab, setActiveTab] = useState<'details' | 'scent' | 'reviews'>('details');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedWick);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090807]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#13110e] border border-[#d4af37]/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#090807]/80 text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#1a1714] border border-[#d4af37]/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Image Gallery */}
          <div className="relative min-h-[380px] md:min-h-full bg-[#1a1714] flex items-center justify-center p-6">
            <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-[#d4af37]/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-transparent to-transparent opacity-60" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-[#090807]/80 text-[#d4af37] border border-[#d4af37]/40 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Header Details */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-[#d4af37]">
                  <Star className="w-4 h-4 fill-[#d4af37]" />
                  <span className="font-bold text-[#f8f5ee]">{product.rating}</span>
                  <span className="text-[#8c8477]">({product.reviewCount} customer reviews)</span>
                </div>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-full border transition-all ${
                    isWishlisted
                      ? 'bg-[#d4af37] text-[#090807] border-[#d4af37]'
                      : 'bg-[#1c1814] text-[#c5beb1] border-[#d4af37]/20 hover:text-[#f4e5b6]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#f8f5ee] mb-2 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#c5beb1] italic mb-4">"{product.tagline}"</p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#d4af37]/20">
                <span className="text-3xl font-serif font-bold text-[#d4af37]">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#8c8477] line-through">
                    ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="ml-auto text-xs text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full font-medium border border-[#10b981]/30">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Navigation Tabs inside modal */}
              <div className="flex border-b border-[#d4af37]/20 mb-5">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 px-3 text-xs font-semibold transition-all border-b-2 ${
                    activeTab === 'details'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-[#8c8477] hover:text-[#c5beb1]'
                  }`}
                >
                  Overview & Specs
                </button>
                <button
                  onClick={() => setActiveTab('scent')}
                  className={`pb-2.5 px-3 text-xs font-semibold transition-all border-b-2 ${
                    activeTab === 'scent'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-[#8c8477] hover:text-[#c5beb1]'
                  }`}
                >
                  Scent Pyramid
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 px-3 text-xs font-semibold transition-all border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-[#8c8477] hover:text-[#c5beb1]'
                  }`}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>

              {/* Tab 1: Details */}
              {activeTab === 'details' && (
                <div className="space-y-4 text-xs text-[#c5beb1] leading-relaxed">
                  <p>{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/15">
                      <div className="text-[10px] text-[#8c8477] uppercase font-bold">Burn Duration</div>
                      <div className="text-sm font-semibold text-[#f8f5ee] flex items-center gap-1.5 mt-0.5">
                        <Flame className="w-4 h-4 text-[#ff9e2c]" /> {product.burnTime}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/15">
                      <div className="text-[10px] text-[#8c8477] uppercase font-bold">Vessel Weight</div>
                      <div className="text-sm font-semibold text-[#f8f5ee] flex items-center gap-1.5 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> {product.weight}
                      </div>
                    </div>
                  </div>

                  {/* Scent Intensity Gauge */}
                  <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/15">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#8c8477] uppercase font-bold">Fragrance Intensity</span>
                      <span className="text-xs font-bold text-[#ff9e2c]">
                        {product.scentIntensity} / 5 ({product.scentIntensity >= 4 ? 'Rich & Room-Filling' : 'Subtle & Gentle'})
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-2 flex-1 rounded-full transition-all ${
                            lvl <= product.scentIntensity
                              ? 'bg-gradient-to-r from-[#ff9e2c] to-[#d4af37] shadow-[0_0_8px_rgba(255,158,44,0.5)]'
                              : 'bg-[#25201a]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Scent Pyramid */}
              {activeTab === 'scent' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/20">
                    <div className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#ff9e2c]" /> Top Notes (Initial Impressions)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.fragranceNotes.top.map((note) => (
                        <span key={note} className="px-2.5 py-1 rounded-md bg-[#25201a] text-[#f4e5b6] text-xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/20">
                    <div className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
                      <Flame className="w-3.5 h-3.5 text-[#ff9e2c]" /> Heart Notes (Core Character)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.fragranceNotes.heart.map((note) => (
                        <span key={note} className="px-2.5 py-1 rounded-md bg-[#25201a] text-[#f4e5b6] text-xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/20">
                    <div className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5 mb-1">
                      <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Base Notes (Lingering Aura)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.fragranceNotes.base.map((note) => (
                        <span key={note} className="px-2.5 py-1 rounded-md bg-[#25201a] text-[#f4e5b6] text-xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Customer Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-xl bg-[#1c1814] border border-[#d4af37]/15">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-[#f8f5ee]">{rev.author}</span>
                          <span className="text-[10px] text-[#8c8477]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-[#3a332a]'
                              }`}
                            />
                          ))}
                          <span className="text-[10px] text-[#10b981] ml-2 font-medium">✓ Verified Purchase</span>
                        </div>
                        <h4 className="text-xs font-semibold text-[#d4af37] mb-0.5">{rev.title}</h4>
                        <p className="text-xs text-[#c5beb1] font-light leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-[#8c8477] bg-[#1c1814] rounded-xl">
                      Be the first to review this handcrafted luxury candle!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="pt-6 mt-6 border-t border-[#d4af37]/20 space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f8f5ee]">Select Quantity:</span>
                <div className="flex items-center rounded-lg bg-[#1c1814] border border-[#d4af37]/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#c5beb1] hover:text-[#f4e5b6]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-[#f8f5ee]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#c5beb1] hover:text-[#f4e5b6]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
                  added
                    ? 'bg-[#10b981] text-white'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] hover:scale-[1.02] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Shopping Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
