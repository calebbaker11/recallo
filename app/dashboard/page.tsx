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

  const { data: recentCalls } = await supabase
    .from('missed_calls')
    .select('*')
    .eq('practice_id', practice.id)
    .order('called_at', { ascending: false })
    .limit(20)

  const monthName = new Date().toLocaleString('default', { month: 'long' })

  return (
    <div>
      {/* ── Page header ──────────────────────────────────── */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
          {practice.name}
        </p>
        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 34px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: '1.1',
          }}
        >
          Overview
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
          {monthName} · Updated live
        </p>
      </div>

      {/* ── Hero stat ────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '48px 48px 44px',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--accent)',
            opacity: 0.7,
          }}
        />
        <p
          style={{
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}
        >
          Patients reached this month
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
          <p
            style={{
              fontSize: 'clamp(64px, 10vw, 96px)',
              fontWeight: '800',
              letterSpacing: '-0.05em',
              color: 'var(--accent)',
              lineHeight: '1',
              margin: 0,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {totalSmsSent}
          </p>
          <div style={{ paddingBottom: '8px' }}>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: '0 0 4px' }}>
              follow-up texts sent in {monthName}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              {recoveryRate}% recovery rate · {totalMissed} missed calls total
            </p>
          </div>
        </div>
      </div>

      {/* ── Secondary stats ──────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}
      >
        {[
          {
            label: 'Missed calls',
            value: totalMissed,
            sub: `in ${monthName}`,
            color: 'var(--text-primary)',
          },
          {
            label: 'Follow-ups sent',
            value: totalSmsSent,
            sub: 'texts delivered',
            color: 'var(--text-primary)',
          },
          {
            label: 'Recovery rate',
            value: `${recoveryRate}%`,
            sub: 'texts ÷ missed calls',
            color: 'var(--text-primary)',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px 28px 24px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: '36px',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                color: stat.color,
                lineHeight: '1',
                marginBottom: '6px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Recent activity ──────────────────────────────── */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        {/* Table header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontSize: '15px',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Recent calls
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Last 20 entries
          </span>
        </div>

        {/* Column labels */}
        {recentCalls && recentCalls.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              padding: '10px 28px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'rgba(255,255,255,0.01)',
            }}
          >
            {['Patient number', 'Time', 'Status'].map((col) => (
              <span
                key={col}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {col}
              </span>
            ))}
          </div>
        )}

        {/* Rows */}
        {recentCalls && recentCalls.length > 0 ? (
          <div>
            {recentCalls.map((call: MissedCall, i: number) => (
              <div
                key={call.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr auto',
                  padding: '16px 28px',
                  alignItems: 'center',
                  borderBottom: i < recentCalls.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.01em',
                  }}
                >
                  {call.caller_number}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {new Date(call.called_at).toLocaleString('default', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.04em',
                    color: call.sms_sent ? 'var(--accent)' : '#EF4444',
                    background: call.sms_sent ? 'rgba(96,165,250,0.08)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${call.sms_sent ? 'rgba(96,165,250,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    borderRadius: '5px',
                    padding: '3px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {call.sms_sent ? 'Reached' : 'Not sent'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '80px 28px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
              }}
            >
              No missed calls yet
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Once patients call your Recallo number, activity will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
