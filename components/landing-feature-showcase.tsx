"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  ArrowLeftRight,
  Play,
  Clock,
  CheckCircle2,
  BarChart3,
  AlertTriangle,
  Layers,
  FileText,
  Download,
  Printer,
  Share2,
  Eye,
  ChevronRight,
  Sparkles,
  ZoomIn,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

/* ─── PHOTO REGISTRATION SECTION ─── */

function PhotoRegistrationDemo() {
  const [files, setFiles] = useState<{ name: string; room: string }[]>([])
  const [dragOver, setDragOver] = useState(false)

  const sampleRooms = ["거실", "주방", "침실", "화장실", "베란다"]

  function addSamplePhoto() {
    if (files.length >= 8) return
    const room = sampleRooms[files.length % sampleRooms.length]
    setFiles((prev) => [
      ...prev,
      { name: `${room}_사진_${prev.length + 1}.jpg`, room },
    ])
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return
      const accepted = Array.from(newFiles)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 8 - files.length)
      setFiles((prev) => [
        ...prev,
        ...accepted.map((f) => ({
          name: f.name,
          room: sampleRooms[prev.length % sampleRooms.length],
        })),
      ])
    },
    [files.length]
  )

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <label
        className={cn(
          "flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-10 transition-all duration-200",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/40"
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <Upload className="size-7 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">
            사진을 드래그하거나 클릭하여 업로드
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            JPG, PNG, HEIC 지원 / 최대 8장
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {/* Quick add for demo */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {files.length}장 등록됨 / 최대 8장
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={addSamplePhoto}
          disabled={files.length >= 8}
          className="gap-1.5"
        >
          <Camera className="size-3.5" />
          샘플 추가
        </Button>
      </div>

      {/* Preview grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/60 transition-all hover:shadow-md"
            >
              <div className="flex size-full flex-col items-center justify-center gap-2">
                <ImageIcon className="size-8 text-muted-foreground/50" />
                <Badge variant="secondary" className="text-xs">
                  {file.room}
                </Badge>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-foreground/70 px-2 py-1.5 backdrop-blur-sm">
                <p className="truncate text-xs font-medium text-card">
                  {file.name}
                </p>
              </div>
              <button
                className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-foreground/60 text-card opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Room tags summary */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-primary/5 p-4">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium text-foreground">등록된 공간:</span>
          {[...new Set(files.map((f) => f.room))].map((room) => (
            <Badge key={room} className="bg-primary text-primary-foreground">
              {room} ({files.filter((f) => f.room === room).length}장)
            </Badge>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2" disabled={files.length === 0} asChild>
          <Link href="/registration/move-in">
            <Upload className="size-4" />
            입주 전 등록하기
          </Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2"
          disabled={files.length === 0}
          asChild
        >
          <Link href="/registration/move-out">
            <Upload className="size-4" />
            퇴거 전 등록하기
          </Link>
        </Button>
      </div>
    </div>
  )
}

/* ─── PHOTO COMPARISON SECTION ─── */

interface ComparisonRoom {
  name: string
  changeRate: number
  severity: "low" | "medium" | "high"
  details: string[]
}

const mockComparisonResults: ComparisonRoom[] = [
  {
    name: "거실",
    changeRate: 12.4,
    severity: "low",
    details: ["벽면 경미한 오염", "바닥재 상태 양호"],
  },
  {
    name: "주방",
    changeRate: 28.7,
    severity: "medium",
    details: ["싱크대 주변 변색", "타일 그라우트 오염"],
  },
  {
    name: "침실",
    changeRate: 8.2,
    severity: "low",
    details: ["벽지 일부 변색", "바닥 상태 양호"],
  },
  {
    name: "화장실",
    changeRate: 45.3,
    severity: "high",
    details: ["타일 균열 발견", "실리콘 변색"],
  },
  {
    name: "베란다",
    changeRate: 18.9,
    severity: "medium",
    details: ["외벽 페인트 벗겨짐"],
  },
]

const severityConfig = {
  low: {
    label: "양호",
    bg: "bg-primary/10",
    text: "text-primary",
    barColor: "bg-primary",
  },
  medium: {
    label: "주의",
    bg: "bg-accent/20",
    text: "text-accent-foreground",
    barColor: "bg-accent",
  },
  high: {
    label: "심각",
    bg: "bg-destructive/10",
    text: "text-destructive",
    barColor: "bg-destructive",
  },
}

function PhotoComparisonDemo() {
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ComparisonRoom[] | null>(null)

  function startAnalysis() {
    setAnalyzing(true)
    setProgress(0)
    setResults(null)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setResults(mockComparisonResults)
          return 100
        }
        return prev + 3
      })
    }, 60)
  }

  function resetAnalysis() {
    setResults(null)
    setProgress(0)
  }

  const avgChange = results
    ? (
        results.reduce((s, r) => s + r.changeRate, 0) / results.length
      ).toFixed(1)
    : "0"

  const steps = [
    { label: "이미지 정합", threshold: 20 },
    { label: "ROI 탐색", threshold: 40 },
    { label: "정밀 분할", threshold: 60 },
    { label: "변화 판단", threshold: 80 },
    { label: "리포트 생성", threshold: 100 },
  ]

  return (
    <div className="space-y-6">
      {/* Before / After mock cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
              <span className="text-[10px] font-bold text-primary">{"B"}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              입주 전 (Before)
            </span>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="size-10" />
              <span className="text-xs">5장 등록됨</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-accent/30">
              <span className="text-[10px] font-bold text-accent-foreground">
                {"A"}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              퇴거 전 (After)
            </span>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="size-10" />
              <span className="text-xs">5장 등록됨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis action */}
      {!results && !analyzing && (
        <Button
          className="w-full gap-2"
          size="lg"
          onClick={startAnalysis}
        >
          <Play className="size-4" />
          AI 전후 비교 분석 시작
        </Button>
      )}

      {/* Progress indicator */}
      {analyzing && (
        <div className="space-y-4 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 animate-spin text-primary" />
              <p className="text-sm font-semibold text-foreground">
                AI 분석 진행 중...
              </p>
            </div>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.label} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border-2 transition-colors",
                    progress >= step.threshold
                      ? "border-primary bg-primary"
                      : "border-border bg-card"
                  )}
                >
                  {progress >= step.threshold && (
                    <CheckCircle2 className="size-3.5 text-primary-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px]",
                    progress >= step.threshold
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-primary/10 p-4 text-center">
              <BarChart3 className="mx-auto size-5 text-primary" />
              <p className="mt-1 text-2xl font-bold text-foreground">{avgChange}%</p>
              <p className="text-xs text-muted-foreground">평균 변화율</p>
            </div>
            <div className="rounded-xl bg-accent/15 p-4 text-center">
              <Layers className="mx-auto size-5 text-accent-foreground" />
              <p className="mt-1 text-2xl font-bold text-foreground">
                {results.length}개
              </p>
              <p className="text-xs text-muted-foreground">분석 공간</p>
            </div>
            <div className="rounded-xl bg-destructive/10 p-4 text-center">
              <AlertTriangle className="mx-auto size-5 text-destructive" />
              <p className="mt-1 text-2xl font-bold text-foreground">
                {results.filter((r) => r.severity !== "low").length}곳
              </p>
              <p className="text-xs text-muted-foreground">주의 영역</p>
            </div>
          </div>

          {/* Per-room results */}
          <div className="space-y-3">
            {results.map((room) => {
              const cfg = severityConfig[room.severity]
              return (
                <div
                  key={room.name}
                  className="rounded-xl border border-border/50 bg-card p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowLeftRight className="size-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {room.name}
                      </span>
                      <Badge variant="secondary" className={cn(cfg.bg, cfg.text)}>
                        {cfg.label}
                      </Badge>
                    </div>
                    <span className={cn("text-lg font-bold", cfg.text)}>
                      {room.changeRate}%
                    </span>
                  </div>
                  <Progress value={room.changeRate} className="mt-2 h-1.5" />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {room.details.map((d) => (
                      <span
                        key={d}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={resetAnalysis}>
              다시 분석
            </Button>
            <Button className="flex-1 gap-2" asChild>
              <Link href="/analysis">
                <ZoomIn className="size-4" />
                상세 분석 보기
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── PHOTO REPORT SECTION ─── */

interface ReportSample {
  id: number
  property: string
  date: string
  overallChange: number
  status: "completed" | "generating"
  rooms: { name: string; changeRate: number; severity: "low" | "medium" | "high"; finding: string }[]
}

const sampleReports: ReportSample[] = [
  {
    id: 1,
    property: "강남구 역삼동 오피스텔",
    date: "2026.02.18",
    overallChange: 22.7,
    status: "completed",
    rooms: [
      { name: "거실", changeRate: 12.4, severity: "low", finding: "벽면 경미한 오염" },
      { name: "주방", changeRate: 28.7, severity: "medium", finding: "싱크대 주변 변색" },
      { name: "화장실", changeRate: 45.3, severity: "high", finding: "타일 균열 발견" },
    ],
  },
  {
    id: 2,
    property: "마포구 합정동 투룸",
    date: "2026.02.16",
    overallChange: 15.2,
    status: "completed",
    rooms: [
      { name: "거실", changeRate: 10.1, severity: "low", finding: "벽지 일부 변색" },
      { name: "침실", changeRate: 20.3, severity: "medium", finding: "바닥 스크래치" },
    ],
  },
  {
    id: 3,
    property: "성동구 성수동 원룸",
    date: "2026.02.20",
    overallChange: 0,
    status: "generating",
    rooms: [],
  },
]

function PhotoReportDemo() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selected = sampleReports.find((r) => r.id === selectedId) ?? null

  return (
    <div className="space-y-6">
      {/* Report list */}
      <div className="space-y-3">
        {sampleReports.map((report) => {
          const isActive = selectedId === report.id
          return (
            <button
              key={report.id}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all",
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/50 bg-card hover:bg-muted/30 hover:border-border"
              )}
              onClick={() =>
                setSelectedId(isActive ? null : report.id)
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    report.status === "completed"
                      ? "bg-primary/10"
                      : "bg-accent/20"
                  )}
                >
                  {report.status === "completed" ? (
                    <FileText className="size-5 text-primary" />
                  ) : (
                    <Clock className="size-5 animate-spin text-accent-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {report.property}
                  </p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {report.status === "completed" ? (
                  <span
                    className={cn(
                      "text-lg font-bold",
                      report.overallChange > 20
                        ? "text-destructive"
                        : report.overallChange > 10
                          ? "text-accent-foreground"
                          : "text-primary"
                    )}
                  >
                    {report.overallChange}%
                  </span>
                ) : (
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                    생성중
                  </Badge>
                )}
                <ChevronRight
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    isActive && "rotate-90"
                  )}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Report detail */}
      {selected && selected.status === "completed" && (
        <div className="space-y-4 rounded-2xl border border-primary/20 bg-card p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-foreground">{selected.property}</h3>
              <p className="text-xs text-muted-foreground">
                {selected.date} 분석 완료
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">평균 변화율</p>
              <p className="text-2xl font-bold text-primary">
                {selected.overallChange}%
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              본 보고서는 AI 분석 결과에 기반한 참고 자료이며, 법적 구속력을
              가지지 않습니다.
            </p>
          </div>

          {/* Room summary */}
          <div className="space-y-2">
            {selected.rooms.map((room) => {
              const cfg = severityConfig[room.severity]
              return (
                <div
                  key={room.name}
                  className="flex items-center justify-between rounded-lg bg-muted/40 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {room.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(cfg.bg, cfg.text, "text-[10px]")}
                    >
                      {cfg.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {room.finding}
                    </span>
                  </div>
                  <span className={cn("text-sm font-bold", cfg.text)}>
                    {room.changeRate}%
                  </span>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 gap-1.5">
              <Download className="size-3.5" />
              PDF 다운로드
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Printer className="size-3.5" />
              인쇄
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Share2 className="size-3.5" />
              공유
            </Button>
          </div>
        </div>
      )}

      {/* Link to full reports */}
      <Button variant="outline" className="w-full gap-2" asChild>
        <Link href="/reports">
          <Eye className="size-4" />
          전체 보고서 보기
        </Link>
      </Button>
    </div>
  )
}

/* ─── MAIN EXPORT ─── */

export function LandingFeatureShowcase() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">
          핵심 서비스 체험하기
        </h2>
        <p className="text-sm text-muted-foreground">
          사진등록부터 AI 비교분석, 보고서 생성까지 전 과정을 미리 체험해 보세요
        </p>
      </div>

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/80">
          <TabsTrigger
            value="register"
            className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Camera className="size-3.5" />
            <span className="hidden sm:inline">사진등록</span>
            <span className="sm:hidden">등록</span>
          </TabsTrigger>
          <TabsTrigger
            value="compare"
            className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ArrowLeftRight className="size-3.5" />
            <span className="hidden sm:inline">사진비교</span>
            <span className="sm:hidden">비교</span>
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="size-3.5" />
            <span className="hidden sm:inline">사진보고서</span>
            <span className="sm:hidden">보고서</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="register">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Camera className="size-4 text-primary" />
                  </div>
                  사진 등록
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  입주 전/퇴거 전 공간 사진을 등록하여 AI 분석 기초 데이터를 준비합니다
                </p>
              </CardHeader>
              <CardContent>
                <PhotoRegistrationDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compare">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <ArrowLeftRight className="size-4 text-primary" />
                  </div>
                  AI 전후 비교 분석
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  입주 전후 사진을 AI가 정밀 비교하여 변화 영역과 변화율을 분석합니다
                </p>
              </CardHeader>
              <CardContent>
                <PhotoComparisonDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-4 text-primary" />
                  </div>
                  분석 보고서
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  AI 분석 결과를 공간별 정량 보고서로 확인하고 PDF 다운로드, 공유가 가능합니다
                </p>
              </CardHeader>
              <CardContent>
                <PhotoReportDemo />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
