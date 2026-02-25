import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ScanSearch, Shield, FileText } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground lg:p-12">
      {/* Decorative shapes */}
      <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary-foreground/5" />
      <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary-foreground/5" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-4">
          <h1 className="text-balance text-3xl font-bold leading-tight lg:text-4xl">
            AI로 실내공간 변화를
            <br />
            객관적으로 분석합니다
          </h1>
          <p className="text-pretty text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
            입주 전후 사진을 비교하여 변화 정도를 정량적 수치로 제공하고,
            임대인과 임차인 간 분쟁을 최소화하는 스마트 서비스
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signup">
                무료로 시작하기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/properties">매물 둘러보기</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          {[
            { icon: ScanSearch, label: "AI 분석", desc: "전후 비교" },
            { icon: Shield, label: "분쟁 예방", desc: "객관적 근거" },
            { icon: FileText, label: "보고서", desc: "PDF 제공" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl bg-primary-foreground/10 p-4 text-center backdrop-blur-sm"
            >
              <item.icon className="size-6" />
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-primary-foreground/60">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
