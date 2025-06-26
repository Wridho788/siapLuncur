import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { Card, CardContent } from "@ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-heading text-primary">Coba Komponen</h1>
          <Input placeholder="Nama bisnis kamu" />
          <Button variant="default">Daftar Sekarang</Button>
        </CardContent>
      </Card>
    </div>
  )
}
