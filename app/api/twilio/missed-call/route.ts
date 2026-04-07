import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getTwilioClient } from '@/lib/twilio'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const dialCallStatus = formData.get('DialCallStatus') as string
  const caller = formData.get('Caller') as string
  const calledNumber =
    request.nextUrl.searchParams.get('calledNumber') ||
    (formData.get('Called') as string)

  // Only act on unanswered calls
  const missedStatuses = ['no-answer', 'busy', 'failed', 'canceled']
  if (!missedStatuses.includes(dialCallStatus)) {
    return new NextResponse('OK', { status: 200 })
  }

  if (!calledNumber || !caller) {
    return new NextResponse('Missing parameters', { status: 400 })
  }

  const supabase = createAdminClient()

  // Look up which practice owns this Twilio number
  const { data: practice, error: practiceError } = await supabase
    .from('practices')
    .select('id, name, sms_message, booking_link, twilio_phone_number')
    .eq('twilio_phone_number', calledNumber)
    .single()

  if (practiceError || !practice) {
    console.error('Practice not found for number:', calledNumber)
    return new NextResponse('Practice not found', { status: 404 })
  }

  // Build SMS message
  const defaultMessage = `Hi! You just called ${practice.name}. We're sorry we missed you — click here to book your appointment: ${practice.booking_link}`
  const customMessage = practice.sms_message
    ? `${practice.sms_message}${practice.booking_link}`
    : defaultMessage

  let smsSent = false
  let smsSentAt: string | null = null

  // Send SMS to caller
  try {
    await getTwilioClient().messages.create({
      body: customMessage,
      from: calledNumber,
      to: caller,
    })
    smsSent = true
    smsSentAt = new Date().toISOString()
  } catch (err) {
    console.error('Failed to send SMS:', err)
  }

  // Log the missed call
  await supabase.from('missed_calls').insert({
    practice_id: practice.id,
    caller_number: caller,
    called_at: new Date().toISOString(),
    sms_sent: smsSent,
    sms_sent_at: smsSentAt,
  })

  return new NextResponse('OK', { status: 200 })
}
