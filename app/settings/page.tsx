import { AppShell } from "@/components/app-shell"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <AppShell isLoggedIn={true} title="사용자설정">
      <SettingsContent />
    </AppShell>
  )
}
