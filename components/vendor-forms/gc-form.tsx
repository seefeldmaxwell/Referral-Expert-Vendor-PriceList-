import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GeneralContactInfo } from "./general-contact-info"

export function GcForm() {
  return (
    <div className="space-y-6">
      <GeneralContactInfo />
      <div className="space-y-2">
        <Label>Do you charge a service fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="service-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="gc-service-fee-yes" />
              <Label htmlFor="gc-service-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="gc-service-fee-no" />
              <Label htmlFor="gc-service-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="service-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Do you charge an emergency fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="emergency-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="gc-emergency-fee-yes" />
              <Label htmlFor="gc-emergency-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="gc-emergency-fee-no" />
              <Label htmlFor="gc-emergency-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="emergency-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      {[1, 2, 3].map((item) => (
        <div key={item} className="space-y-2">
          <Label>Top Job Specialty #{item}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="md:col-span-1">
              <Input name={`specialty-${item}-description`} placeholder="Job description" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <Input name={`specialty-${item}-from`} type="number" placeholder="Price Range From" />
              <span>-</span>
              <Input name={`specialty-${item}-to`} type="number" placeholder="Price Range To" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
