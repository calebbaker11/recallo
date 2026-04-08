import Link from 'next/link'

/* ── Icons ───────────────────────────────────────────────────── */
function IconCheck({ cls = '' }: { cls?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 ${cls}`}>
      <path d="M2.5 7.5l3 2.75L11.5 4" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      className="text-accent" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z" />
    </svg>
  )
}
function IconMessage() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      className="text-accent" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      className="text-accent" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      className="ml-1.5 transition-transform group-hover:translate-x-0.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7h9M8 4l3.5 3L8 10" />
    </svg>
  )
}

/* ── Dashboard preview ───────────────────────────────────────── */
function DashboardPreview() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0C1018] shadow-2xl shadow-black/60">
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0E16] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-[11px] text-[#4A5568] font-medium">recallo.io/dashboard</div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="flex items-center gap-6 px-5 py-3 border-b border-white/[0.05] bg-[#07090E]/60">
        <span className="text-[13px] font-semibold text-[#EDF0F7] tracking-tight">Recallo</span>
        <div className="flex gap-1">
          {['Overview', 'Settings', 'Billing'].map((l, i) => (
            <span key={l} className={`text-[12px] px-2.5 py-1 rounded-md ${i === 0 ? 'text-[#EDF0F7] bg-[#111722]' : 'text-[#4A5568]'}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Hero stat */}
        <div className="rounded-xl bg-[#111722] border border-white/[0.05] p-5">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#4A5568] mb-2">Patients reached this month</div>
          <div className="text-[52px] font-black tracking-[-0.05em] text-[#4F9EFF] leading-none mb-1">47</div>
          <div className="text-[11px] text-[#8592A8]">84% recovery rate · 56 missed calls</div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Missed calls', val: '56' },
            { label: 'Follow-ups sent', val: '47' },
            { label: 'Recovery rate', val: '84%' },
          ].map(s => (
            <div key={s.label} className="rounded-lg bg-[#0D1218] border border-white/[0.04] p-3">
              <div className="text-[9px] uppercase tracking-wider text-[#4A5568] mb-1">{s.label}</div>
              <div className="text-[22px] font-extrabold tracking-[-0.04em] text-[#EDF0F7]">{s.val}</div>
            </div>
          ))}
        </div>

        {/* Table rows */}
        <div className="rounded-xl border border-white/[0.05] overflow-hidden">
          <div className="grid grid-cols-3 px-3.5 py-2 bg-[#0A0E16] border-b border-white/[0.04]">
            {['Phone number', 'Time', 'Status'].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-wider uppercase text-[#4A5568]">{h}</span>
            ))}
          </div>
          {[
            ['(555) 291-4830', '2:14 PM today', true],
            ['(555) 847-2193', '11:52 AM today', true],
            ['(555) 103-9284', 'Yesterday 4:38 PM', false],
          ].map(([num, time, sent], i) => (
            <div key={i} className="grid grid-cols-3 items-center px-3.5 py-2.5 border-b border-white/[0.03] last:border-0">
              <span className="text-[11px] text-[#EDF0F7] font-medium tabular-nums">{num as string}</span>
              <span className="text-[11px] text-[#8592A8]">{time as string}</span>
              <span className={`text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded w-fit ${
                sent ? 'text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/20' : 'text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/20'
              }`}>{sent ? 'Reached' : 'Not sent'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="bg-base min-h-screen">

      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="glass fixed top-0 inset-x-0 z-50 border-b border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-hi">Recallo</span>
          <div className="flex items-center gap-2">
            <Link href="/login" className="nav-link">Log in</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Get started →</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-[140px] pb-[80px] px-6 overflow-hidden">
        <div className="hero-glow" />
        <div className="max-w-[1120px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="anim-up inline-flex items-center gap-2 border border-accent/20 bg-accent/[0.07] rounded-full px-3.5 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[12px] font-semibold text-accent tracking-wide">
                  Automated patient recovery
                </span>
              </div>

              <h1 className="anim-up d1 text-[clamp(40px,5.5vw,64px)] font-black tracking-[-0.045em] text-hi leading-[1.02] mb-6">
                Never lose a patient to voicemail again.
              </h1>

              <p className="anim-up d2 text-[18px] text-mid leading-[1.75] mb-10 max-w-[460px]">
                Recallo texts patients back the second your office misses
                their call — recovering appointments before they reach a competitor.
              </p>

              <div className="anim-up d3 flex flex-wrap items-center gap-4 mb-12">
                <Link href="/signup" className="btn btn-primary group">
                  Start recovering patients
                  <IconArrowRight />
                </Link>
                <Link href="#pricing" className="btn btn-ghost">
                  See pricing
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="anim-up d4 flex items-center gap-4 pt-8 border-t border-white/[0.06]">
                <div className="flex -space-x-2">
                  {['#3B82F6','#8B5CF6','#EC4899','#F59E0B'].map((c, i) => (
                    <div key={i}
                      className="w-8 h-8 rounded-full border-2 border-base flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: c }}>
                      {String.fromCharCode(65 + i * 3)}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-mid">
                  <span className="text-hi font-semibold">Dental practices</span> across the US trust Recallo
                </p>
              </div>
            </div>

            {/* Right: product preview */}
            <div className="anim-up d2 hidden lg:block">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-surface/50">
        <div className="max-w-[1120px] mx-auto px-6 py-8 grid sm:grid-cols-3 divide-x divide-white/[0.06]">
          {[
            { n: '30%', d: 'of dental calls go unanswered' },
            { n: '$2,000+', d: 'lifetime value per recovered patient' },
            { n: '< 5 sec', d: 'average text delivery time' },
          ].map(s => (
            <div key={s.n} className="px-8 first:pl-0 last:pr-0">
              <p className="text-[32px] font-black tracking-[-0.04em] text-accent mb-0.5">{s.n}</p>
              <p className="text-[13px] text-mid">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-[120px] px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-[72px]">
            <p className="overline text-accent mb-4">How it works</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-black tracking-[-0.04em] text-hi mb-4">
              Three steps. No work required.
            </h2>
            <p className="text-[16px] text-mid max-w-[440px] mx-auto leading-relaxed">
              Set up once in under 5 minutes. Recallo runs silently in the background from that moment on.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <IconPhone />,
                n: '01',
                t: 'Patient calls your office',
                d: 'Patients dial your dedicated Recallo number. Every call is forwarded instantly to your real office line — staff and workflow unchanged.',
              },
              {
                icon: <IconMessage />,
                n: '02',
                t: 'Call goes unanswered',
                d: 'If no one answers within 20 seconds, Recallo detects the missed call in real time and springs into action automatically.',
              },
              {
                icon: <IconCalendar />,
                n: '03',
                t: 'Patient gets a text instantly',
                d: 'A personalized follow-up SMS with your booking link reaches the patient within seconds — before they even hang up or think to call elsewhere.',
              },
            ].map((step) => (
              <div key={step.n} className="card p-9 group hover:border-white/[0.12] transition-colors duration-200">
                <div className="flex items-center justify-between mb-7">
                  <div className="w-10 h-10 rounded-xl bg-accent/[0.1] border border-accent/[0.2] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="overline">{step.n}</span>
                </div>
                <h3 className="text-[17px] font-bold tracking-[-0.02em] text-hi mb-3 leading-snug">
                  {step.t}
                </h3>
                <p className="text-[14px] text-mid leading-[1.75]">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────────── */}
      <section className="px-6 pb-[120px]">
        <div className="max-w-[1120px] mx-auto card p-[clamp(40px,6vw,80px)] overflow-hidden relative">
          {/* Accent bar */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-accent/60" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="overline text-accent mb-5">Return on investment</p>
              <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.04em] text-hi leading-[1.1] mb-6">
                One recovered patient pays for Recallo for an entire year.
              </h2>
              <p className="text-[15px] text-mid leading-[1.75] mb-8">
                The average dental practice misses 30% of all incoming calls.
                Most of those patients never call back. Recallo turns every
                missed call into a second chance — automatically.
              </p>
              <Link href="/signup" className="btn btn-primary">
                Start your free trial
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '30%', d: 'Calls go unanswered' },
                { n: '$2k+', d: 'Value per new patient' },
                { n: '< 5s', d: 'Text delivery time' },
                { n: '~84%', d: 'Average recovery rate' },
              ].map(s => (
                <div key={s.n} className="bg-surface-2 rounded-2xl p-6 border border-white/[0.05]">
                  <p className="text-[38px] font-black tracking-[-0.04em] text-accent leading-none mb-2">{s.n}</p>
                  <p className="text-[13px] text-mid">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="px-6 pb-[140px]">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-[72px]">
            <p className="overline text-accent mb-4">Pricing</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-black tracking-[-0.04em] text-hi mb-3">
              Simple, honest pricing.
            </h2>
            <p className="text-[16px] text-mid">
              No setup fees. No hidden charges. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">

            {/* Founding Member */}
            <div className="card-accent p-9 relative flex flex-col">
              <div className="absolute -top-px left-7 bg-accent text-white text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-b-lg">
                First 10 only
              </div>
              <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-accent mt-3 mb-3">Founding Member</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[52px] font-black tracking-[-0.05em] text-hi leading-none">$297</span>
                <span className="text-[15px] text-mid mb-1">/mo</span>
              </div>
              <p className="text-[13px] text-low mb-8">Rate locked in for life</p>
              <ul className="flex flex-col gap-3 mb-9 flex-1">
                {['Unlimited patient follow-ups','Custom SMS message','Recovery analytics','Dedicated practice number','Priority support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-mid">
                    <IconCheck cls="text-accent mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn btn-primary w-full justify-center">
                Claim founding rate
              </Link>
            </div>

            {/* Standard */}
            <div className="card p-9 flex flex-col">
              <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-mid mb-3">Standard</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[52px] font-black tracking-[-0.05em] text-hi leading-none">$397</span>
                <span className="text-[15px] text-mid mb-1">/mo</span>
              </div>
              <p className="text-[13px] text-low mb-8">General dental practices</p>
              <ul className="flex flex-col gap-3 mb-9 flex-1">
                {['Unlimited patient follow-ups','Custom SMS message','Recovery analytics','Dedicated practice number','Email support'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-mid">
                    <IconCheck cls="text-accent mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn btn-ghost w-full justify-center">
                Get started
              </Link>
            </div>

            {/* Ortho */}
            <div className="card p-9 flex flex-col">
              <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-mid mb-3">Orthodontist</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[52px] font-black tracking-[-0.05em] text-hi leading-none">$497</span>
                <span className="text-[15px] text-mid mb-1">/mo</span>
              </div>
              <p className="text-[13px] text-low mb-8">Orthodontic practices</p>
              <ul className="flex flex-col gap-3 mb-9 flex-1">
                {['Unlimited patient follow-ups','Custom SMS message','Recovery analytics','Dedicated practice number','Priority support','Multi-location ready'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-mid">
                    <IconCheck cls="text-accent mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn btn-ghost w-full justify-center">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────── */}
      <section className="px-6 pb-[120px]">
        <div className="max-w-[1120px] mx-auto bg-surface-2 rounded-3xl border border-white/[0.07] px-[clamp(32px,6vw,80px)] py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-black tracking-[-0.035em] text-hi mb-2 leading-tight">
              Ready to stop losing patients?
            </h2>
            <p className="text-[15px] text-mid">5-minute setup. Your first recovered patient could be today.</p>
          </div>
          <Link href="/signup" className="btn btn-primary whitespace-nowrap shrink-0 !px-8 !py-3.5 !text-[16px]">
            Get started free →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[15px] font-semibold tracking-tight text-hi">Recallo</span>
          <p className="text-[12px] text-low">&copy; {new Date().getFullYear()} Recallo. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="text-[13px] text-low hover:text-mid transition-colors">Log in</Link>
            <Link href="/signup" className="text-[13px] text-low hover:text-mid transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
