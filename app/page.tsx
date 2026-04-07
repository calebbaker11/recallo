import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-blue-600">Recallo</span>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Built for dental practices
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Never lose a patient to voicemail again
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Recallo automatically texts patients back the moment your office misses
            their call — getting them booked before they call a competitor.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            Start recovering missed calls
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Setup takes under 5 minutes. No contracts.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How Recallo works
          </h2>
          <p className="text-center text-gray-500 mb-16">
            Three simple steps. Fully automated.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Patient calls your office',
                description:
                  'You give patients your Recallo number. Every call is automatically forwarded to your real office line.',
                icon: '📞',
              },
              {
                step: '2',
                title: 'Call goes unanswered',
                description:
                  'If no one picks up within 20 seconds, Recallo detects the missed call in real time.',
                icon: '📵',
              },
              {
                step: '3',
                title: 'Patient gets a text instantly',
                description:
                  'Recallo immediately sends a personalized SMS with your booking link — before they call a competitor.',
                icon: '💬',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI section */}
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The math is simple</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-4xl font-bold text-blue-400 mb-2">30%</p>
              <p className="text-gray-300 text-sm">
                of incoming calls go unanswered at the average dental practice
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-4xl font-bold text-green-400 mb-2">$2,000+</p>
              <p className="text-gray-300 text-sm">
                lifetime value of a single recovered new patient
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-4xl font-bold text-yellow-400 mb-2">10x</p>
              <p className="text-gray-300 text-sm">
                One recovered patient pays for Recallo ten times over
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The average dental practice misses 30% of incoming calls. One recovered new
            patient pays for Recallo 10 times over.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-gray-500 mb-16">
            No setup fees. No contracts. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Founding Member */}
            <div className="relative bg-white rounded-2xl border-2 border-blue-500 p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Limited — first 10 customers only
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600 mb-2">Founding Member</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                $297<span className="text-lg font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Locked in forever</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited missed call texts',
                  'Custom SMS messages',
                  'Dashboard & analytics',
                  'Dedicated Twilio number',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Claim founding rate
              </Link>
            </div>

            {/* Standard */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-500 mb-2">Standard</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                $397<span className="text-lg font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">General dental practices</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited missed call texts',
                  'Custom SMS messages',
                  'Dashboard & analytics',
                  'Dedicated Twilio number',
                  'Email support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Get started
              </Link>
            </div>

            {/* Ortho */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <p className="text-sm font-semibold text-gray-500 mb-2">Orthodontist</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                $497<span className="text-lg font-normal text-gray-500">/mo</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Orthodontic practices</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited missed call texts',
                  'Custom SMS messages',
                  'Dashboard & analytics',
                  'Dedicated Twilio number',
                  'Priority support',
                  'Multi-location support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold text-blue-600">Recallo</span>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Recallo. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/login" className="hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-900 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
