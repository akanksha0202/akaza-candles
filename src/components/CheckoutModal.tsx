'use client';

import { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, CreditCard, Lock, Sparkles, Flame, Copy } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  giftWrapping: boolean;
  promoCode: string;
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  giftWrapping,
  promoCode,
  onOrderSuccess
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card'
  });

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 799 ? 0 : 671;
  const giftWrapFee = giftWrapping ? 420 : 0;
  const discount = promoCode === 'AKAZA10' ? subtotal * 0.10 : 0;
  const total = subtotal + shipping + giftWrapFee - discount;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: form,
          paymentMethod: form.paymentMethod,
          giftWrapping,
          promoCode
        })
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult(data);
        setOrderComplete(true);
        onOrderSuccess();
      } else {
        alert(data.message || 'Error processing order');
      }
    } catch (err) {
      alert('Network error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090807]/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#13110e] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.25)] my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1814] text-[#c5beb1] hover:text-[#f4e5b6] border border-[#d4af37]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1814] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold mb-2">
                <Lock className="w-3.5 h-3.5 text-[#10b981]" /> 256-Bit SSL Encrypted Checkout
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#f8f5ee]">Complete Your Order</h3>
              <p className="text-xs text-[#c5beb1] font-light mt-1">
                Total: <span className="text-[#d4af37] font-bold">₹{total.toLocaleString('en-IN')}</span> ({items.length} items)
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@sanctuary.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Shipping Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="742 Evergreen Terrace"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="San Francisco, CA"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Zip / Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="94107"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#c5beb1] mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: 'card' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      form.paymentMethod === 'card'
                        ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                        : 'bg-[#141210] border-[#d4af37]/15 text-[#c5beb1]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: 'applepay' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      form.paymentMethod === 'applepay'
                        ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                        : 'bg-[#141210] border-[#d4af37]/15 text-[#c5beb1]'
                    }`}
                  >
                     Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      form.paymentMethod === 'cod'
                        ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                        : 'bg-[#141210] border-[#d4af37]/15 text-[#c5beb1]'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" /> Cash on Delivery
                  </button>
                </div>
              </div>

              {/* Order Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-bold text-sm shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? 'Processing Order...' : `Pay & Confirm Order • ₹${total.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt View */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold text-[#10b981] tracking-widest">Order Confirmed</span>
              <h3 className="text-2xl font-serif font-bold text-[#f8f5ee] mt-1">Thank You for Your Order!</h3>
              <p className="text-xs text-[#c5beb1] font-light max-w-md mx-auto mt-1">
                Your handcrafted candles are being carefully poured and prepared with gold foil packaging.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#1c1814] border border-[#d4af37]/25 rounded-2xl p-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#d4af37]/20 pb-2">
                <span className="text-[#8c8477]">Order Reference:</span>
                <span className="font-mono font-bold text-[#d4af37]">{orderResult?.orderId}</span>
              </div>

              <div className="flex justify-between border-b border-[#d4af37]/20 pb-2">
                <span className="text-[#8c8477]">Estimated Delivery:</span>
                <span className="font-semibold text-[#f8f5ee]">{orderResult?.estimatedDelivery}</span>
              </div>

              <div className="flex justify-between border-b border-[#d4af37]/20 pb-2">
                <span className="text-[#8c8477]">Total Paid:</span>
                <span className="font-bold text-[#d4af37]">₹{orderResult?.summary?.total?.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-[#8c8477]">Confirmation Sent To:</span>
                <span className="text-[#f8f5ee] font-medium">{form.email || 'customer@example.com'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-bold text-xs"
            >
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
