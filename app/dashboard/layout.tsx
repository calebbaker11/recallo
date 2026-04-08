import DashboardNav from '@/components/DashboardNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <DashboardNav />
      <main
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        {children}
      </main>
    </div>
  )
}
