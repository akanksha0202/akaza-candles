'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, Tag, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { CandleProduct } from '@/data/candles';

export interface CartItem {
  product: CandleProduct;
  quantity: number;
  wick: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (giftWrap: boolean, code: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [giftWrapping, setGiftWrapping] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const freeShippingThreshold = 799;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = discountApplied ? subtotal * 0.10 : 0;
  const giftWrapFee = giftWrapping ? 420 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 671;
  const finalTotal = subtotal - discountAmount + giftWrapFee + shippingFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AKAZA10') {
      setDiscountApplied(true);
    } else {
      alert('Invalid code. Try "AKAZA10" for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#090807]/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13110e] border-l border-[#d4af37]/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#d4af37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-xl font-serif font-bold text-[#f8f5ee]">Shopping Bag</h3>
              <span className="text-xs text-[#d4af37] bg-[#1c1814] px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 font-semibold">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#c5beb1] hover:text-[#f4e5b6] hover:bg-[#1c1814] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#1c1814] p-4 border-b border-[#d4af37]/15">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-[#c5beb1]">
                {amountToFreeShipping > 0
                  ? `Add $${amountToFreeShipping.toFixed(2)} more for FREE express shipping`
                  : '🎉 You have unlocked FREE Express Shipping!'}
              </span>
              <span className="text-[#d4af37] font-bold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#25201a] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#ff9e2c] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1814] text-[#d4af37] border border-[#d4af37]/20 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#f8f5ee]">Your bag is currently empty</h4>
                <p className="text-xs text-[#c5beb1] font-light max-w-xs mx-auto">
                  Discover our organic hand-poured candles and fill your space with serene ambient light.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-bold text-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#1c1814] border border-[#d4af37]/15 hover:border-[#d4af37]/35 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#d4af37]/20">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-serif font-bold text-[#f8f5ee] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#8c8477] hover:text-[#ef4444] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-[#d4af37] font-medium flex items-center gap-1 mt-0.5">
                        <Flame className="w-3 h-3 text-[#ff9e2c]" /> {item.product.burnTime}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold font-serif text-[#f8f5ee]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center rounded-lg bg-[#25201a] border border-[#d4af37]/20">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#c5beb1] hover:text-[#f4e5b6]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#f8f5ee]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-[#c5beb1] hover:text-[#f4e5b6]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout & Summary Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#d4af37]/20 bg-[#141210] space-y-4">
              {/* Gift Wrap Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#c5beb1] p-2.5 rounded-xl bg-[#1c1814] border border-[#d4af37]/15">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="rounded accent-[#d4af37]"
                />
                <Gift className="w-4 h-4 text-[#ff9e2c]" />
                <span className="flex-1">Add Gold Foil Gift Box & Velvet Ribbon (+₹420)</span>
              </label>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8c8477]" />
                  <input
                    type="text"
                    placeholder="Discount code (Try AKAZA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl pl-9 pr-3 py-2 text-xs text-[#f8f5ee] placeholder-[#8c8477] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-[#25201a] text-[#d4af37] text-xs font-bold border border-[#d4af37]/30 hover:bg-[#2e2720]"
                >
                  Apply
                </button>
              </div>

              {/* Calculation Summary */}
              <div className="space-y-1.5 text-xs text-[#c5beb1]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#f8f5ee]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#10b981]">
                    <span>Promo Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {giftWrapping && (
                  <div className="flex justify-between">
                    <span>Gold Gift Box</span>
                    <span className="text-[#f8f5ee]">+₹420</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#f8f5ee]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold font-serif text-[#f8f5ee] border-t border-[#d4af37]/20">
                  <span>Estimated Total</span>
                  <span className="text-[#d4af37]">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(giftWrapping, discountApplied ? 'AKAZA10' : promoCode)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
