import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const calledNumber = formData.get('Called') as string

  const twiml = new VoiceResponse()

  if (!calledNumber) {
    twiml.say('Sorry, there was an error processing your call.')
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  const supabase = createAdminClient()
  const { data: practice } = await supabase
    .from('practices')
    .select('forwarding_number, name')
    .eq('twilio_phone_number', calledNumber)
    .single()

  if (!practice) {
    twiml.say('Sorry, this number is not configured.')
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  const dial = twiml.dial({
    action: `/api/twilio/missed-call?calledNumber=${encodeURIComponent(calledNumber)}`,
    timeout: 20,
  })
  dial.number(practice.forwarding_number)

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
