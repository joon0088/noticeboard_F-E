"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUploadZone } from "@/components/image-upload-zone"
import { CheckCircle2, Home, LogOut } from "lucide-react"

interface RegistrationFormProps {
  type: "move-in" | "move-out"
}

const rooms = ["거실", "주방", "침실 1", "침실 2", "화장실", "베란다", "현관", "기타"]

const sampleProperties = [
  "강남구 역삼동 오피스텔",
  "마포구 합정동 투룸",
  "성동구 성수동 원룸",
  "서초구 방배동 쓰리룸",
]

export function RegistrationForm({ type }: RegistrationFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedProperty, setSelectedProperty] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const isMoveIn = type === "move-in"
  const title = isMoveIn ? "입주전 사진 등록" : "퇴거전 사진 등록"
  const desc = isMoveIn
    ? "입주 전 실내 상태를 촬영하여 등록해 주세요. 추후 AI 분석의 기준 데이터가 됩니다."
    : "퇴거 전 현재 실내 상태를 촬영하여 등록해 주세요. 입주 전 사진과 비교 분석됩니다."

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-8 text-primary" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">등록 완료</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isMoveIn ? "입주전" : "퇴거전"} 사진이 성공적으로 등록되었습니다
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => router.push("/analysis")} className="gap-2">
            AI 분석 시작
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            대시보드로
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`flex size-10 items-center justify-center rounded-xl ${isMoveIn ? "bg-primary" : "bg-accent"}`}>
          {isMoveIn ? (
            <Home className="size-5 text-primary-foreground" />
          ) : (
            <LogOut className="size-5 text-accent-foreground" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {["매물 선택", "사진 업로드", "상세 정보"].map((s, i) => (
          <div
            key={s}
            className={`flex-1 rounded-full py-1.5 text-center text-xs font-medium transition-colors ${
              i <= step
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 0: Select property */}
      {step === 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">매물 선택</CardTitle>
            <CardDescription>사진을 등록할 매물을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="매물을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {sampleProperties.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              disabled={!selectedProperty}
              onClick={() => setStep(1)}
            >
              다음
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Upload images */}
      {step === 1 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">공간별 사진 업로드</CardTitle>
            <CardDescription>
              각 공간별로 사진을 촬영하여 업로드해 주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {rooms.map((room) => (
              <ImageUploadZone
                key={room}
                label={room}
                description={`${room}의 전체 모습이 보이도록 촬영해 주세요`}
                maxFiles={5}
              />
            ))}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                이전
              </Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                다음
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Additional info */}
      {step === 2 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">추가 정보</CardTitle>
            <CardDescription>등록에 필요한 추가 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-date">{isMoveIn ? "입주 예정일" : "퇴거 예정일"}</Label>
              <Input id="reg-date" type="date" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-notes">특이사항</Label>
              <Textarea
                id="reg-notes"
                placeholder="기존 하자 사항이나 특이사항을 기록해 주세요"
                rows={4}
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-contact">연락처</Label>
              <Input
                id="reg-contact"
                placeholder="010-0000-0000"
                className="bg-secondary"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                이전
              </Button>
              <Button className="flex-1" onClick={() => setSubmitted(true)}>
                등록 완료
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
