import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BillingClient from './BillingClient'
import { PLANS } from '@/lib/stripe'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: practice } = await supabase.from('practices').select('id').eq('owner_id', user.id).single()
  if (!practice) redirect('/onboarding')

  const { data: subscription } = await supabase.from('subscriptions').select('*').eq('practice_id', practice.id).single()
  const planName = subscription?.plan ? PLANS[subscription.plan as keyof typeof PLANS]?.name : null

  return (
    <div className="max-w-[580px] animate-in">
      <div className="mb-10">
        <h1 className="text-[clamp(24px,4vw,32px)] font-bold tracking-[-0.035em] text-text mb-1">
          Billing
        </h1>
        <p className="text-[14px] text-text-muted">
          Manage your subscription
        </p>
      </div>

      <BillingClient subscription={subscription} planName={planName} practiceId={practice.id} />
    </div>
  )
}
