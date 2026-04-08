import DashboardNav from '@/components/DashboardNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base">
      <DashboardNav />
      <main className="max-w-[1120px] mx-auto px-6 py-14">
        {children}
      </main>
    </div>
  )
}
