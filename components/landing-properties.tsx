import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { ArrowRight } from "lucide-react"

const sampleProperties = [
  {
    title: "강남구 역삼동 오피스텔",
    address: "서울 강남구 역삼동 123-45",
    price: "월 85만원",
    type: "오피스텔",
    rooms: 1,
    bathrooms: 1,
    area: 33,
    status: "available" as const,
  },
  {
    title: "마포구 합정동 투룸",
    address: "서울 마포구 합정동 67-89",
    price: "월 75만원",
    type: "아파트",
    rooms: 2,
    bathrooms: 1,
    area: 49,
    status: "occupied" as const,
  },
  {
    title: "성동구 성수동 원룸",
    address: "서울 성동구 성수동 12-34",
    price: "월 60만원",
    type: "원룸",
    rooms: 1,
    bathrooms: 1,
    area: 23,
    status: "available" as const,
  },
  {
    title: "서초구 방배동 쓰리룸",
    address: "서울 서초구 방배동 56-78",
    price: "월 120만원",
    type: "빌라",
    rooms: 3,
    bathrooms: 2,
    area: 72,
    status: "pending" as const,
  },
]

export function LandingProperties() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">최근 등록 매물</h2>
          <p className="text-sm text-muted-foreground">
            새로 등록된 매물을 확인해 보세요
          </p>
        </div>
        <Button asChild variant="ghost" className="text-primary">
          <Link href="/properties">
            전체보기
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sampleProperties.map((p) => (
          <PropertyCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  )
}
