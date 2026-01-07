import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GeneralContactInfo } from "./general-contact-info"

export function RooferForm() {
  return (
    <div className="space-y-6">
      <GeneralContactInfo />
      <div className="space-y-2">
        <Label>Do you charge a service fee?</Label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <RadioGroup defaultValue="no" name="service-fee" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="roofer-service-fee-yes" />
              <Label htmlFor="roofer-service-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="roofer-service-fee-no" />
              <Label htmlFor="roofer-service-fee-no">No</Label>
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
              <RadioGroupItem value="yes" id="roofer-emergency-fee-yes" />
              <Label htmlFor="roofer-emergency-fee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="roofer-emergency-fee-no" />
              <Label htmlFor="roofer-emergency-fee-no">No</Label>
            </div>
          </RadioGroup>
          <Input name="emergency-fee-amount" type="number" placeholder="If yes, how much?" className="max-w-xs" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground -mt-4">Prices for roofs should include permits and materials.</p>
      <div className="space-y-2">
        <Label>Roof repair Shingles 5x5</Label>
        <div className="flex items-center gap-2">
          <Input name="roof-repair-from" type="number" placeholder="From" />
          <span>-</span>
          <Input name="roof-repair-to" type="number" placeholder="To" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="shingle-3tab">Price per SQ 3 tab Shingle</Label>
          <Input name="shingle-3tab" id="shingle-3tab" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shingle-dim">Price per SQ Dimensional Shingle</Label>
          <Input name="shingle-dim" id="shingle-dim" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tile-sq">Price per SQ Tile</Label>
          <Input name="tile-sq" id="tile-sq" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="metal-sq">Price per SQ Metal</Label>
          <Input name="metal-sq" id="metal-sq" type="number" placeholder="Price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="osb-included">How many OSB boards included in price?</Label>
          <Input name="osb-included" id="osb-included" type="number" placeholder="Number of boards" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="osb-extra">Price for every extra board?</Label>
          <Input name="osb-extra" id="osb-extra" type="number" placeholder="Price" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeframe">Time frame for roof on average (permit to completion)</Label>
        <Input name="timeframe" id="timeframe" placeholder="e.g., 4-6 weeks" />
      </div>
    </div>
  )
}
