import PriceListQuestionnaire from "@/components/price-list-questionnaire"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 min-h-screen" style={{ backgroundColor: "#003366" }}>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <PriceListQuestionnaire />
        </div>
      </main>
    </div>
  )
}
