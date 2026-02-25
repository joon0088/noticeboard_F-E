"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Share2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Report {
  id: number
  property: string
  date: string
  overallChange: number
  status: "completed" | "pending" | "generating"
  rooms: {
    name: string
    changeRate: number
    severity: "low" | "medium" | "high"
    findings: string[]
  }[]
}

const reports: Report[] = [
  {
    id: 1,
    property: "강남구 역삼동 오피스텔",
    date: "2026.02.18",
    overallChange: 22.7,
    status: "completed",
    rooms: [
      { name: "거실", changeRate: 12.4, severity: "low", findings: ["벽면 경미한 오염", "바닥재 양호"] },
      { name: "주방", changeRate: 28.7, severity: "medium", findings: ["싱크대 주변 변색", "타일 오염"] },
      { name: "화장실", changeRate: 45.3, severity: "high", findings: ["타일 균열", "실리콘 변색"] },
    ],
  },
  {
    id: 2,
    property: "마포구 합정동 투룸",
    date: "2026.02.16",
    overallChange: 15.2,
    status: "completed",
    rooms: [
      { name: "거실", changeRate: 10.1, severity: "low", findings: ["벽지 일부 변색"] },
      { name: "침실", changeRate: 20.3, severity: "medium", findings: ["바닥 스크래치"] },
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
  {
    id: 4,
    property: "서초구 방배동 쓰리룸",
    date: "2026.02.14",
    overallChange: 8.5,
    status: "completed",
    rooms: [
      { name: "거실", changeRate: 5.2, severity: "low", findings: ["상태 양호"] },
      { name: "침실 1", changeRate: 8.3, severity: "low", findings: ["벽지 미세 변색"] },
      { name: "침실 2", changeRate: 12.0, severity: "medium", findings: ["창문 실리콘 변색"] },
    ],
  },
]

const statusMap = {
  completed: { label: "완료", icon: CheckCircle2, className: "bg-primary/10 text-primary" },
  pending: { label: "대기", icon: Calendar, className: "bg-secondary text-secondary-foreground" },
  generating: { label: "생성중", icon: TrendingUp, className: "bg-accent/20 text-accent-foreground" },
}

const severityMap = {
  low: { label: "양호", className: "bg-primary/10 text-primary" },
  medium: { label: "주의", className: "bg-accent/20 text-accent-foreground" },
  high: { label: "심각", className: "bg-destructive/10 text-destructive" },
}

export function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
          <FileText className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">분석 보고서</h1>
          <p className="text-sm text-muted-foreground">
            AI 분석 결과를 보고서 형태로 확인하고 공유할 수 있습니다
          </p>
        </div>
      </div>

      {/* Reports table */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">보고서 목록</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>매물</TableHead>
                  <TableHead>분석일</TableHead>
                  <TableHead>평균 변화율</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="w-24">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const status = statusMap[report.status]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={report.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="size-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{report.property}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.date}</TableCell>
                      <TableCell>
                        {report.status === "completed" ? (
                          <span className={`font-semibold ${report.overallChange > 20 ? "text-destructive" : report.overallChange > 10 ? "text-accent" : "text-primary"}`}>
                            {report.overallChange}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.className}>
                          <StatusIcon className="mr-1 size-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {report.status === "completed" && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={() => setSelectedReport(report)}
                                    aria-label="View report"
                                  >
                                    <Eye className="size-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <FileText className="size-5 text-primary" />
                                      분석 보고서
                                    </DialogTitle>
                                  </DialogHeader>
                                  {selectedReport && (
                                    <ReportDetail report={selectedReport} />
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="icon-sm" aria-label="Download PDF">
                                <Download className="size-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportDetail({ report }: { report: Report }) {
  return (
    <div className="space-y-6">
      {/* Report header */}
      <div className="rounded-xl bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">분석 대상</p>
            <p className="text-lg font-bold text-foreground">{report.property}</p>
            <p className="text-sm text-muted-foreground">{report.date} 분석 완료</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">평균 변화율</p>
            <p className="text-3xl font-bold text-primary">{report.overallChange}%</p>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          본 보고서는 AI 분석 결과에 기반한 참고 자료이며, 법적 구속력을 가지지 않습니다.
          실제 판단은 현장 확인을 기반으로 하시기 바랍니다.
        </p>
      </div>

      {/* Room details */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">공간별 상세 분석</h3>
        {report.rooms.map((room) => {
          const severity = severityMap[room.severity]
          return (
            <div key={room.name} className="rounded-lg border border-border/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{room.name}</h4>
                  <Badge variant="secondary" className={severity.className}>{severity.label}</Badge>
                </div>
                <span className={`text-lg font-bold ${room.changeRate > 20 ? "text-destructive" : room.changeRate > 10 ? "text-accent" : "text-primary"}`}>
                  {room.changeRate}%
                </span>
              </div>
              <Progress value={room.changeRate} className="mt-2 h-1.5" />
              <div className="mt-3 flex flex-wrap gap-2">
                {room.findings.map((f) => (
                  <span key={f} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2">
          <Download className="size-4" />
          PDF 다운로드
        </Button>
        <Button variant="outline" className="gap-2">
          <Printer className="size-4" />
          인쇄
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="size-4" />
          공유
        </Button>
      </div>
    </div>
  )
}
