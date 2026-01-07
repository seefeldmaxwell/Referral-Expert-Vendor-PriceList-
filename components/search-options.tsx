import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchOptions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
      <Input placeholder="Area of service" className="w-full sm:w-auto" />
      <Input placeholder="Name of Business" className="w-full sm:w-auto" />
      <Input placeholder="Representative" className="w-full sm:w-auto" />
      <Button>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
