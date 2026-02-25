"use client"

import { useState } from "react"
import { PropertyCard } from "@/components/property-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"

const allProperties = [
  { title: "강남구 역삼동 오피스텔", address: "서울 강남구 역삼동 123-45", price: "월 85만원", type: "오피스텔", rooms: 1, bathrooms: 1, area: 33, status: "available" as const },
  { title: "마포구 합정동 투룸", address: "서울 마포구 합정동 67-89", price: "월 75만원", type: "아파트", rooms: 2, bathrooms: 1, area: 49, status: "occupied" as const },
  { title: "성동구 성수동 원룸", address: "서울 성동구 성수동 12-34", price: "월 60만원", type: "원룸", rooms: 1, bathrooms: 1, area: 23, status: "available" as const },
  { title: "서초구 방배동 쓰리룸", address: "서울 서초구 방배동 56-78", price: "월 120만원", type: "빌라", rooms: 3, bathrooms: 2, area: 72, status: "pending" as const },
  { title: "종로구 삼청동 스튜디오", address: "서울 종로구 삼청동 90-12", price: "월 55만원", type: "원룸", rooms: 1, bathrooms: 1, area: 19, status: "available" as const },
  { title: "용산구 이태원동 투룸", address: "서울 용산구 이태원동 34-56", price: "월 95만원", type: "아파트", rooms: 2, bathrooms: 1, area: 52, status: "available" as const },
  { title: "송파구 잠실동 오피스텔", address: "서울 송파구 잠실동 78-90", price: "월 90만원", type: "오피스텔", rooms: 1, bathrooms: 1, area: 36, status: "occupied" as const },
  { title: "영등포구 여의도동 쓰리룸", address: "서울 영등포구 여의도동 12-34", price: "월 150만원", type: "아파트", rooms: 3, bathrooms: 2, area: 85, status: "available" as const },
]

const filters = ["전체", "원룸", "투룸", "쓰리룸", "오피스텔", "아파트", "빌라"]

export function PropertiesList() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("전체")

  const filtered = allProperties.filter((p) => {
    const matchSearch =
      p.title.includes(search) || p.address.includes(search)
    const matchFilter =
      activeFilter === "전체" ||
      p.type === activeFilter ||
      (activeFilter === "투룸" && p.rooms === 2 && p.type !== "오피스텔") ||
      (activeFilter === "쓰리룸" && p.rooms === 3)
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="매물명 또는 주소로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg bg-card pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="size-4" />
            <span className="hidden sm:inline">필터</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Badge
              key={f}
              variant={activeFilter === f ? "default" : "secondary"}
              className={
                activeFilter === f
                  ? "cursor-pointer bg-primary text-primary-foreground"
                  : "cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>

      {/* Properties grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <PropertyCard key={p.title} {...p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Search className="mb-3 size-10 opacity-40" />
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm">다른 검색어나 필터를 사용해 보세요</p>
        </div>
      )}
    </div>
  )
}
