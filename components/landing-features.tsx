import { Card, CardContent } from "@/components/ui/card"
import { Camera, BarChart3, FileCheck, Building } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "이미지 정합",
    description: "전후 촬영 각도 차이를 보정하여 동일 기준으로 정렬합니다.",
  },
  {
    icon: BarChart3,
    title: "변화 영역 탐색",
    description: "픽셀 차이 기반으로 변화가 발생한 영역을 정밀 탐색합니다.",
  },
  {
    icon: FileCheck,
    title: "정량 리포트",
    description: "변화 위치, 면적, 비율을 시각화하고 요약 정보를 제공합니다.",
  },
  {
    icon: Building,
    title: "다중 매물 관리",
    description: "임대인을 위한 다중 매물 등록 및 관리 기능을 지원합니다.",
  },
]

export function LandingFeatures() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">핵심 기능</h2>
        <p className="text-sm text-muted-foreground">
          AI 기반 공간 분석의 핵심 기능을 소개합니다
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card
            key={f.title}
            className="group border-border/50 transition-all hover:shadow-md hover:border-primary/30"
          >
            <CardContent className="flex flex-col items-start gap-3 pt-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
