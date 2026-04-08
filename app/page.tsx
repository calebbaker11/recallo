import Link from 'next/link'

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 text-accent mt-0.5">
      <path d="M3 7.5l3.25 3.25L12 4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const plans = [
  {
    id: 'founding',
    name: 'Founding Member',
    price: '$297',
    desc: 'Rate locked forever',
    badge: 'First 10 only',
    features: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Priority support'],
    primary: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$397',
    desc: 'For dental practices',
    features: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Email support'],
  },
  {
    id: 'ortho',
    name: 'Orthodontist',
    price: '$497',
    desc: 'Multi-location ready',
    features: ['Unlimited follow-ups', 'Custom SMS', 'Recovery analytics', 'Dedicated number', 'Priority support', 'Multi-location'],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">

      {/* ── Nav ───────────────────────────────────────────── */}
      <nav className="glass-nav fixed top-0 w-full z-50 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 h-[56px] flex items-center justify-between">
          <span className="text-[17px] font-semibold tracking-tight text-text">
            Recallo
          </span>
          <div className="flex items-center gap-2">
            <Link href="/login" className="nav-link text-[13px]">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary !text-[13px] !py-[7px] !px-[16px] !rounded-[9px]">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-[160px] pb-[120px] px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="animate-in overline text-accent !text-[12px] mb-5 tracking-[0.14em]">
            Automated patient recovery
          </p>
          <h1 className="animate-in animate-in-delay-1 text-[clamp(42px,7vw,72px)] font-bold leading-[1.02] tracking-[-0.045em] text-text mb-7">
            Never lose a patient to voicemail again.
          </h1>
          <p className="animate-in animate-in-delay-2 text-[18px] leading-[1.7] text-text-secondary max-w-[500px] mx-auto mb-12">
            Recallo texts patients back the instant your office misses their
            call — recovering appointments before they reach a competitor.
          </p>
          <div className="animate-in animate-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary !text-[16px] !py-[14px] !px-[36px] !rounded-[12px]">
              Start recovering patients
            </Link>
            <span className="text-[13px] text-text-muted">
              5-minute setup · No contracts
            </span>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="py-[120px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-[72px]">
            <p className="overline text-accent !text-[12px] mb-4 tracking-[0.14em]">How it works</p>
            <h2 className="text-[clamp(30px,4.5vw,44px)] font-bold tracking-[-0.035em] text-text">
              Three steps. Fully automatic.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[1px] bg-border rounded-2xl overflow-hidden">
            {[
              { n: '01', t: 'Patient calls your office', d: 'Patients dial your Recallo number. Every call is forwarded to your real office line instantly.' },
              { n: '02', t: 'Call goes unanswered', d: 'If nobody picks up within 20 seconds, Recallo detects the missed call in real time.' },
              { n: '03', t: 'Patient gets a follow-up text', d: 'A personalized SMS with your booking link reaches the patient within seconds.' },
            ].map((s) => (
              <div key={s.n} className="bg-surface p-10 md:p-12">
                <span className="overline text-accent block mb-5">{s.n}</span>
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-text mb-3 leading-snug">
                  {s.t}
                </h3>
                <p className="text-[15px] text-text-secondary leading-[1.7]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ───────────────────────────────────────────── */}
      <section className="px-6 pb-[120px]">
        <div className="card max-w-[1100px] mx-auto p-[clamp(40px,6vw,80px)]">
          <div className="max-w-[520px] mb-16">
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.035em] text-text mb-5 leading-[1.1]">
              One recovered patient pays for a year of Recallo.
            </h2>
            <p className="text-[16px] text-text-secondary leading-[1.7]">
              The average dental practice misses 30% of calls. Each missed call is a
              patient who may never call back.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
            {[
              { n: '30%', d: 'of calls go unanswered at the average dental practice' },
              { n: '$2,000+', d: 'lifetime value of a single new patient recovered' },
              { n: '< 5 sec', d: 'to send the follow-up text after a missed call' },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-[48px] font-extrabold tracking-[-0.04em] text-accent leading-none mb-3">
                  {s.n}
                </p>
                <p className="text-[14px] text-text-secondary leading-[1.6]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      <section id="pricing" className="px-6 pb-[140px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <p className="overline text-accent !text-[12px] mb-4 tracking-[0.14em]">Pricing</p>
            <h2 className="text-[clamp(30px,4.5vw,44px)] font-bold tracking-[-0.035em] text-text mb-3">
              Simple pricing. No surprises.
            </h2>
            <p className="text-[16px] text-text-secondary">
              No setup fees. No contracts. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card flex flex-col p-9 relative ${
                  plan.primary ? '!border-accent/40 ring-1 ring-accent/20' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-8 bg-accent text-white text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-b-md">
                    {plan.badge}
                  </div>
                )}

                <div className={plan.badge ? 'mt-4' : ''}>
                  <p className={`text-[13px] font-semibold mb-3 ${plan.primary ? 'text-accent' : 'text-text-secondary'}`}>
                    {plan.name}
                  </p>
                  <p className="mb-1">
                    <span className="text-[48px] font-extrabold tracking-[-0.04em] text-text">{plan.price}</span>
                    <span className="text-[15px] text-text-muted ml-1">/mo</span>
                  </p>
                  <p className="text-[13px] text-text-muted mb-8">{plan.desc}</p>
                </div>

                <ul className="flex flex-col gap-3 mb-9 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-text-secondary">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={plan.primary ? 'btn-primary w-full' : 'btn-ghost w-full justify-center'}
                >
                  {plan.primary ? 'Claim founding rate' : 'Get started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[15px] font-semibold tracking-tight text-text">Recallo</span>
          <p className="text-[12px] text-text-muted">
            &copy; {new Date().getFullYear()} Recallo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/login" className="text-[13px] text-text-muted hover:text-text-secondary transition-colors">Log in</Link>
            <Link href="/signup" className="text-[13px] text-text-muted hover:text-text-secondary transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
