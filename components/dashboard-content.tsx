"use client"

import Link from "next/link"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  ClipboardList,
  FileText,
  ScanSearch,
  ArrowRight,
  TrendingUp,
  Calendar,
  Home,
  LogOut as LogOutIcon,
} from "lucide-react"

const recentActivities = [
  { id: 1, action: "입주전 사진 등록", property: "강남구 역삼동 오피스텔", date: "2026.02.19", type: "move-in" },
  { id: 2, action: "AI 분석 완료", property: "마포구 합정동 투룸", date: "2026.02.18", type: "analysis" },
  { id: 3, action: "보고서 생성", property: "성동구 성수동 원룸", date: "2026.02.17", type: "report" },
  { id: 4, action: "퇴거전 사진 등록", property: "서초구 방배동 쓰리룸", date: "2026.02.16", type: "move-out" },
  { id: 5, action: "매물 등록", property: "종로구 삼청동 스튜디오", date: "2026.02.15", type: "property" },
]

const activityTypeColors: Record<string, string> = {
  "move-in": "bg-primary/10 text-primary",
  "analysis": "bg-accent/20 text-accent-foreground",
  "report": "bg-secondary text-secondary-foreground",
  "move-out": "bg-destructive/10 text-destructive",
  "property": "bg-primary/10 text-primary",
}

const quickActions = [
  { label: "입주전 등록", href: "/registration/move-in", icon: Home, color: "bg-primary text-primary-foreground" },
  { label: "퇴거전 등록", href: "/registration/move-out", icon: LogOutIcon, color: "bg-accent text-accent-foreground" },
  { label: "AI 분석", href: "/analysis", icon: ScanSearch, color: "bg-primary text-primary-foreground" },
  { label: "보고서", href: "/reports", icon: FileText, color: "bg-secondary text-secondary-foreground" },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">안녕하세요, 사용자님</h1>
        <p className="text-muted-foreground">오늘의 매물 관리 현황을 확인하세요</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="등록 매물"
          value="12"
          subtitle="총 매물 수"
          icon={Building2}
          trend="+2 이번 달"
          trendUp
        />
        <StatCard
          title="진행중 분석"
          value="3"
          subtitle="AI 분석 진행중"
          icon={ScanSearch}
          trend="1건 완료 대기"
          trendUp
        />
        <StatCard
          title="생성 보고서"
          value="28"
          subtitle="총 보고서"
          icon={FileText}
          trend="+5 이번 달"
          trendUp
        />
        <StatCard
          title="관리 계약"
          value="8"
          subtitle="활성 계약"
          icon={ClipboardList}
          trend="2건 만료 예정"
          trendUp={false}
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group cursor-pointer border-border/50 transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="flex flex-col items-center gap-3 py-6">
                <div className={`flex size-12 items-center justify-center rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
                  <action.icon className="size-5" />
                </div>
                <span className="text-sm font-medium text-card-foreground">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Card className="border-border/50">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">최근 활동</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              전체보기 <ArrowRight className="size-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-secondary/50 p-3 transition-colors hover:bg-secondary"
                >
                  <Badge
                    variant="secondary"
                    className={activityTypeColors[activity.type]}
                  >
                    {activity.action}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-card-foreground">
                      {activity.property}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">이번 달 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4">
              <TrendingUp className="size-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">매물 분석 현황</p>
                <p className="text-xs text-muted-foreground">이번 달 5건의 분석이 완료되었습니다</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-accent/10 p-4">
              <Calendar className="size-8 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">예정 일정</p>
                <p className="text-xs text-muted-foreground">다가오는 퇴거 일정 2건이 있습니다</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <Building2 className="size-8 text-secondary-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">공실 현황</p>
                <p className="text-xs text-muted-foreground">현재 4개의 공실이 있습니다</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
