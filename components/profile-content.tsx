"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  UserCircle,
  Camera,
  Save,
  Mail,
  Phone,
  MapPin,
  Building2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react"

export function ProfileContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
          <UserCircle className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">회원정보 수정</h1>
          <p className="text-sm text-muted-foreground">
            개인정보와 계정 정보를 관리합니다
          </p>
        </div>
      </div>

      {/* Profile avatar section */}
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:items-start">
          <div className="relative">
            <Avatar className="size-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                HCT
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground"
              aria-label="Change profile photo"
            >
              <Camera className="size-4" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-foreground">홍길동</h2>
            <p className="text-sm text-muted-foreground">hong@example.com</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge className="bg-primary/10 text-primary">임차인</Badge>
              <Badge variant="secondary">가입일: 2025.12.01</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">기본 정보</CardTitle>
          <CardDescription>이름, 연락처 등 기본 정보를 수정합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" defaultValue="홍길동" className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">회원 유형</Label>
              <Select defaultValue="tenant">
                <SelectTrigger id="userType" className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">임차인</SelectItem>
                  <SelectItem value="landlord">임대인</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              <span className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                이메일
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="hong@example.com"
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                연락처
              </span>
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue="010-1234-5678"
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                주소
              </span>
            </Label>
            <Input
              id="address"
              defaultValue="서울 강남구 역삼동 123-45"
              className="bg-secondary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Associated property */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" />
            <CardTitle className="text-base">연관 매물</CardTitle>
          </div>
          <CardDescription>현재 연관된 매물 정보입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 bg-muted/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">강남구 역삼동 오피스텔</p>
                <p className="text-xs text-muted-foreground">
                  서울 강남구 역삼동 123-45 / 월 85만원
                </p>
              </div>
              <Badge className="bg-primary/10 text-primary">입주 중</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password change */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-4 text-primary" />
            <CardTitle className="text-base">비밀번호 변경</CardTitle>
          </div>
          <CardDescription>보안을 위해 주기적으로 비밀번호를 변경해 주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPw">현재 비밀번호</Label>
            <div className="relative">
              <Input
                id="currentPw"
                type={showPassword ? "text" : "password"}
                placeholder="현재 비밀번호를 입력하세요"
                className="bg-secondary pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPw">새 비밀번호</Label>
            <div className="relative">
              <Input
                id="newPw"
                type={showNewPassword ? "text" : "password"}
                placeholder="새 비밀번호를 입력하세요"
                className="bg-secondary pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPw">새 비밀번호 확인</Label>
            <Input
              id="confirmPw"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              className="bg-secondary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline">취소</Button>
        <Button className="gap-2">
          <Save className="size-4" />
          변경사항 저장
        </Button>
      </div>
    </div>
  )
}
