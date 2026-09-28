import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, paymentMethod, giftWrapping, promoCode } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }

    // Calculate totals
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 60 ? 0 : 7.99;
    const giftFee = giftWrapping ? 5.00 : 0;
    const discount = promoCode?.toUpperCase() === 'AKAZA10' ? subtotal * 0.10 : 0;
    const total = subtotal + shipping + giftFee - discount;

    const orderId = `AKZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    return NextResponse.json({
      success: true,
      orderId,
      estimatedDelivery,
      summary: {
        subtotal: subtotal.toFixed(2),
        shipping: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
        giftFee: giftFee.toFixed(2),
        discount: discount.toFixed(2),
        total: total.toFixed(2),
        itemCount: items.length
      },
      customer: {
        name: customer?.name || 'Valued Customer',
        email: customer?.email || 'customer@example.com'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Server error processing order' }, { status: 500 });
  }
}
