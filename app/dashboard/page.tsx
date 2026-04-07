import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MissedCall } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: practice } = await supabase
    .from('practices')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!practice) redirect('/onboarding')

  // Get this month's missed calls
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: missedCallsThisMonth } = await supabase
    .from('missed_calls')
    .select('*')
    .eq('practice_id', practice.id)
    .gte('called_at', startOfMonth.toISOString())
    .order('called_at', { ascending: false })

  const calls: MissedCall[] = missedCallsThisMonth || []
  const totalMissed = calls.length
  const totalSmsSent = calls.filter((c) => c.sms_sent).length
  const recoveryRate =
    totalMissed > 0 ? Math.round((totalSmsSent / totalMissed) * 100) : 0

  // Get recent missed calls (last 20)
  const { data: recentCalls } = await supabase
    .from('missed_calls')
    .select('*')
    .eq('practice_id', practice.id)
    .order('called_at', { ascending: false })
    .limit(20)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{practice.name}</h1>
        <p className="text-gray-500 mt-1">Dashboard overview — this month</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Missed calls</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalMissed}</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">SMS sent</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalSmsSent}</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-500">Recovery rate</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{recoveryRate}%</p>
          <p className="text-sm text-gray-500 mt-1">SMS sent / missed calls</p>
        </div>
      </div>

      {/* Recent missed calls feed */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent missed calls</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentCalls && recentCalls.length > 0 ? (
            recentCalls.map((call: MissedCall) => (
              <div
                key={call.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{call.caller_number}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(call.called_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    call.sms_sent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {call.sms_sent ? 'SMS sent' : 'SMS failed'}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              <p className="text-lg font-medium">No missed calls yet</p>
              <p className="text-sm mt-1">
                Once patients call your Twilio number, missed calls will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
