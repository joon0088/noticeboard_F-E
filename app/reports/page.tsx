import { AppShell } from "@/components/app-shell"
import { ReportsContent } from "@/components/reports-content"

export default function ReportsPage() {
  return (
    <AppShell isLoggedIn={true} title="분석보고서">
      <ReportsContent />
    </AppShell>
  )
}
