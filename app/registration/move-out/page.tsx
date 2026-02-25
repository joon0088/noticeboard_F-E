import { AppShell } from "@/components/app-shell"
import { RegistrationForm } from "@/components/registration-form"

export default function MoveOutPage() {
  return (
    <AppShell isLoggedIn={true} title="퇴거전 등록">
      <RegistrationForm type="move-out" />
    </AppShell>
  )
}
