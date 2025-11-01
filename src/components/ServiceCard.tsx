import { Service } from "@/types/booking";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}

export const ServiceCard = ({ service, selected, onSelect }: ServiceCardProps) => {
  return (
    <Card
      className={`service-card relative cursor-pointer p-6 transition-all ${
        selected
          ? "border-primary bg-primary-lighter shadow-lg ring-2 ring-primary"
          : "border-border hover:border-primary-light"
      }`}
      onClick={onSelect}
    >
      {selected && (
        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-md">
          <Check className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-xl text-4xl ${
          selected ? "bg-primary/10" : "bg-muted"
        }`}>
          {service.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-extrabold text-primary">${service.price}</div>
          <div className="text-xs text-muted-foreground font-medium">{service.duration} min</div>
        </div>
      </div>
    </Card>
  );
};
