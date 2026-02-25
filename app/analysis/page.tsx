import { AppShell } from "@/components/app-shell"
import { AnalysisContent } from "@/components/analysis-content"

export default function AnalysisPage() {
  return (
    <AppShell isLoggedIn={true} title="AI 전후비교분석">
      <AnalysisContent />
    </AppShell>
  )
}
