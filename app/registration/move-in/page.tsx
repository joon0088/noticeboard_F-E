import { AppShell } from "@/components/app-shell"
import { RegistrationForm } from "@/components/registration-form"

export default function MoveInPage() {
  return (
    <AppShell isLoggedIn={true} title="입주전 등록">
      <RegistrationForm type="move-in" />
    </AppShell>
  )
}
