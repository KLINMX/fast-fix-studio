import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingData } from "@/types/booking";
import { Calendar, Clock, Package, DollarSign } from "lucide-react";
import { formatDateDisplay } from "@/lib/services";

interface BookingSummaryProps {
  bookingData: Partial<BookingData>;
}

export const BookingSummary = ({ bookingData }: BookingSummaryProps) => {
  const { service, date, time } = bookingData;

  if (!service && !date && !time) {
    return null;
  }

  return (
    <Card className="p-6 sticky top-4 bg-gradient-to-br from-primary-lighter to-background border-2 border-primary/20">
      <h3 className="text-xl font-bold mb-5 text-foreground">Resumen de Reserva</h3>
      
      <div className="space-y-4">
        {service && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">Servicio</span>
              </div>
              <span className="font-bold text-foreground text-right">{service.name}</span>
            </div>
            <Separator />
          </>
        )}

        {date && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Fecha</span>
              </div>
              <span className="font-bold text-foreground">
                {new Date(date + 'T00:00:00').toLocaleDateString('es-MX', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
            <Separator />
          </>
        )}

        {time && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Hora</span>
              </div>
              <span className="font-bold text-foreground">{time}</span>
            </div>
            <Separator />
          </>
        )}

        {service && (
          <>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-muted-foreground">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">Total</span>
              </div>
              <span className="text-3xl font-black text-primary">${service.price}</span>
            </div>
          </>
        )}
      </div>

      {service && (
        <div className="mt-6 p-4 rounded-lg bg-success-light text-success text-sm font-medium">
          ✓ Duración estimada: {service.duration} minutos
        </div>
      )}
    </Card>
  );
};
