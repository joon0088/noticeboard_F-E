import { AppShell } from "@/components/app-shell"
import { PropertiesList } from "@/components/properties-list"

export default function PropertiesPage() {
  return (
    <AppShell isLoggedIn={false} title="매물보기">
      <PropertiesList />
    </AppShell>
  )
}
