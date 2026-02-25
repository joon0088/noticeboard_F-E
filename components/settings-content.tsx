"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings, Bell, Shield, Palette, Globe } from "lucide-react"

export function SettingsContent() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
          <Settings className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">사용자 설정</h1>
          <p className="text-sm text-muted-foreground">앱의 환경 설정을 관리합니다</p>
        </div>
      </div>

      {/* Notifications */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <CardTitle className="text-base">알림 설정</CardTitle>
          </div>
          <CardDescription>알림 수신 방식을 설정합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>이메일 알림</Label>
              <p className="text-xs text-muted-foreground">분석 완료 시 이메일로 알림을 받습니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>푸시 알림</Label>
              <p className="text-xs text-muted-foreground">브라우저 푸시 알림을 받습니다</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>보고서 알림</Label>
              <p className="text-xs text-muted-foreground">새 보고서 생성 시 알림을 받습니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>마케팅 알림</Label>
              <p className="text-xs text-muted-foreground">서비스 업데이트 및 프로모션 정보를 받습니다</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Display */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-primary" />
            <CardTitle className="text-base">디스플레이</CardTitle>
          </div>
          <CardDescription>화면 표시 설정을 관리합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>테마</Label>
            <Select defaultValue="light">
              <SelectTrigger className="w-40 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">라이트</SelectItem>
                <SelectItem value="dark">다크</SelectItem>
                <SelectItem value="system">시스템</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>컴팩트 모드</Label>
              <p className="text-xs text-muted-foreground">화면 요소를 작게 표시합니다</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <CardTitle className="text-base">언어 및 지역</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>언어</Label>
            <Select defaultValue="ko">
              <SelectTrigger className="w-40 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <CardTitle className="text-base">개인정보 및 보안</CardTitle>
          </div>
          <CardDescription>데이터 보호 및 보안 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>2단계 인증</Label>
              <p className="text-xs text-muted-foreground">로그인 시 추가 인증을 사용합니다</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>데이터 자동 삭제</Label>
              <p className="text-xs text-muted-foreground">5년 후 이미지 데이터를 자동 삭제합니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="pt-2">
            <Button variant="destructive" className="w-full">
              계정 삭제
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
