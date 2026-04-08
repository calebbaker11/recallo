import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BillingClient from './BillingClient'
import { PLANS } from '@/lib/stripe'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: practice } = await supabase
    .from('practices').select('id').eq('owner_id', user.id).single()
  if (!practice) redirect('/onboarding')

  const { data: subscription } = await supabase
    .from('subscriptions').select('*').eq('practice_id', practice.id).single()

  const planName = subscription?.plan
    ? PLANS[subscription.plan as keyof typeof PLANS]?.name ?? null
    : null

  return (
    <div className="max-w-[580px] anim-up">

      {/* ── Page title ───────────────────────────────────── */}
      <div className="mb-10">
        <h1 className="text-[clamp(26px,4vw,34px)] font-black tracking-[-0.035em] text-hi">
          Billing
        </h1>
        <p className="text-[14px] text-low mt-1">Manage your subscription and payment details</p>
      </div>

      <BillingClient subscription={subscription} planName={planName} practiceId={practice.id} />
    </div>
  )
}
