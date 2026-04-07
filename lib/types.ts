export type Practice = {
  id: string
  name: string
  owner_id: string
  twilio_phone_number: string | null
  forwarding_number: string
  sms_message: string | null
  booking_link: string
  created_at: string
}

export type MissedCall = {
  id: string
  practice_id: string
  caller_number: string
  called_at: string
  sms_sent: boolean
  sms_sent_at: string | null
  created_at: string
}

export type Subscription = {
  id: string
  practice_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plan: 'founding' | 'standard' | 'ortho'
  status: string
  created_at: string
}
