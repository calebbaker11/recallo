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
function IconQuote() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent/40">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor" />
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
          <div className="text-[10px] font-bold tracking-widest uppercase text-[#4A5568] mb-2">
            Patients followed up this month
          </div>
          <div className="text-[52px] font-black tracking-[-0.05em] text-[#4F9EFF] leading-none mb-1">47</div>
          <div className="text-[11px] text-[#8592A8]">from 56 missed calls · last text sent 14 min ago</div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Missed calls',  val: '56' },
            { label: 'Texts sent',    val: '52' },
            { label: 'Avg. response', val: '< 5s' },
          ].map(s => (
            <div key={s.label} className="rounded-lg bg-[#0D1218] border border-white/[0.04] p-3">
              <div className="text-[9px] uppercase tracking-wider text-[#4A5568] mb-1">{s.label}</div>
              <div className="text-[20px] font-extrabold tracking-[-0.04em] text-[#EDF0F7]">{s.val}</div>
            </div>
          ))}
        </div>

        {/* Table rows */}
        <div className="rounded-xl border border-white/[0.05] overflow-hidden">
          <div className="grid grid-cols-3 px-3.5 py-2 bg-[#0A0E16] border-b border-white/[0.04]">
            {['Patient', 'Received', 'Status'].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-wider uppercase text-[#4A5568]">{h}</span>
            ))}
          </div>
          {[
            ['(555) 291-4830', 'Today, 2:14 PM',     true],
            ['(555) 847-2193', 'Today, 11:52 AM',    true],
            ['(555) 103-9284', 'Yesterday, 4:38 PM', false],
          ].map(([num, time, sent], i) => (
            <div key={i} className="grid grid-cols-3 items-center px-3.5 py-2.5 border-b border-white/[0.03] last:border-0">
              <span className="text-[11px] text-[#EDF0F7] font-medium tabular-nums">{num as string}</span>
              <span className="text-[11px] text-[#8592A8]">{time as string}</span>
              <span className={`text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded w-fit ${
                sent
                  ? 'text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/20'
                  : 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20'
              }`}>{sent ? 'Text sent' : 'Pending'}</span>
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
                  Automatic missed call text-back for dental practices
                </span>
              </div>

              <h1 className="anim-up d1 text-[clamp(40px,5.5vw,64px)] font-black tracking-[-0.045em] text-hi leading-[1.02] mb-6">
                Missed a call?<br />Patient gets a text.
              </h1>

              <p className="anim-up d2 text-[18px] text-mid leading-[1.75] mb-10 max-w-[460px]">
                Recallo automatically sends a follow-up text the moment your
                office misses a call — so patients book instead of hanging up.
                No extra work. No app. Just more appointments.
              </p>

              <div className="anim-up d3 flex flex-wrap items-center gap-4 mb-8">
                <Link href="/signup" className="btn btn-primary group">
                  Start recovering missed patients
                  <IconArrowRight />
                </Link>
                <Link href="#how-it-works" className="btn btn-ghost">
                  See how it works
                </Link>
              </div>

              {/* Trust markers */}
              <div className="anim-up d4 flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 border-t border-white/[0.06]">
                {[
                  'Setup in under 5 minutes',
                  'No app required for patients',
                  'Works automatically in the background',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <IconCheck cls="text-green" />
                    <span className="text-[13px] text-mid">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: dashboard */}
            <div className="anim-up d2 hidden lg:block">
              <DashboardPreview />
              <p className="text-center text-[12px] text-low mt-4">
                Simple visibility into every missed call and follow-up
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-surface/50">
        <div className="max-w-[1120px] mx-auto px-6 py-8 grid sm:grid-cols-3 divide-x divide-white/[0.06]">
          {[
            { n: '30%',    d: 'of dental calls go unanswered' },
            { n: '$2,000+', d: 'lifetime value of a single new patient' },
            { n: '< 5 sec', d: 'from missed call to patient text' },
          ].map(s => (
            <div key={s.n} className="px-8 first:pl-0 last:pr-0">
              <p className="text-[32px] font-black tracking-[-0.04em] text-accent mb-0.5">{s.n}</p>
              <p className="text-[13px] text-mid">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ─────────────────────────────────── */}
      <section id="how-it-works" className="py-[120px] px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-[72px]">
            <p className="overline text-accent mb-4">How it works</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-black tracking-[-0.04em] text-hi mb-4">
              Set it up once. It runs itself.
            </h2>
            <p className="text-[16px] text-mid max-w-[420px] mx-auto leading-relaxed">
              Recallo works silently in the background — no staff training,
              no new habits, no extra work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <IconPhone />,
                n: '01',
                t: 'Patient calls your office',
                d: 'Patients call your dedicated Recallo number. It rings through to your real office line exactly as it does today — nothing changes for your staff.',
              },
              {
                icon: <IconMessage />,
                n: '02',
                t: 'Nobody answers',
                d: 'If the call goes unanswered, Recallo detects it instantly. No voicemail left behind. No patient lost in the shuffle.',
              },
              {
                icon: <IconCalendar />,
                n: '03',
                t: 'Patient gets a text in seconds',
                d: 'A friendly follow-up text with your booking link reaches them automatically — before they hang up or search for another dentist.',
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

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="px-6 pb-[100px]">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                quote: "Recallo helped us respond to missed calls instantly. We started seeing more booked appointments within the first week — patients really appreciate that quick follow-up text.",
                name: 'Dr. Sarah M.',
                role: 'General Dentist · Austin, TX',
                initial: 'S',
              },
              {
                quote: "The setup took about ten minutes and it's been running on autopilot since. It's one of the few tools in our practice I genuinely don't have to think about.",
                name: 'Dr. James K.',
                role: 'Orthodontist · Denver, CO',
                initial: 'J',
              },
            ].map(t => (
              <div key={t.name} className="card p-9 flex flex-col gap-6">
                <IconQuote />
                <p className="text-[15px] text-mid leading-[1.85] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                  <div className="w-9 h-9 rounded-full bg-surface-3 border border-white/[0.08] flex items-center justify-center text-[13px] font-bold text-mid shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-hi">{t.name}</p>
                    <p className="text-[12px] text-low">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────────── */}
      <section className="px-6 pb-[120px]">
        <div className="max-w-[1120px] mx-auto card p-[clamp(40px,6vw,80px)] overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-accent/60" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="overline text-accent mb-5">Why it pays for itself</p>
              <h2 className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.04em] text-hi leading-[1.1] mb-6">
                One recovered patient covers the cost.
              </h2>
              <p className="text-[15px] text-mid leading-[1.75] mb-4">
                A new dental patient is worth $2,000+ over their lifetime.
                Recallo costs $397 a month.
              </p>
              <p className="text-[15px] text-mid leading-[1.75] mb-8">
                If it brings back even a single missed patient, it pays for
                itself — and every recovery after that is pure profit.
              </p>
              <Link href="/signup" className="btn btn-primary group">
                Get set up in minutes
                <IconArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '30%',    d: 'of calls go unanswered in the average dental office' },
                { n: '$2k+',   d: 'lifetime value of a single recovered patient' },
                { n: '< 5s',   d: 'from missed call to text in the patient\'s pocket' },
                { n: '5 min',  d: 'to set up Recallo — then it runs itself' },
              ].map(s => (
                <div key={s.n} className="bg-surface-2 rounded-2xl p-6 border border-white/[0.05]">
                  <p className="text-[38px] font-black tracking-[-0.04em] text-accent leading-none mb-2">{s.n}</p>
                  <p className="text-[13px] text-mid leading-snug">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="px-6 pb-[140px]">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center mb-[64px]">
            <p className="overline text-accent mb-4">Pricing</p>
            <h2 className="text-[clamp(30px,4vw,46px)] font-black tracking-[-0.04em] text-hi mb-3">
              One plan. Everything included.
            </h2>
            <p className="text-[16px] text-mid">
              No tiers to compare. No features locked away. No surprises.
            </p>
          </div>

          {/* Single pricing card */}
          <div className="max-w-[520px] mx-auto">
            <div className="card-accent relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-accent/70" />
              <div className="p-10">

                {/* Price */}
                <div className="text-center mb-10">
                  <p className="text-[13px] font-bold tracking-[0.08em] uppercase text-accent mb-4">Recallo</p>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-[72px] font-black tracking-[-0.05em] text-hi leading-none">$397</span>
                    <span className="text-[18px] text-mid font-medium">/month</span>
                  </div>
                  <p className="text-[14px] text-low">No setup fee · Cancel anytime</p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-4 mb-10">
                  {[
                    'Instant text-back for every missed call',
                    'Works with your existing office number',
                    'Simple dashboard — see every missed call and follow-up',
                    'Done-for-you setup in under 5 minutes',
                    'Support included',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-mid">
                      <IconCheck cls="text-accent mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* ROI nudge */}
                <div className="rounded-xl bg-surface-2 border border-white/[0.05] px-5 py-4 mb-8 text-center">
                  <p className="text-[14px] text-mid">
                    One recovered patient covers the monthly cost.
                  </p>
                </div>

                <Link href="/signup" className="btn btn-primary w-full justify-center text-[16px] !py-3.5">
                  Start recovering missed patients
                </Link>
              </div>
            </div>

            {/* ── Founding offer ─────────────────────────── */}
            <div className="mt-4 rounded-2xl border border-accent/25 px-8 py-7"
              style={{ background: 'rgba(79,158,255,0.04)' }}>
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="tag-accent">Founding Member Rate</span>
                    <span className="text-[11px] text-low">· First 10 practices only</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[38px] font-black tracking-[-0.04em] text-hi leading-none">$297</span>
                    <span className="text-[15px] text-mid">/month</span>
                  </div>
                  <p className="text-[13px] text-low mt-1">
                    Lock in this rate for life — price never increases
                  </p>
                </div>
                <Link href="/signup" className="btn btn-primary shrink-0 self-center">
                  Claim this rate →
                </Link>
              </div>

              {/* Scarcity bar */}
              <div className="mt-6 pt-5 border-t border-accent/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-low">Founding spots claimed</span>
                  <span className="text-[12px] font-semibold text-accent">7 of 10</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-[70%] rounded-full bg-accent/60" />
                </div>
                <p className="text-[11px] text-low mt-2">3 spots remaining at this price</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────── */}
      <section className="px-6 pb-[120px]">
        <div className="max-w-[1120px] mx-auto bg-surface-2 rounded-3xl border border-white/[0.07] px-[clamp(32px,6vw,80px)] py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-black tracking-[-0.035em] text-hi mb-2 leading-tight">
              Ready to stop losing patients to voicemail?
            </h2>
            <p className="text-[15px] text-mid">
              5-minute setup. Works automatically. Your first recovery could be today.
            </p>
          </div>
          <Link href="/signup" className="btn btn-primary whitespace-nowrap shrink-0 !px-8 !py-3.5 !text-[16px] group">
            Get started now
            <IconArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[15px] font-semibold tracking-tight text-hi">Recallo</span>
          <p className="text-[12px] text-low">&copy; {new Date().getFullYear()} Recallo. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login"  className="text-[13px] text-low hover:text-mid transition-colors">Log in</Link>
            <Link href="/signup" className="text-[13px] text-low hover:text-mid transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
