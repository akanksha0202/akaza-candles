'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'Custom Wedding Favors',
    message: ''
  });

  const faqs = [
    {
      q: 'What makes organic soy wax superior to paraffin candles?',
      a: 'Paraffin wax is a petroleum byproduct that releases toxic soot and benzene. Akaza Candles use 100% plant-based organic soy & beeswax, ensuring a clean, non-toxic burn that lasts up to 50% longer.'
    },
    {
      q: 'How do I care for wooden wicks for the best crackling burn?',
      a: 'Trim your wooden wick to 1/4 inch before each light. Allow the wax pool to melt completely to the edges of the jar on the first burn to prevent tunneling.'
    },
    {
      q: 'Do you offer bulk discounts for corporate gifting or weddings?',
      a: 'Yes! We specialize in custom engraved glass jars, bespoke fragrance creation, and elegant gold foil box packaging for orders of 25+ units. Contact us via the form for custom pricing.'
    },
    {
      q: 'What is your shipping and return policy?',
      a: 'We offer free shipping on orders above ₹799. If you are not 100% delighted with your candle fragrance within 30 days, we will exchange it free of charge.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#120e0b] relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Inquiry Form */}
          <div className="p-8 rounded-3xl bg-[#13110e] border border-[#d4af37]/30 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-[#f8f5ee] mb-2">
              Custom Favors & General Inquiries
            </h3>
            <p className="text-xs text-[#c5beb1] font-light mb-6">
              Have a question about fragrances or want custom wedding/corporate gifting? We’d love to hear from you.
            </p>

            {submitted ? (
              <div className="p-6 text-center bg-[#1c1814] border border-[#10b981]/40 rounded-2xl space-y-3">
                <CheckCircle className="w-10 h-10 text-[#10b981] mx-auto" />
                <h4 className="text-lg font-serif font-bold text-[#f8f5ee]">Message Received!</h4>
                <p className="text-xs text-[#c5beb1]">
                  Thank you for reaching out to Akaza Candles. Our artisan fragrance concierge will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sophia Laurent"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-4 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sophia@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-4 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Inquiry Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-4 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Custom Wedding Favors">Custom Wedding Favors</option>
                    <option value="Corporate Gifting Vaults">Corporate Gifting Vaults</option>
                    <option value="Fragrance Recommendation">Fragrance Recommendation</option>
                    <option value="Store Partnership">Store Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c5beb1] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event date, estimated quantity, or candle scent preference..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#1c1814] border border-[#d4af37]/25 rounded-xl px-4 py-2.5 text-xs text-[#f8f5ee] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-[#090807] font-bold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider">Help & FAQs</span>
              <h3 className="text-3xl font-serif font-bold text-[#f8f5ee] mt-1">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#13110e] border border-[#d4af37]/20 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 text-xs font-bold text-[#f8f5ee] flex items-center justify-between hover:text-[#d4af37]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-[#c5beb1] font-light leading-relaxed border-t border-[#d4af37]/10 bg-[#171411]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
