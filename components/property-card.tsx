"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Maximize } from "lucide-react"

interface PropertyCardProps {
  title: string
  address: string
  price: string
  type: string
  rooms: number
  bathrooms: number
  area: number
  imageColor?: string
  status?: "available" | "occupied" | "pending"
}

const statusMap = {
  available: { label: "공실", className: "bg-primary text-primary-foreground" },
  occupied: { label: "입주중", className: "bg-accent text-accent-foreground" },
  pending: { label: "계약진행중", className: "bg-secondary text-secondary-foreground" },
}

export function PropertyCard({
  title,
  address,
  price,
  type,
  rooms,
  bathrooms,
  area,
  status = "available",
}: PropertyCardProps) {
  const statusInfo = statusMap[status]

  return (
    <Card className="group cursor-pointer overflow-hidden border-border/50 transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* Image placeholder with gradient */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Maximize className="size-8 opacity-40" />
            <span className="text-xs opacity-60">{area}m&sup2;</span>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
          <Badge variant="secondary" className="bg-card/90 text-card-foreground backdrop-blur-sm">{type}</Badge>
        </div>
      </div>
      <CardContent className="space-y-3 pt-4">
        <div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {address}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="size-3.5" />
            <span>{rooms}실</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="size-3.5" />
            <span>{bathrooms}개</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="size-3.5" />
            <span>{area}m&sup2;</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <p className="text-lg font-bold text-primary">{price}</p>
          <span className="text-xs text-muted-foreground">월세</span>
        </div>
      </CardContent>
    </Card>
  )
}
