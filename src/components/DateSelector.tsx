import { formatDateDisplay } from "@/lib/services";
import { Button } from "@/components/ui/button";

interface DateSelectorProps {
  dates: string[];
  selectedDate?: string;
  onSelectDate: (date: string) => void;
}

export const DateSelector = ({ dates, selectedDate, onSelectDate }: DateSelectorProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
      {dates.map((date) => {
        const { day, label } = formatDateDisplay(date);
        const isSelected = date === selectedDate;
        
        return (
          <Button
            key={date}
            variant={isSelected ? "default" : "outline"}
            className={`min-w-[90px] flex-shrink-0 flex-col h-auto py-4 px-3 transition-all ${
              isSelected
                ? "bg-gradient-to-br from-primary to-primary-hover shadow-lg scale-105"
                : "hover:scale-105 hover:border-primary-light"
            }`}
            onClick={() => onSelectDate(date)}
          >
            <span className={`text-xs font-semibold tracking-wider mb-1 ${
              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}>
              {label}
            </span>
            <span className={`text-2xl font-extrabold ${
              isSelected ? "text-primary-foreground" : "text-foreground"
            }`}>
              {day}
            </span>
          </Button>
        );
      })}
    </div>
  );
};
