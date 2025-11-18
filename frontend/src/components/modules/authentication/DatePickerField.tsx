import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { type ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, "dateOfBirth">;
}

export function DatePickerField({ field }: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);

  // Get current date without time component (set to midnight to make it usable for comparison)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight to prevent any partial date issues

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="dateOfBirth" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dateOfBirth"
            className="w-full justify-between font-normal"
          >
            {field.value
              ? new Date(field.value).toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            captionLayout="dropdown"
            disabled={(date) => date > currentDate}
            onSelect={(date) => {
              field.onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
