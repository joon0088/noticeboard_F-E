import { AppShell } from "@/components/app-shell"
import { LandingHero } from "@/components/landing-hero"
import { LandingProperties } from "@/components/landing-properties"
import { LandingFeatures } from "@/components/landing-features"
import { LandingFeatureShowcase } from "@/components/landing-feature-showcase"

export default function HomePage() {
  return (
    <AppShell isLoggedIn={false} title="대시보드">
      <div className="space-y-10">
        <LandingHero />
        <LandingFeatures />
        <LandingFeatureShowcase />
        <LandingProperties />
      </div>
    </AppShell>
  )
}
