import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimeSlotGridProps {
  timeSlots: string[];
  selectedTime?: string;
  onSelectTime: (time: string) => void;
  disabledSlots?: string[];
}

export const TimeSlotGrid = ({
  timeSlots,
  selectedTime,
  onSelectTime,
  disabledSlots = [],
}: TimeSlotGridProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {timeSlots.map((time) => {
        const isSelected = time === selectedTime;
        const isDisabled = disabledSlots.includes(time);
        
        return (
          <Button
            key={time}
            variant={isSelected ? "default" : "outline"}
            disabled={isDisabled}
            className={`h-16 font-semibold transition-all ${
              isSelected
                ? "bg-gradient-to-br from-primary to-primary-hover shadow-lg scale-105"
                : "hover:scale-105 hover:border-primary-light hover:bg-primary-lighter"
            }`}
            onClick={() => onSelectTime(time)}
          >
            <Clock className="h-4 w-4 mr-1.5" />
            {time}
          </Button>
        );
      })}
    </div>
  );
};
