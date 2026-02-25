import { AppShell } from "@/components/app-shell"
import { ProfileContent } from "@/components/profile-content"

export default function ProfilePage() {
  return (
    <AppShell isLoggedIn={true} title="회원정보수정">
      <ProfileContent />
    </AppShell>
  )
}
