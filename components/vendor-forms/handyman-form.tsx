import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GeneralContactInfo } from "./general-contact-info"

export function HandymanForm() {
  return (
    <div className="space-y-6">
      <GeneralContactInfo />
      <div className="space-y-2">
        <Label>Do you charge a service fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="service-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="service-fee-yes" />
              <Label htmlFor="service-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="service-fee-no" />
              <Label htmlFor="service-fee-no">No</Label>
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
              <RadioGroupItem value="yes" id="emergency-fee-yes" />
              <Label htmlFor="emergency-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="emergency-fee-no" />
              <Label htmlFor="emergency-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="emergency-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="drywall">Replace drywall 8x8 ceiling cavity</Label>
          <Input name="drywall" id="drywall" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="painting">Painting 10x10 Room</Label>
          <Input name="painting" id="painting" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="flooring">Wood/Vinyl floor installation 10x10 room</Label>
          <Input name="flooring" id="flooring" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cabinets">Kitchen Cabinet installation (10x10)</Label>
          <Input name="cabinets" id="cabinets" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ptrap">Kitchen sink p-trap replacement</Label>
          <Input name="ptrap" id="ptrap" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="valve">Angled fixture shut-off valve replacement</Label>
          <Input name="valve" id="valve" type="number" placeholder="Price" />
        </div>
      </div>
    </div>
  )
}
