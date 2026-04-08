import Link from 'next/link'

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ color: 'var(--accent)', flexShrink: 0 }}
  >
    <path
      d="M3 8l3.5 3.5L13 4.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ── Navbar ──────────────────────────────────────── */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          background: 'rgba(11,15,20,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Recallo
          </span>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link
              href="/login"
              className="nav-link"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                padding: '6px 14px',
                borderRadius: '8px',
              }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn-primary"
              style={{
                fontSize: '14px',
                padding: '7px 18px',
                borderRadius: '8px',
                display: 'inline-block',
              }}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ padding: '120px 24px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '24px',
            }}
          >
            Automated patient recovery
          </p>
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: '800',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
              color: 'var(--text-primary)',
              marginBottom: '28px',
            }}
          >
            Never lose a patient<br />to voicemail again.
          </h1>
          <p
            style={{
              fontSize: '19px',
              lineHeight: '1.65',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              margin: '0 auto 48px',
            }}
          >
            Recallo texts patients the instant your office misses their call —
            recovering appointments before they dial a competitor.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/signup"
              className="btn-primary"
              style={{
                fontSize: '15px',
                padding: '14px 32px',
                borderRadius: '10px',
                letterSpacing: '-0.01em',
                display: 'inline-block',
              }}
            >
              Start recovering patients
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              5-minute setup · No contracts
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: '1px', background: 'var(--border)' }} />
      </div>

      {/* ── How it works ─────────────────────────────────── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              color: 'var(--text-primary)',
              marginBottom: '72px',
            }}
          >
            Three steps. Fully automatic.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2px',
            }}
          >
            {[
              {
                number: '01',
                title: 'Patient calls your office',
                body: 'Give patients your Recallo number. Every call is instantly forwarded to your real office line — nothing changes for staff.',
              },
              {
                number: '02',
                title: 'Call goes unanswered',
                body: "If your team doesn't pick up within 20 seconds, Recallo detects the missed call and triggers immediately.",
              },
              {
                number: '03',
                title: 'Patient receives a follow-up text',
                body: 'A personalized SMS is sent with your booking link — reaching the patient before they consider calling someone else.',
              },
            ].map((step) => (
              <div key={step.number} className="step-card" style={{ padding: '48px 40px' }}>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    marginBottom: '20px',
                  }}
                >
                  {step.number}
                </p>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: '1.3',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.65',
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: 'clamp(40px, 6vw, 72px) clamp(32px, 6vw, 64px)',
          }}
        >
          <div style={{ maxWidth: '560px', marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 38px)',
                fontWeight: '700',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                lineHeight: '1.15',
              }}
            >
              One recovered patient pays for a year of Recallo.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                margin: 0,
              }}
            >
              The average dental practice misses 30% of incoming calls. Each one is a
              patient who may never call back. Recallo closes that gap automatically.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '48px',
            }}
          >
            {[
              {
                stat: '30%',
                label: 'of calls go unanswered at the average dental office',
              },
              {
                stat: '$2,000+',
                label: 'lifetime value of a single recovered patient',
              },
              {
                stat: '< 5s',
                label: 'average time to send a follow-up text after a missed call',
              },
            ].map((item) => (
              <div key={item.stat}>
                <p
                  style={{
                    fontSize: '42px',
                    fontWeight: '800',
                    letterSpacing: '-0.04em',
                    color: 'var(--accent)',
                    lineHeight: '1',
                    marginBottom: '10px',
                  }}
                >
                  {item.stat}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            Simple pricing. No surprises.
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            No setup fees. No contracts. Cancel anytime.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Founding Member */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--accent)',
                borderRadius: '14px',
                padding: '40px 36px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '28px',
                  background: 'var(--accent)',
                  color: '#0B0F14',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '0 0 6px 6px',
                }}
              >
                Limited · First 10 only
              </div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--accent)',
                  marginBottom: '12px',
                  marginTop: '16px',
                }}
              >
                Founding Member
              </p>
              <div style={{ marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '44px',
                    fontWeight: '800',
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  $297
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    color: 'var(--text-secondary)',
                    marginLeft: '4px',
                  }}
                >
                  /mo
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                Rate locked in forever
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 1,
                }}
              >
                {[
                  'Unlimited patient follow-up texts',
                  'Custom SMS message',
                  'Patient recovery analytics',
                  'Dedicated practice number',
                  'Priority support',
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn-primary"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  letterSpacing: '-0.01em',
                }}
              >
                Claim founding rate
              </Link>
            </div>

            {/* Standard */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Standard
              </p>
              <div style={{ marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '44px',
                    fontWeight: '800',
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  $397
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', marginLeft: '4px' }}>
                  /mo
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                General dental practices
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 1,
                }}
              >
                {[
                  'Unlimited patient follow-up texts',
                  'Custom SMS message',
                  'Patient recovery analytics',
                  'Dedicated practice number',
                  'Email support',
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn-secondary"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px',
                  borderRadius: '8px',
                  fontSize: '15px',
                }}
              >
                Get started
              </Link>
            </div>

            {/* Ortho */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                }}
              >
                Orthodontist
              </p>
              <div style={{ marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '44px',
                    fontWeight: '800',
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  $497
                </span>
                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', marginLeft: '4px' }}>
                  /mo
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                Orthodontic practices
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 1,
                }}
              >
                {[
                  'Unlimited patient follow-up texts',
                  'Custom SMS message',
                  'Patient recovery analytics',
                  'Dedicated practice number',
                  'Priority support',
                  'Multi-location ready',
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn-secondary"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '13px',
                  borderRadius: '8px',
                  fontSize: '15px',
                }}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px' }}>
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Recallo
          </span>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Recallo. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/login" className="footer-link" style={{ fontSize: '13px' }}>
              Log in
            </Link>
            <Link href="/signup" className="footer-link" style={{ fontSize: '13px' }}>
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
