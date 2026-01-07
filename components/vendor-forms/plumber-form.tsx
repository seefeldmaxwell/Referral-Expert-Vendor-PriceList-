import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { GeneralContactInfo } from "./general-contact-info"

export function PlumberForm() {
  return (
    <div className="space-y-6">
      <GeneralContactInfo />
      <div className="space-y-2">
        <Label>Do you charge a service fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="service-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="plumber-service-fee-yes" />
              <Label htmlFor="plumber-service-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="plumber-service-fee-no" />
              <Label htmlFor="plumber-service-fee-no">No</Label>
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
              <RadioGroupItem value="yes" id="plumber-emergency-fee-yes" />
              <Label htmlFor="plumber-emergency-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="plumber-emergency-fee-no" />
              <Label htmlFor="plumber-emergency-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="emergency-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="emergency">Emergency Services Rates</Label>
        <Textarea
          name="emergency-rates"
          id="emergency"
          placeholder="Describe rates for emergency repairs or off-hours service."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="water-heater">Water heater installation (electric)</Label>
          <Input name="water-heater" id="water-heater" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leak-detection">Water leak detection (2000 sqft home)</Label>
          <Input name="leak-detection" id="leak-detection" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sewer-inspection">Sewer Line Inspection with report</Label>
          <Input name="sewer-inspection" id="sewer-inspection" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plumber-ptrap">Kitchen sink p-trap replacement</Label>
          <Input name="plumber-ptrap" id="plumber-ptrap" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="snaking">Snaking the sewer line (single clogged bathroom)</Label>
          <Input name="snaking" id="snaking" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trenching">Trenching per Lf</Label>
          <Input name="trenching" id="trenching" type="number" placeholder="Price" />
        </div>
      </div>
    </div>
  )
}
