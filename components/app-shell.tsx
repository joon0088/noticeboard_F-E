"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AppShellProps {
  children: React.ReactNode
  isLoggedIn?: boolean
  title?: string
}

export function AppShell({ children, isLoggedIn = false, title }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar isLoggedIn={isLoggedIn} />
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm lg:px-8">
          <div className="flex items-center gap-4 pl-10 lg:pl-0">
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="검색..."
                className="w-64 rounded-full border-border bg-secondary pl-10"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
            </Button>
            {isLoggedIn && (
              <Avatar className="size-8 border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  HCT
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
