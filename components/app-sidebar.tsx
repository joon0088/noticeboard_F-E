"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Settings,
  UserCircle,
  LogIn,
  UserPlus,
  ScanSearch,
  FileText,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  isLoggedIn?: boolean
}

const publicNav = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/properties", label: "매물보기", icon: Building2 },
]

const authNav = [
  { href: "/login", label: "로그인", icon: LogIn },
  { href: "/signup", label: "회원가입", icon: UserPlus },
]

const loggedInNav = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/properties", label: "매물보기", icon: Building2 },
  { href: "/properties/manage", label: "매물관리", icon: ClipboardList },
  { href: "/registration/move-in", label: "입주전등록", icon: Home },
  { href: "/registration/move-out", label: "퇴거전등록", icon: LogOut },
  { href: "/analysis", label: "AI 전후비교분석", icon: ScanSearch },
  { href: "/reports", label: "분석보고서", icon: FileText },
]

const userNav = [
  { href: "/settings", label: "사용자설정", icon: Settings },
  { href: "/profile", label: "회원정보수정", icon: UserCircle },
]

export function AppSidebar({ isLoggedIn = false }: AppSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = isLoggedIn ? loggedInNav : publicNav
  const bottomItems = isLoggedIn ? userNav : authNav

  return (
    <>
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
            <Building2 className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              다방록
            </h1>
            <p className="text-xs text-muted-foreground">AI 공간분석</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            메뉴
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {isLoggedIn ? "설정" : "계정"}
          </p>
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
