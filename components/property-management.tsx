"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  MoreHorizontal,
  MapPin,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Property {
  id: number
  name: string
  address: string
  type: string
  rooms: number
  area: number
  price: string
  status: "available" | "occupied" | "pending"
  tenant?: string
}

const initialProperties: Property[] = [
  { id: 1, name: "강남구 역삼동 오피스텔", address: "서울 강남구 역삼동 123-45", type: "오피스텔", rooms: 1, area: 33, price: "월 85만원", status: "available" },
  { id: 2, name: "마포구 합정동 투룸", address: "서울 마포구 합정동 67-89", type: "아파트", rooms: 2, area: 49, price: "월 75만원", status: "occupied", tenant: "김철수" },
  { id: 3, name: "성동구 성수동 원룸", address: "서울 성동구 성수동 12-34", type: "원룸", rooms: 1, area: 23, price: "월 60만원", status: "available" },
  { id: 4, name: "서초구 방배동 쓰리룸", address: "서울 서초구 방배동 56-78", type: "빌라", rooms: 3, area: 72, price: "월 120만원", status: "pending", tenant: "이영희" },
  { id: 5, name: "종로구 삼청동 스튜디오", address: "서울 종로구 삼청동 90-12", type: "원룸", rooms: 1, area: 19, price: "월 55만원", status: "occupied", tenant: "박민수" },
]

const statusMap = {
  available: { label: "공실", className: "bg-primary/10 text-primary" },
  occupied: { label: "입주중", className: "bg-accent/20 text-accent-foreground" },
  pending: { label: "계약진행중", className: "bg-secondary text-secondary-foreground" },
}

export function PropertyManagement() {
  const [properties, setProperties] = useState(initialProperties)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = properties.filter(
    (p) => p.name.includes(search) || p.address.includes(search)
  )

  function handleAddProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProp: Property = {
      id: properties.length + 1,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      type: formData.get("type") as string,
      rooms: Number(formData.get("rooms")),
      area: Number(formData.get("area")),
      price: formData.get("price") as string,
      status: "available",
    }
    setProperties([...properties, newProp])
    setDialogOpen(false)
  }

  function handleDelete(id: number) {
    setProperties(properties.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="매물 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card pl-10"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              매물 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 매물 등록</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProperty} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prop-name">매물명</Label>
                <Input name="name" id="prop-name" placeholder="예: 강남구 역삼동 오피스텔" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prop-address">주소</Label>
                <Input name="address" id="prop-address" placeholder="상세 주소 입력" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="prop-type">유형</Label>
                  <Input name="type" id="prop-type" placeholder="아파트, 원룸 등" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prop-rooms">방 수</Label>
                  <Input name="rooms" id="prop-rooms" type="number" placeholder="1" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="prop-area">면적(m&sup2;)</Label>
                  <Input name="area" id="prop-area" type="number" placeholder="33" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prop-price">월세</Label>
                  <Input name="price" id="prop-price" placeholder="월 85만원" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prop-desc">비고</Label>
                <Textarea name="description" id="prop-desc" placeholder="추가 정보를 입력하세요" rows={3} />
              </div>
              <Button type="submit" className="w-full">등록하기</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">내 매물 목록</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>매물명</TableHead>
                  <TableHead className="hidden md:table-cell">유형</TableHead>
                  <TableHead className="hidden lg:table-cell">면적</TableHead>
                  <TableHead>월세</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="hidden md:table-cell">임차인</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => {
                  const statusInfo = statusMap[p.status]
                  return (
                    <TableRow key={p.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" />
                            {p.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{p.type}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">{p.area}m&sup2;</TableCell>
                      <TableCell className="font-medium text-primary">{p.price}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusInfo.className}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {p.tenant || "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Actions">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="size-4" /> 상세보기
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="size-4" /> 수정
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(p.id)}
                            >
                              <Trash2 className="size-4" /> 삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
