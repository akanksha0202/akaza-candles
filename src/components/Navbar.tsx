'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, Flame, Check } from 'lucide-react';
import { CandleProduct } from '@/data/candles';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenSearch: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenQuiz,
  onOpenSearch,
  activeCategory,
  setActiveCategory
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'All Collection', cat: 'All' },
    { label: 'Signature Soy', cat: 'Signature Soy' },
    { label: 'Aromatherapy', cat: 'Aromatherapy' },
    { label: 'Festive & Diya', cat: 'Festive & Diya' },
    { label: 'Gift Vault', cat: 'Luxury Gift Sets' },
    { label: 'Wooden Wicks', cat: 'Wooden Wick' },
  ];

  return (
    <>
      {/* Top Ambient Banner */}
      <div className="bg-gradient-to-r from-[#14100b] via-[#2a2014] to-[#14100b] text-[#f4e5b6] text-xs font-medium py-2 px-4 border-b border-[#d4af37]/20 flex items-center justify-between">
        <div className="mx-auto flex items-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#ff9e2c] animate-pulse" />
          <span>Complimentary Gift Packaging on every order • Free Shipping above ₹799</span>
          <span className="hidden sm:inline-block text-[#d4af37] font-semibold bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/30">Use Code: AKAZA10</span>
        </div>
      </div>

      {/* Main Header Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-[#090807]/90 backdrop-blur-md border-b border-[#d4af37]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-[#090807]/60 backdrop-blur-sm border-b border-[#d4af37]/10 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#d4af37] via-[#f7ebbe] to-[#b8860b] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#090807] overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="AKAZA CANDLES Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full scale-105"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#fff2cb] via-[#d4af37] to-[#e5c158] font-bold">
                AKAZA
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5beb1] font-light -mt-1 flex items-center gap-1">
                Handcrafted Candles <Flame className="w-2.5 h-2.5 text-[#ff9e2c] inline" />
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#141210]/60 p-1.5 rounded-full border border-[#d4af37]/20">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.cat;
              return (
                <button
                  key={link.cat}
                  onClick={() => {
                    setActiveCategory(link.cat);
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-semibold shadow-[0_2px_10px_rgba(212,175,55,0.4)]'
                      : 'text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#1f1a14]'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Scent Quiz CTA */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c1814] text-[#f4e5b6] text-xs font-medium border border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#2a221a] transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff9e2c]" />
              <span>Scent Quiz</span>
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Candles"
              className="p-2 rounded-full text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#1f1a14] border border-transparent hover:border-[#d4af37]/20 transition-all"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <div className="relative hidden sm:block">
              <button
                aria-label="Wishlist"
                className="p-2 rounded-full text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#1f1a14] transition-all"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#d4af37] text-[#090807] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-semibold text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#090807] text-[#f4e5b6] text-[11px] font-bold flex items-center justify-center ml-0.5">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#c5beb1] hover:text-[#f4e5b6]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] z-30 bg-[#090807]/95 border-b border-[#d4af37]/30 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-semibold text-sm shadow-md mb-2"
            >
              <Sparkles className="w-4 h-4" /> Take Scent Match Quiz
            </button>

            <span className="text-[11px] uppercase tracking-wider text-[#c5beb1] font-semibold px-2">Categories</span>
            {navLinks.map((link) => (
              <button
                key={link.cat}
                onClick={() => {
                  setActiveCategory(link.cat);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all ${activeCategory === link.cat
                    ? 'bg-[#1c1814] text-[#d4af37] font-bold border-l-2 border-[#d4af37]'
                    : 'text-[#c5beb1] hover:bg-[#141210]'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
