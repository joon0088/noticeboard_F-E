"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ScanSearch,
  Play,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeftRight,
  Layers,
  BarChart3,
  FileText,
} from "lucide-react"

interface AnalysisResult {
  room: string
  changeRate: number
  severity: "low" | "medium" | "high"
  details: string[]
}

const mockResults: AnalysisResult[] = [
  {
    room: "거실",
    changeRate: 12.4,
    severity: "low",
    details: ["벽면 경미한 오염 발견", "바닥재 상태 양호"],
  },
  {
    room: "주방",
    changeRate: 28.7,
    severity: "medium",
    details: ["싱크대 주변 변색", "타일 그라우트 오염", "환풍기 상태 변화"],
  },
  {
    room: "침실 1",
    changeRate: 8.2,
    severity: "low",
    details: ["벽지 일부 변색", "바닥 상태 양호"],
  },
  {
    room: "화장실",
    changeRate: 45.3,
    severity: "high",
    details: ["타일 균열 발견", "배수구 주변 변색", "거울 교체 필요", "실리콘 변색"],
  },
  {
    room: "베란다",
    changeRate: 18.9,
    severity: "medium",
    details: ["외벽 페인트 벗겨짐", "배수구 이물질"],
  },
]

const severityMap = {
  low: { label: "양호", className: "bg-primary/10 text-primary", color: "text-primary" },
  medium: { label: "주의", className: "bg-accent/20 text-accent-foreground", color: "text-accent" },
  high: { label: "심각", className: "bg-destructive/10 text-destructive", color: "text-destructive" },
}

const properties = [
  "강남구 역삼동 오피스텔",
  "마포구 합정동 투룸",
  "성동구 성수동 원룸",
]

export function AnalysisContent() {
  const [selectedProperty, setSelectedProperty] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<AnalysisResult[] | null>(null)

  function startAnalysis() {
    setAnalyzing(true)
    setProgress(0)
    setResults(null)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setResults(mockResults)
          return 100
        }
        return prev + 2
      })
    }, 80)
  }

  const overallChange =
    results
      ? (results.reduce((sum, r) => sum + r.changeRate, 0) / results.length).toFixed(1)
      : "0"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
          <ScanSearch className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">AI 전후 비교 분석</h1>
          <p className="text-sm text-muted-foreground">
            입주 전후 사진을 AI가 비교 분석하여 변화 영역을 정량적으로 제시합니다
          </p>
        </div>
      </div>

      {/* Property selection and start */}
      <Card className="border-border/50">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-foreground">분석 대상 매물</label>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="매물을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="gap-2"
            size="lg"
            disabled={!selectedProperty || analyzing}
            onClick={startAnalysis}
          >
            {analyzing ? (
              <>
                <Clock className="size-4 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Play className="size-4" />
                AI 분석 시작
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Progress */}
      {analyzing && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">AI 분석 진행 중...</p>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className={progress >= 20 ? "text-primary font-medium" : ""}>
                1. 이미지 정합
              </span>
              <span className={progress >= 40 ? "text-primary font-medium" : ""}>
                2. ROI 탐색
              </span>
              <span className={progress >= 60 ? "text-primary font-medium" : ""}>
                3. 정밀 분할
              </span>
              <span className={progress >= 80 ? "text-primary font-medium" : ""}>
                4. 변화 판단
              </span>
              <span className={progress >= 100 ? "text-primary font-medium" : ""}>
                5. 리포트 생성
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">평균 변화율</p>
                  <p className="text-2xl font-bold text-foreground">{overallChange}%</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/20">
                  <Layers className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">분석 공간</p>
                  <p className="text-2xl font-bold text-foreground">{results.length}개</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="flex items-center gap-3 pt-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="size-5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">주의 필요 영역</p>
                  <p className="text-2xl font-bold text-foreground">
                    {results.filter((r) => r.severity !== "low").length}곳
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Room-by-room results */}
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">공간별 분석 결과</CardTitle>
                <CardDescription>각 공간의 변화율과 상세 내역</CardDescription>
              </div>
              <Button className="gap-2" onClick={() => window.location.href = "/reports"}>
                <FileText className="size-4" />
                보고서 생성
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result) => {
                const severity = severityMap[result.severity]
                return (
                  <div
                    key={result.room}
                    className="rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <ArrowLeftRight className="size-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{result.room}</h4>
                            <Badge variant="secondary" className={severity.className}>
                              {severity.label}
                            </Badge>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {result.details.map((d) => (
                              <span
                                key={d}
                                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${severity.color}`}>
                          {result.changeRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">변화율</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress
                        value={result.changeRate}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
