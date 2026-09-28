export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fragranceMatch: string;
}

export interface CandleProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage: string;
  category: 'Signature Soy' | 'Aromatherapy' | 'Festive & Diya' | 'Luxury Gift Sets' | 'Wooden Wick';
  burnTime: string;
  weight: string;
  waxType: string;
  wickType: string;
  fragranceNotes: FragranceNotes;
  scentIntensity: number; // 1 to 5
  mood: 'Relaxation' | 'Meditation' | 'Romance' | 'Energy' | 'Focus';
  space: 'Bedroom' | 'Living Room' | 'Bath & Spa' | 'Work Sanctuary';
  description: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  reviews?: CustomerReview[];
}

export const CANDLE_PRODUCTS: CandleProduct[] = [
  {
    id: 'akaza-01',
    name: 'Royal Oud & Amber Solace',
    tagline: 'Deep velvet oud infused with warm golden amber and smoked cardamom',
    price: 2849,
    originalPrice: 3528,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    category: 'Signature Soy',
    burnTime: '60 - 65 Hours',
    weight: '320g / 11.2 oz',
    waxType: '100% Hand-poured Organic Soy Wax & Golden Beeswax',
    wickType: 'Dual Natural Eco Wood Wick (Sustainably Sourced)',
    fragranceNotes: {
      top: ['Cardamom Pods', 'Bergamot Zest'],
      heart: ['Smoked Oud Wood', 'Damask Rose Petals'],
      base: ['Golden Amber', 'Raw Patchouli', 'Madagascar Vanilla']
    },
    scentIntensity: 5,
    mood: 'Relaxation',
    space: 'Living Room',
    description: 'An enchanting elixir inspired by twilight royalty. Our signature Royal Oud & Amber Solace candle emits a warm, meditative amber glow accompanied by soft wood crackles.',
    isBestseller: true,
    inStock: true,
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor Vance',
        rating: 5,
        date: '2 days ago',
        title: 'The absolute pinnacle of luxury candles!',
        comment: 'The wooden wick soft crackle instantly transforms my living room into a 5-star sanctuary. Scent throw is exquisite without being overwhelming.',
        verified: true,
        fragranceMatch: 'Royal Oud & Amber Solace'
      },
      {
        id: 'r2',
        author: 'Marcus Chen',
        rating: 5,
        date: '1 week ago',
        title: 'Rich, deep and long burning',
        comment: 'Bought this as a housewarming gift and ended up ordering three more for myself. The gold detailing on the glass vessel is stunning.',
        verified: true,
        fragranceMatch: 'Royal Oud & Amber Solace'
      }
    ]
  },
  {
    id: 'akaza-02',
    name: 'Golden Diya Serenity',
    tagline: 'Warm saffron nectar, sacred sandalwood, and toasted almond blossom',
    price: 3192,
    originalPrice: 3780,
    rating: 5.0,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    category: 'Festive & Diya',
    burnTime: '55 - 60 Hours',
    weight: '300g / 10.5 oz',
    waxType: 'Botanical Coconut-Soy Wax Blend with Gold Leaf Accents',
    wickType: 'Single Organic Unbleached Cotton Wick',
    fragranceNotes: {
      top: ['Kashmiri Saffron Threads', 'Sweet Mandarin Blossom'],
      heart: ['Mysore Sandalwood', 'Jasmine Sambac'],
      base: ['Toasted Almond', 'Golden Honeycomb', 'White Musk']
    },
    scentIntensity: 4,
    mood: 'Meditation',
    space: 'Bedroom',
    description: 'Crafted in honor of festive radiance, the Golden Diya Serenity candle captures sacred ritual aromas with rare Kashmiri saffron and buttery Mysore sandalwood.',
    isBestseller: true,
    isNewArrival: true,
    inStock: true,
    reviews: [
      {
        id: 'r3',
        author: 'Aarav Sharma',
        rating: 5,
        date: '3 days ago',
        title: 'Captures the magic of celebration',
        comment: 'The saffron and sandalwood combination is so authentic and calming. Brings immense warmth and serenity to evening prayers and relaxation.',
        verified: true,
        fragranceMatch: 'Golden Diya Serenity'
      }
    ]
  },
  {
    id: 'akaza-03',
    name: 'Midnight Jasmine & Cashmere',
    tagline: 'Night-blooming jasmine blossoms cradled in soft cashmere vanilla',
    price: 2688,
    rating: 4.8,
    reviewCount: 81,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    category: 'Aromatherapy',
    burnTime: '50 - 55 Hours',
    weight: '280g / 9.8 oz',
    waxType: '100% Pure Soy Wax Infused with Essential Oils',
    wickType: 'Crackling Natural Wood Wick',
    fragranceNotes: {
      top: ['Night-blooming Jasmine', 'White Tea Leaf'],
      heart: ['Cashmere Wood', 'Orchid Petals'],
      base: ['Tahitian Vanilla Bean', 'Clean Cedarwood']
    },
    scentIntensity: 4,
    mood: 'Romance',
    space: 'Bedroom',
    description: 'Sensual and soothing. Midnight Jasmine & Cashmere wraps your sanctuary in silk-soft warmth, ideal for intimate dinners and unwinding after dark.',
    inStock: true
  },
  {
    id: 'akaza-04',
    name: 'Eucalyptus & Wild Mint Revive',
    tagline: 'Crisp crushed eucalyptus, cooling menthol leaf, and lemon verbena',
    price: 2436,
    originalPrice: 2940,
    rating: 4.7,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    category: 'Aromatherapy',
    burnTime: '50 Hours',
    weight: '270g / 9.5 oz',
    waxType: 'Pure Plant-Based Soy Wax',
    wickType: 'Organic Cotton Wick',
    fragranceNotes: {
      top: ['Crisp Eucalyptus', 'Wild Peppermint'],
      heart: ['Lemon Verbena', 'Rosemary Sprigs'],
      base: ['White Birch', 'Clean Amber']
    },
    scentIntensity: 3,
    mood: 'Energy',
    space: 'Work Sanctuary',
    description: 'An invigorating botanical wake-up call for your mind. Perfect for your desk or spa routine to sharpen focus and relieve mental fatigue.',
    inStock: true
  },
  {
    id: 'akaza-05',
    name: 'Velvet Smoked Cinnamon & Clove',
    tagline: 'Artisan spiced rum, aged cinnamon bark, and smoked clove bud',
    price: 3024,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    category: 'Wooden Wick',
    burnTime: '60 Hours',
    weight: '310g / 10.9 oz',
    waxType: 'Hand-poured Soy & Coconut Wax',
    wickType: 'Premium Double Wooden Wick',
    fragranceNotes: {
      top: ['Cinnamon Bark', 'Blood Orange Zest'],
      heart: ['Clove Bud', 'Nutmeg Spice', 'Dark Rum'],
      base: ['Smoked Oak', 'Tonka Bean', 'Brown Sugar']
    },
    scentIntensity: 5,
    mood: 'Relaxation',
    space: 'Living Room',
    description: 'Step into a cozy fireside evening. Velvet Smoked Cinnamon & Clove radiates comforting warmth with cozy spice notes and a crackling wood ember aura.',
    isBestseller: true,
    inStock: true
  },
  {
    id: 'akaza-06',
    name: 'The Empress Trio Gift Vault',
    tagline: 'Exclusive curated gift box featuring Royal Oud, Golden Diya & Midnight Jasmine',
    price: 7476,
    originalPrice: 8736,
    rating: 5.0,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    category: 'Luxury Gift Sets',
    burnTime: '160+ Total Hours (3 x 180g)',
    weight: '3 x 180g / 19 oz total',
    waxType: 'Custom Hand-poured Artisan Soy Wax Trio',
    wickType: 'Eco Wooden & Cotton Wicks',
    fragranceNotes: {
      top: ['Curated Top Notes across Oud, Saffron & Jasmine'],
      heart: ['Heart of Rose, Sandalwood & Cashmere'],
      base: ['Rich Amber, Madagascar Vanilla & Patchouli']
    },
    scentIntensity: 5,
    mood: 'Romance',
    space: 'Bath & Spa',
    description: 'The ultimate luxury gifting experience. Packaged in a matte black velvet box foil-stamped in gold with custom matches and a personalized greeting parchment.',
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'akaza-07',
    name: 'French Lavender & Vanilla Calm',
    tagline: 'Provencal lavender blossoms blended with rich creamy bourbon vanilla',
    price: 2520,
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    category: 'Aromatherapy',
    burnTime: '55 Hours',
    weight: '290g / 10.2 oz',
    waxType: '100% Pure Soy Wax',
    wickType: 'Single Cotton Wick',
    fragranceNotes: {
      top: ['French Lavender', 'Bergamot Leaf'],
      heart: ['Clary Sage', 'Chamomile Petals'],
      base: ['Bourbon Vanilla', 'Smooth Cedar']
    },
    scentIntensity: 3,
    mood: 'Relaxation',
    space: 'Bath & Spa',
    description: 'Designed specifically for evening wind-down routines. Melts stress away with therapeutic Provencal lavender and warm vanilla accents.',
    inStock: true
  },
  {
    id: 'akaza-08',
    name: 'Spiced Fig & Tobacco Leaf',
    tagline: 'Sun-ripened Mediterranean fig, warm tonka bean, and sweet pipe tobacco',
    price: 2940,
    rating: 4.9,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    category: 'Wooden Wick',
    burnTime: '60 Hours',
    weight: '310g / 10.9 oz',
    waxType: '100% Soy Wax',
    wickType: 'Crackling Wood Wick',
    fragranceNotes: {
      top: ['Wild Fig', 'Anise Seed'],
      heart: ['Tobacco Leaf', 'Plum Nectar'],
      base: ['Tonka Bean', 'Leather Accord', 'Dark Amber']
    },
    scentIntensity: 4,
    mood: 'Focus',
    space: 'Work Sanctuary',
    description: 'Sophisticated and mysterious. Combining lush green fig nectar with warm tobacco leaf and leather notes for an inspiring study environment.',
    inStock: true
  }
];

export const CRAFTSMANSHIP_STEPS = [
  {
    step: '01',
    title: '100% Organic Soy & Beeswax',
    description: 'We source non-GMO, clean-burning soy and golden beeswax harvested ethically. Zero paraffin, lead, or synthetic toxins.',
    icon: 'Leaf'
  },
  {
    step: '02',
    title: 'Pure Essential Oils & Fine Perfumery',
    description: 'Hand-blended fragrance oils infused with natural botanicals for a subtle, headache-free, room-filling scent throw.',
    icon: 'Sparkles'
  },
  {
    step: '03',
    title: 'FSC-Certified Wooden Wicks',
    description: 'Sustainably harvested wood wicks that crackle like a miniature campfire, giving a soothing auditory experience.',
    icon: 'Flame'
  },
  {
    step: '04',
    title: '14-Day Cure & Hand Inspection',
    description: 'Every single jar is hand-poured in small batch quantities and cured for two weeks to achieve maximum burn perfection.',
    icon: 'ShieldCheck'
  }
];
