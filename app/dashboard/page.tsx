import { AppShell } from "@/components/app-shell"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <AppShell isLoggedIn={true} title="대시보드">
      <DashboardContent />
    </AppShell>
  )
}
