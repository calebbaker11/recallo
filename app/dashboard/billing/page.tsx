import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BillingClient from './BillingClient'
import { PLANS } from '@/lib/stripe'

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: practice } = await supabase
    .from('practices')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!practice) redirect('/onboarding')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('practice_id', practice.id)
    .single()

  const planName = subscription?.plan
    ? PLANS[subscription.plan as keyof typeof PLANS]?.name
    : null

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Manage your Recallo subscription</p>
      </div>

      <BillingClient
        subscription={subscription}
        planName={planName}
        practiceId={practice.id}
      />
    </div>
  )
}
