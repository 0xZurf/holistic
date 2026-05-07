import Stripe from 'stripe';

let _stripe;

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

export async function syncStripeProduct(item, type) {
  const stripe = getStripe();

  const productData = {
    name: item.title,
    description: item.description || undefined,
    metadata: { type, internal_id: item.id },
  };

  if (item.image_url) {
    productData.images = [item.image_url];
  }

  let stripeProduct;
  if (item.stripe_price_id) {
    const existingPrice = await stripe.prices.retrieve(item.stripe_price_id);
    stripeProduct = await stripe.products.update(existingPrice.product, productData);

    if (existingPrice.unit_amount !== item.price) {
      await stripe.prices.update(item.stripe_price_id, { active: false });
      const newPrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: item.price,
        currency: 'usd',
      });
      return newPrice.id;
    }
    return item.stripe_price_id;
  }

  stripeProduct = await stripe.products.create(productData);
  const price = await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: item.price,
    currency: 'usd',
  });
  return price.id;
}
