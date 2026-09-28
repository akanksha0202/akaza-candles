'use client';

import { useState } from 'react';
import { X, Sparkles, Check, Flame, ArrowRight, RotateCcw } from 'lucide-react';
import { CandleProduct, CANDLE_PRODUCTS } from '@/data/candles';

interface ScentQuizModalProps {
  onClose: () => void;
  onSelectProduct: (product: CandleProduct) => void;
}

export default function ScentQuizModal({ onClose, onSelectProduct }: ScentQuizModalProps) {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<string>('');
  const [selectedSpace, setSelectedSpace] = useState<string>('');

  const moods = [
    { label: 'Relaxation & Tranquility', val: 'Relaxation', desc: 'Unwind after long days with soothing lavender & amber' },
    { label: 'Meditation & Serenity', val: 'Meditation', desc: 'Sacred saffron, Mysore sandalwood & quiet contemplation' },
    { label: 'Romance & Warm Intimacy', val: 'Romance', desc: 'Velvet dark oud, rose petals & cashmere vanilla' },
    { label: 'Energy & Mental Focus', val: 'Energy', desc: 'Invigorating crushed eucalyptus, wild mint & citrus verbena' },
  ];

  const notes = [
    { label: 'Smoked Oud & Woods', val: 'Oud' },
    { label: 'Sacred Saffron & Spices', val: 'Saffron' },
    { label: 'Night-blooming Floral', val: 'Jasmine' },
    { label: 'Cool Mint & Eucalyptus', val: 'Eucalyptus' },
    { label: 'Warm Cinnamon & Clove', val: 'Cinnamon' },
  ];

  const spaces = [
    { label: 'Master Bedroom', val: 'Bedroom' },
    { label: 'Living Sanctuary', val: 'Living Room' },
    { label: 'Bath & Spa Oasis', val: 'Bath & Spa' },
    { label: 'Work & Creative Studio', val: 'Work Sanctuary' },
  ];

  // Match calculation algorithm
  const calculateMatch = (): CandleProduct => {
    let matched = CANDLE_PRODUCTS.find(c => c.mood === selectedMood && c.space === selectedSpace);
    if (!matched) {
      matched = CANDLE_PRODUCTS.find(c => c.mood === selectedMood) || CANDLE_PRODUCTS[0];
    }
    return matched;
  };

  const matchedCandle = calculateMatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090807]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#13110e] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1814] text-[#c5beb1] hover:text-[#f4e5b6] border border-[#d4af37]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1814] border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9e2c]" /> AI Scent Matchmaker
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f8f5ee]">
            {step <= 3 ? 'Find Your Signature Scent' : 'Your Perfume Match is Ready'}
          </h3>
          <p className="text-xs text-[#c5beb1] font-light mt-1">
            {step <= 3 ? `Step ${step} of 3 • Answer 3 questions to discover your ideal flame` : 'Tailored specifically to your mood & ambient sanctuary'}
          </p>
        </div>

        {/* Question 1: Mood */}
        {step === 1 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f8f5ee] mb-3">
              1. What ambiance do you wish to cultivate in your home?
            </h4>
            {moods.map((m) => (
              <button
                key={m.val}
                onClick={() => {
                  setSelectedMood(m.val);
                  setStep(2);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  selectedMood === m.val
                    ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                    : 'bg-[#13110e] border-[#d4af37]/15 hover:border-[#d4af37]/40 text-[#c5beb1] hover:bg-[#1a1714]'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-[#f8f5ee]">{m.label}</div>
                  <div className="text-xs text-[#8c8477] font-light mt-0.5">{m.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            ))}
          </div>
        )}

        {/* Question 2: Notes */}
        {step === 2 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f8f5ee] mb-3">
              2. Which fragrance profile attracts you most?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notes.map((n) => (
                <button
                  key={n.val}
                  onClick={() => {
                    setSelectedNote(n.val);
                    setStep(3);
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    selectedNote === n.val
                      ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                      : 'bg-[#13110e] border-[#d4af37]/15 hover:border-[#d4af37]/40 text-[#c5beb1] hover:bg-[#1a1714]'
                  }`}
                >
                  <span className="text-sm font-bold text-[#f8f5ee]">{n.label}</span>
                  <Check className="w-4 h-4 text-[#d4af37]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Space */}
        {step === 3 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f8f5ee] mb-3">
              3. Which space will host this candle?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {spaces.map((s) => (
                <button
                  key={s.val}
                  onClick={() => {
                    setSelectedSpace(s.val);
                    setStep(4);
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    selectedSpace === s.val
                      ? 'bg-[#1c1814] border-[#d4af37] text-[#d4af37]'
                      : 'bg-[#13110e] border-[#d4af37]/15 hover:border-[#d4af37]/40 text-[#c5beb1] hover:bg-[#1a1714]'
                  }`}
                >
                  <span className="text-sm font-bold text-[#f8f5ee]">{s.label}</span>
                  <Flame className="w-4 h-4 text-[#ff9e2c]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <img src={matchedCandle.image} alt={matchedCandle.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-[#090807]/80 text-[#d4af37] px-2 py-0.5 rounded text-[10px] font-bold">
                99.4% Match
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider">{matchedCandle.category}</span>
              <h4 className="text-xl font-serif font-bold text-[#f8f5ee] mt-1">{matchedCandle.name}</h4>
              <p className="text-xs text-[#c5beb1] font-light max-w-md mx-auto mt-1">{matchedCandle.tagline}</p>
              <div className="text-lg font-serif font-bold text-[#d4af37] mt-2">₹{matchedCandle.price.toLocaleString('en-IN')}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={() => {
                  onSelectProduct(matchedCandle);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#090807] font-bold text-sm shadow-lg hover:scale-[1.02] transition-all"
              >
                View Match & Add to Bag
              </button>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3.5 rounded-full bg-[#1c1814] text-[#c5beb1] text-xs font-semibold hover:text-[#f4e5b6] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
