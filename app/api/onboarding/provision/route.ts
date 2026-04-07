import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getTwilioClient } from '@/lib/twilio'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, forwarding_number, booking_link } = await request.json()

  if (!name || !forwarding_number || !booking_link) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check if practice already exists
  const { data: existing } = await supabase
    .from('practices')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Practice already exists' }, { status: 400 })
  }

  // Provision a Twilio phone number
  let twilioPhoneNumber: string | null = null
  try {
    const twilioClient = getTwilioClient()
    const availableNumbers = await twilioClient.availablePhoneNumbers('US').local.list({
      limit: 1,
    })

    if (availableNumbers.length > 0) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

      const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
        phoneNumber: availableNumbers[0].phoneNumber,
        voiceUrl: `${appUrl}/api/twilio/voice`,
        voiceMethod: 'POST',
      })
      twilioPhoneNumber = purchasedNumber.phoneNumber
    }
  } catch (err) {
    console.error('Failed to provision Twilio number:', err)
    // Continue without Twilio number — they can set it up later
  }

  // Create practice record
  const { data: practice, error } = await supabase
    .from('practices')
    .insert({
      name,
      owner_id: user.id,
      twilio_phone_number: twilioPhoneNumber,
      forwarding_number,
      booking_link,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ practice })
}
