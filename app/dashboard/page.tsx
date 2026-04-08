import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MissedCall } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: practice } = await supabase.from('practices').select('*').eq('owner_id', user.id).single()
  if (!practice) redirect('/onboarding')

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: missedCallsThisMonth } = await supabase
    .from('missed_calls').select('*').eq('practice_id', practice.id)
    .gte('called_at', startOfMonth.toISOString()).order('called_at', { ascending: false })

  const calls: MissedCall[] = missedCallsThisMonth || []
  const totalMissed = calls.length
  const totalSmsSent = calls.filter(c => c.sms_sent).length
  const recoveryRate = totalMissed > 0 ? Math.round((totalSmsSent / totalMissed) * 100) : 0

  const { data: recentCalls } = await supabase
    .from('missed_calls').select('*').eq('practice_id', practice.id)
    .order('called_at', { ascending: false }).limit(20)

  const month = new Date().toLocaleString('default', { month: 'long' })

  return (
    <div className="animate-in">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="mb-12">
        <p className="overline text-accent mb-2">{practice.name}</p>
        <h1 className="text-[clamp(28px,4vw,36px)] font-bold tracking-[-0.035em] text-text">
          Overview
        </h1>
      </div>

      {/* ── Hero stat ──────────────────────────────────── */}
      <div className="card relative overflow-hidden p-10 sm:p-14 mb-4">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-accent opacity-60" />
        <p className="overline mb-4">Patients reached this month</p>
        <div className="flex items-end gap-5 flex-wrap">
          <span className="text-[clamp(72px,12vw,112px)] font-extrabold tracking-[-0.05em] text-accent leading-none tabular-nums">
            {totalSmsSent}
          </span>
          <div className="pb-3 sm:pb-4">
            <p className="text-[15px] text-text-secondary mb-0.5">
              follow-up texts sent in {month}
            </p>
            <p className="text-[13px] text-text-muted">
              {recoveryRate}% recovery rate · {totalMissed} missed calls total
            </p>
          </div>
        </div>
      </div>

      {/* ── Secondary stats ────────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-3 mb-12">
        {[
          { label: 'Missed calls', value: totalMissed, sub: `in ${month}` },
          { label: 'Follow-ups sent', value: totalSmsSent, sub: 'texts delivered' },
          { label: 'Recovery rate', value: `${recoveryRate}%`, sub: 'follow-ups ÷ missed' },
        ].map(s => (
          <div key={s.label} className="card px-7 py-6">
            <p className="overline mb-3">{s.label}</p>
            <p className="text-[36px] font-extrabold tracking-[-0.04em] text-text leading-none mb-1 tabular-nums">
              {s.value}
            </p>
            <p className="text-[12px] text-text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Activity feed ──────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="px-7 py-5 border-b border-border flex items-center justify-between">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-text">
            Recent calls
          </h2>
          <span className="text-[12px] text-text-muted">Last 20</span>
        </div>

        {/* Column header */}
        {recentCalls && recentCalls.length > 0 && (
          <div className="grid grid-cols-[1fr_1fr_auto] px-7 py-2.5 border-b border-border bg-surface-raised/40">
            {['Phone number', 'Time', 'Status'].map(h => (
              <span key={h} className="overline !text-[10px]">{h}</span>
            ))}
          </div>
        )}

        {recentCalls && recentCalls.length > 0 ? (
          <div>
            {recentCalls.map((call: MissedCall, i: number) => (
              <div
                key={call.id}
                className={`surface-row grid grid-cols-[1fr_1fr_auto] items-center px-7 py-4 ${
                  i < recentCalls.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span className="text-[14px] font-medium text-text tabular-nums">
                  {call.caller_number}
                </span>
                <span className="text-[13px] text-text-secondary">
                  {new Date(call.called_at).toLocaleString('default', {
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                  })}
                </span>
                {call.sms_sent ? (
                  <span className="text-[11px] font-semibold tracking-[0.04em] uppercase text-accent bg-accent-muted border border-accent/20 rounded-md px-2 py-0.5">
                    Reached
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold tracking-[0.04em] uppercase text-error bg-error-muted border border-error/20 rounded-md px-2 py-0.5">
                    Not sent
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-7 py-20 text-center">
            <p className="text-[15px] font-medium text-text-secondary mb-1">No calls yet</p>
            <p className="text-[13px] text-text-muted">
              Once patients call your Recallo number, activity appears here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
