"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"

interface FollowUpSectionProps {
  num: number
  defaultDate?: Date
  defaultNotes?: string
}

export function FollowUpSection({ num, defaultDate, defaultNotes = "" }: FollowUpSectionProps) {
  const [date, setDate] = useState(defaultDate ? new Date(defaultDate).toISOString().split("T")[0] : "")

  const handleSetToday = () => {
    const today = new Date().toISOString().split("T")[0]
    setDate(today)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
      <div className="md:col-span-1 space-y-2">
        <Label htmlFor={`follow_up_${num}_date`}>Follow Up #{num} Date</Label>
        <div className="flex items-center gap-2">
          <Input
            id={`follow_up_${num}_date`}
            name={`follow_up_${num}_date`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button type="button" variant="outline" size="icon" onClick={handleSetToday} title="Set to today">
            <CalendarPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor={`follow_up_${num}_notes`}>Notes</Label>
        <Textarea
          id={`follow_up_${num}_notes`}
          name={`follow_up_${num}_notes`}
          placeholder={`Notes for follow up #${num}...`}
          defaultValue={defaultNotes}
          rows={2}
        />
      </div>
    </div>
  )
}
