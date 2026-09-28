import { NextResponse } from 'next/server';
import { CANDLE_PRODUCTS } from '@/data/candles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const mood = searchParams.get('mood');
  const space = searchParams.get('space');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');

  let filtered = [...CANDLE_PRODUCTS];

  if (category && category !== 'All') {
    filtered = filtered.filter(item => item.category === category);
  }

  if (mood) {
    filtered = filtered.filter(item => item.mood === mood);
  }

  if (space) {
    filtered = filtered.filter(item => item.space === space);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.fragranceNotes.top.some(n => n.toLowerCase().includes(q)) ||
      item.fragranceNotes.heart.some(n => n.toLowerCase().includes(q)) ||
      item.fragranceNotes.base.some(n => n.toLowerCase().includes(q))
    );
  }

  if (sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered
  });
}
