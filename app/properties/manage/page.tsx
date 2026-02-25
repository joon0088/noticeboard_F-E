import { AppShell } from "@/components/app-shell"
import { PropertyManagement } from "@/components/property-management"

export default function PropertyManagePage() {
  return (
    <AppShell isLoggedIn={true} title="매물관리">
      <PropertyManagement />
    </AppShell>
  )
}
