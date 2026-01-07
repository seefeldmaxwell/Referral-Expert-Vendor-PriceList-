import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { UserCog } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600">
              <Phone className="h-4 w-4" />
              <span>office@refferalxperts.com</span>
              <span className="hidden md:inline-block">|</span>
              <span className="hidden md:inline-block">{""}</span>
            </div>
            <Link href="/admin">
              <Button variant="outline" size="icon" className="hidden md:inline-flex bg-transparent">
                <UserCog className="h-5 w-5" />
                <span className="sr-only">Admin Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
