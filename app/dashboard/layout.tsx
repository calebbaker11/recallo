import DashboardNav from '@/components/DashboardNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg">
      <DashboardNav />
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}
