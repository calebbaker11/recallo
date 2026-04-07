import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, type PlanType } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await request.json() as { plan: PlanType }

  if (!PLANS[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  // Check founding member cap
  if (plan === 'founding') {
    const adminSupabase = createAdminClient()
    const { count } = await adminSupabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('plan', 'founding')
      .eq('status', 'active')

    if ((count ?? 0) >= PLANS.founding.maxCustomers) {
      return NextResponse.json(
        { error: 'Founding member spots are full' },
        { status: 400 }
      )
    }
  }

  // Get practice for this user
  const { data: practice } = await supabase
    .from('practices')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!practice) {
    return NextResponse.json({ error: 'Practice not found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PLANS[plan].priceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/dashboard/billing?checkout=cancelled`,
    metadata: {
      practice_id: practice.id,
      plan,
      user_id: user.id,
    },
    customer_email: user.email,
  })

  return NextResponse.json({ url: session.url })
}
