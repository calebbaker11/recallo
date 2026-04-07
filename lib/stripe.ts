import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-03-31.basil',
    })
  }
  return _stripe
}

// Named export for convenience — lazily initialized
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export const PLANS = {
  founding: {
    name: 'Founding Member',
    price: 29700, // in cents
    priceId: process.env.STRIPE_FOUNDING_PRICE_ID || '',
    maxCustomers: 10,
  },
  standard: {
    name: 'Standard',
    price: 39700,
    priceId: process.env.STRIPE_STANDARD_PRICE_ID || '',
  },
  ortho: {
    name: 'Orthodontist',
    price: 49700,
    priceId: process.env.STRIPE_ORTHO_PRICE_ID || '',
  },
} as const

export type PlanType = keyof typeof PLANS
