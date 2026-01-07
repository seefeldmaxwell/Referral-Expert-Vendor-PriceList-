import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GeneralContactInfo } from "./general-contact-info"

export function HvacForm() {
  return (
    <div className="space-y-6">
      <GeneralContactInfo />
      <div className="space-y-2">
        <Label>Do you charge a service fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="service-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hvac-service-fee-yes" />
              <Label htmlFor="hvac-service-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hvac-service-fee-no" />
              <Label htmlFor="hvac-service-fee-no">No</Label>
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
              <RadioGroupItem value="yes" id="hvac-emergency-fee-yes" />
              <Label htmlFor="hvac-emergency-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hvac-emergency-fee-no" />
              <Label htmlFor="hvac-emergency-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="emergency-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maintenance">Routine Maintenance service</Label>
          <Input name="maintenance" id="maintenance" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ac-install">Air handler and condenser installation (4 ton)</Label>
          <Input name="ac-install" id="ac-install" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ac-line">Clear clogged AC line</Label>
          <Input name="ac-line" id="ac-line" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coil-cleaning">Coil cleaning</Label>
          <Input name="coil-cleaning" id="coil-cleaning" type="number" placeholder="Price" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Duct Cleaning</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="duct-offered" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="duct-offered-yes" />
              <Label htmlFor="duct-offered-yes">Offered</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="duct-offered-no" />
              <Label htmlFor="duct-offered-no">Not Offered</Label>
            </div>
          </RadioGroup>
          <Input name="duct-cleaning" type="number" placeholder="Price?" className="max-w-xs" />
        </div>
      </div>
    </div>
  )
}
