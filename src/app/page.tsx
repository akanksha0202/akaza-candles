'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ScentQuizModal from '@/components/ScentQuizModal';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import GiftSetsSection from '@/components/GiftSetsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { CANDLE_PRODUCTS, CandleProduct } from '@/data/candles';
import { Search, SlidersHorizontal, Flame, Sparkles, X, Check } from 'lucide-react';

export default function Home() {
  // State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Default initial cart item for immediate interactive experience!
    { product: CANDLE_PRODUCTS[0], quantity: 1, wick: CANDLE_PRODUCTS[0].wickType }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['akaza-02']);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CandleProduct | null>(null);
  const [checkoutGiftWrap, setCheckoutGiftWrap] = useState(false);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart actions
  const handleAddToCart = (product: CandleProduct, quantity = 1, wick?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, wick: wick || product.wickType }];
    });
    showToast(`Added "${product.name}" to your shopping bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist actions
  const handleToggleWishlist = (product: CandleProduct) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Filtered and sorted products calculation
  const filteredProducts = useMemo(() => {
    let result = [...CANDLE_PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.fragranceNotes.top.some((n) => n.toLowerCase().includes(q)) ||
          item.fragranceNotes.heart.some((n) => n.toLowerCase().includes(q))
      );
    }

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortOption]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090807] text-[#f8f5ee] flex flex-col selection:bg-[#d4af37] selection:text-[#090807]">
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1814] text-[#f4e5b6] border border-[#d4af37] px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-[#ff9e2c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Section */}
      <Hero
        onExplore={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Candle Catalog Section */}
      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" id="catalog-section">
        {/* Catalog Control Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#d4af37]/20 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold">
              Artisan Candle Vault
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f8f5ee] mt-1">
              {activeCategory === 'All' ? 'All Handcrafted Candles' : activeCategory}
            </h2>
            <p className="text-xs text-[#c5beb1] font-light mt-1">
              Showing {filteredProducts.length} organic soy candle creation{filteredProducts.length === 1 ? '' : 's'}
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8c8477] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search notes (e.g. Amber, Oud, Jasmine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#13110e] border border-[#d4af37]/25 rounded-full pl-9 pr-8 py-2 text-xs text-[#f8f5ee] placeholder-[#8c8477] focus:outline-none focus:border-[#d4af37] w-56 sm:w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[#8c8477] hover:text-[#f8f5ee]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#13110e] border border-[#d4af37]/25 rounded-full px-3.5 py-2 text-xs text-[#c5beb1]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="bg-transparent text-[#f8f5ee] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#13110e]">Featured</option>
                <option value="price-low" className="bg-[#13110e]">Price: Low to High</option>
                <option value="price-high" className="bg-[#13110e]">Price: High to Low</option>
                <option value="rating" className="bg-[#13110e]">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#13110e] rounded-3xl border border-[#d4af37]/15">
            <Flame className="w-12 h-12 text-[#ff9e2c] mx-auto mb-3 animate-pulse" />
            <h3 className="text-xl font-serif font-bold text-[#f8f5ee]">No candles match your query</h3>
            <p className="text-xs text-[#c5beb1] mt-1 max-w-sm mx-auto">
              Try resetting your search query or selecting another category from the top navigation bar.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={(p) => handleToggleWishlist(p)}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Craftsmanship Story Section */}
      <CraftsmanshipSection />

      {/* Luxury Gift Vaults Showcase Section */}
      <GiftSetsSection
        onExploreGiftSets={() => {
          setActiveCategory('Luxury Gift Sets');
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Customer Reviews Section */}
      <ReviewsSection />

      {/* Custom Orders & FAQ Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q, w) => {
          handleAddToCart(p, q, w);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      {/* 2. Interactive Scent Quiz Modal */}
      {isQuizOpen && (
        <ScentQuizModal
          onClose={() => setIsQuizOpen(false)}
          onSelectProduct={(matched) => setSelectedProduct(matched)}
        />
      )}

      {/* 3. Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={(giftWrap, code) => {
          setCheckoutGiftWrap(giftWrap);
          setCheckoutPromoCode(code);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 4. Checkout Order Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        giftWrapping={checkoutGiftWrap}
        promoCode={checkoutPromoCode}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* 5. Quick Instant Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-[#090807]/90 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#13110e] border border-[#d4af37]/40 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/20 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f8f5ee]">
                <Search className="w-4 h-4 text-[#d4af37]" /> Instant Fragrance Search
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="text-[#8c8477] hover:text-[#f8f5ee]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Type fragrance notes (Oud, Saffron, Lavender)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1814] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm text-[#f8f5ee] placeholder-[#8c8477] focus:outline-none focus:border-[#d4af37]"
            />
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {filteredProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1814] hover:bg-[#25201a] cursor-pointer border border-[#d4af37]/10"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-[#f8f5ee]">{p.name}</div>
                      <div className="text-[10px] text-[#8c8477]">{p.category}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#d4af37]">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
