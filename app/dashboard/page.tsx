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
  startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)

  const { data: monthCalls } = await supabase
    .from('missed_calls').select('*').eq('practice_id', practice.id)
    .gte('called_at', startOfMonth.toISOString()).order('called_at', { ascending: false })

  const calls: MissedCall[] = monthCalls || []
  const totalMissed = calls.length
  const totalReached = calls.filter(c => c.sms_sent).length
  const rate = totalMissed > 0 ? Math.round((totalReached / totalMissed) * 100) : 0

  const { data: recentCalls } = await supabase
    .from('missed_calls').select('*').eq('practice_id', practice.id)
    .order('called_at', { ascending: false }).limit(20)

  const month = new Date().toLocaleString('default', { month: 'long' })

  function fmt(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const today = now.toDateString() === d.toDateString()
    const yesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === d.toDateString()
    const time = d.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
    if (today) return `Today, ${time}`
    if (yesterday) return `Yesterday, ${time}`
    return d.toLocaleString('default', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="anim-up space-y-5">

      {/* ── Page title ───────────────────────────────────── */}
      <div className="mb-10">
        <p className="overline text-accent mb-2">{practice.name}</p>
        <h1 className="text-[clamp(26px,4vw,34px)] font-black tracking-[-0.035em] text-hi">
          Overview
        </h1>
        <p className="text-[14px] text-low mt-1">{month} · Live data</p>
      </div>

      {/* ── Hero stat ────────────────────────────────────── */}
      <div className="card relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-accent/70" />
        <div className="p-10 sm:p-14">
          <p className="overline text-mid mb-5">Patients reached this month</p>
          <div className="flex flex-wrap items-end gap-6">
            <span className="text-[clamp(80px,12vw,120px)] font-black tracking-[-0.055em] text-accent leading-none tabular-nums">
              {totalReached}
            </span>
            <div className="pb-3">
              <p className="text-[16px] text-mid mb-1 leading-tight">
                follow-up texts delivered in {month}
              </p>
              <p className="text-[13px] text-low">
                {rate}% recovery rate &nbsp;·&nbsp; {totalMissed} missed calls total
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Secondary stats ──────────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Missed calls',      value: totalMissed,     sub: `in ${month}` },
          { label: 'Follow-ups sent',   value: totalReached,    sub: 'texts delivered' },
          { label: 'Recovery rate',     value: `${rate}%`,      sub: 'sent ÷ missed' },
        ].map(s => (
          <div key={s.label} className="card-sm px-7 py-7">
            <p className="overline mb-4">{s.label}</p>
            <p className="text-[40px] font-black tracking-[-0.045em] text-hi leading-none mb-2 tabular-nums">
              {s.value}
            </p>
            <p className="text-[12px] text-low">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Activity table ───────────────────────────────── */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-[15px] font-bold tracking-[-0.01em] text-hi">Recent calls</h2>
            <p className="text-[12px] text-low mt-0.5">Last 20 activity entries</p>
          </div>
          {recentCalls && recentCalls.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green/80" />
              <span className="text-[12px] text-low">Live</span>
            </div>
          )}
        </div>

        {/* Column labels */}
        {recentCalls && recentCalls.length > 0 && (
          <div className="grid grid-cols-[1fr_180px_100px] px-7 py-3 border-b border-white/[0.04] bg-surface-2/40">
            {['Patient number', 'Time', 'Status'].map(h => (
              <span key={h} className="overline !text-[10px]">{h}</span>
            ))}
          </div>
        )}

        {/* Rows */}
        {recentCalls && recentCalls.length > 0 ? (
          <div>
            {(recentCalls as MissedCall[]).map((call, i) => (
              <div
                key={call.id}
                className={`tr-hover grid grid-cols-[1fr_180px_100px] items-center px-7 py-4 ${
                  i < recentCalls.length - 1 ? 'border-b border-white/[0.04]' : ''
                }`}
              >
                <span className="text-[14px] font-semibold text-hi tabular-nums tracking-wide">
                  {call.caller_number}
                </span>
                <span className="text-[13px] text-mid">{fmt(call.called_at)}</span>
                {call.sms_sent
                  ? <span className="tag-success">Reached</span>
                  : <span className="tag-error">Not sent</span>
                }
              </div>
            ))}
          </div>
        ) : (
          <div className="px-7 py-24 text-center">
            <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-white/[0.07] flex items-center justify-center mx-auto mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-low"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-mid mb-1">No calls yet</p>
            <p className="text-[13px] text-low">
              Once patients call your Recallo number, activity will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
