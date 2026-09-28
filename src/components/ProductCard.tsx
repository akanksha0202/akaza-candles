'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Flame, Eye, Heart, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { CandleProduct } from '@/data/candles';

interface ProductCardProps {
  product: CandleProduct;
  onQuickView: (product: CandleProduct) => void;
  onAddToCart: (product: CandleProduct) => void;
  onToggleWishlist: (product: CandleProduct) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      className="group relative rounded-2xl bg-[#13110e]/90 border border-[#d4af37]/15 hover:border-[#d4af37]/45 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)]"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isBestseller && (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            ★ Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2.5 py-1 rounded-full bg-[#1c1814] text-[#ff9e2c] border border-[#ff9e2c]/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            New Arrival
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        aria-label="Add to Wishlist"
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted
            ? 'bg-[#d4af37] text-[#090807] scale-110 shadow-lg'
            : 'bg-[#090807]/60 text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#090807]'
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container with Hover Swap */}
      <div className="relative w-full h-72 overflow-hidden bg-[#1c1814]">
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110e] via-transparent to-transparent opacity-80" />

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#090807]/30 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-full bg-[#090807]/90 text-[#f4e5b6] text-xs font-semibold border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#1a1714] transition-all flex items-center gap-2 shadow-xl"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" /> Quick View
          </button>
        </div>

        {/* Fragrance Top Notes Tag */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#c5beb1] bg-[#090807]/75 backdrop-blur-md p-1.5 px-3 rounded-lg border border-[#d4af37]/20">
          <span className="flex items-center gap-1 truncate max-w-[70%]">
            <Sparkles className="w-3 h-3 text-[#ff9e2c] shrink-0" />
            <span className="truncate">{product.fragranceNotes.top.join(', ')}</span>
          </span>
          <span className="text-[#d4af37] font-medium shrink-0 flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#ff9e2c]" /> {product.burnTime.split('-')[0].trim()}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8c8477] uppercase tracking-wider text-[10px] font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#f4e5b6] font-medium">
              <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
              <span>{product.rating}</span>
              <span className="text-[#8c8477] text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-serif font-bold text-[#f8f5ee] group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#c5beb1] font-light line-clamp-2 mb-4 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-serif text-[#f8f5ee]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8c8477] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md ${
              added
                ? 'bg-[#10b981] text-white'
                : 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
