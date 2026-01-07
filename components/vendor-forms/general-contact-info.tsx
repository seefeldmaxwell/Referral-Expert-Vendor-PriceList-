import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function GeneralContactInfo() {
  return (
    <>
      <h3 className="text-xl font-semibold text-slate-700 mb-6 border-b pb-2">Contact & Business Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input name="name" id="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone # (Optional)</Label>
          <Input name="phone" id="phone" type="tel" placeholder="(123) 456-7890" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input name="email" id="email" type="email" placeholder="john.doe@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name (Optional)</Label>
          <Input name="business-name" id="business-name" placeholder="ACME Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Based out of (Location)</Label>
          <Input name="location" id="location" placeholder="Miami, FL" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="work-area">Area of work (radius)</Label>
          <Input name="work-area" id="work-area" placeholder="e.g., 50 miles" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="specialty">Specialty (What do you love doing)</Label>
          <Textarea name="specialty" id="specialty" placeholder="e.g., Custom kitchen remodels" />
        </div>
        <div className="space-y-2">
          <Label>Licensed</Label>
          <RadioGroup defaultValue="yes" name="licensed" className="flex items-center space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="licensed-yes" />
              <Label htmlFor="licensed-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="licensed-no" />
              <Label htmlFor="licensed-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="border-t -mx-6 my-6" />
      <h3 className="text-xl font-semibold text-slate-700 mb-6 border-b pb-2">Pricing Information (Optional)</h3>
      <p className="text-sm text-slate-600 mb-4">
        Fill out any pricing fields that apply to your services. You can leave fields blank if they don't apply to your
        business.
      </p>
    </>
  )
}
