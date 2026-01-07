"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  name: string
  defaultValue?: number
}

export function StarRating({ name, defaultValue = 0 }: StarRatingProps) {
  const [rating, setRating] = useState(defaultValue)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center space-x-1">
      <input type="hidden" name={name} value={rating} />
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <button
            type="button"
            key={ratingValue}
            className={cn(
              "text-slate-300 transition-colors",
              ratingValue <= (hover || rating) ? "text-amber-400" : "text-slate-300",
            )}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className="h-6 w-6 fill-current" />
            <span className="sr-only">{ratingValue} stars</span>
          </button>
        )
      })}
    </div>
  )
}
