import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/ServiceCard";
import { DateSelector } from "@/components/DateSelector";
import { TimeSlotGrid } from "@/components/TimeSlotGrid";
import { BookingForm } from "@/components/BookingForm";
import { BookingSummary } from "@/components/BookingSummary";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { SERVICES, generateAvailableDates, generateTimeSlots } from "@/lib/services";
import { BookingData } from "@/types/booking";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState<string>();

  const availableDates = generateAvailableDates(7);
  const timeSlots = generateTimeSlots();

  const handleServiceSelect = (serviceId: string) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    setBookingData((prev) => ({ ...prev, service }));
    toast.success(`${service?.name} seleccionado`);
  };

  const handleDateSelect = (date: string) => {
    setBookingData((prev) => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  const handleSubmit = async (formData: BookingData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const newBookingId = `booking_${Date.now()}`;
      setBookingId(newBookingId);
      
      toast.success("¡Reserva confirmada!");
      setShowConfirmation(true);
    } catch (error) {
      toast.error("Error al confirmar la reserva");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.date;
      case 3:
        return !!bookingData.time;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 fade-in">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-2xl shadow-lg">
                AW
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                  AutoWash Pro
                  <Sparkles className="h-6 w-6 text-primary" />
                </h1>
                <p className="text-muted-foreground font-medium">
                  Reserva tu servicio premium en 3 simples pasos
                </p>
              </div>
            </div>
          </Card>
        </header>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            {/* Step 1: Select Service */}
            <Card className="p-6 fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Selecciona tu Servicio</h2>
                  <p className="text-sm text-muted-foreground">Elige el paquete que más te convenga</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={bookingData.service?.id === service.id}
                    onSelect={() => handleServiceSelect(service.id)}
                  />
                ))}
              </div>
            </Card>

            {/* Step 2: Select Date */}
            {isStepComplete(1) && (
              <Card className="p-6 fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
                    2
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Elige la Fecha</h2>
                    <p className="text-sm text-muted-foreground">¿Cuándo te gustaría el servicio?</p>
                  </div>
                </div>
                
                <DateSelector
                  dates={availableDates}
                  selectedDate={bookingData.date}
                  onSelectDate={handleDateSelect}
                />
              </Card>
            )}

            {/* Step 3: Select Time */}
            {isStepComplete(2) && (
              <Card className="p-6 fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
                    3
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Selecciona la Hora</h2>
                    <p className="text-sm text-muted-foreground">Horarios disponibles para tu fecha</p>
                  </div>
                </div>
                
                <TimeSlotGrid
                  timeSlots={timeSlots}
                  selectedTime={bookingData.time}
                  onSelectTime={handleTimeSelect}
                />
              </Card>
            )}

            {/* Step 4: Customer Information */}
            {isStepComplete(3) && (
              <div className="fade-in">
                <Card className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
                      4
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Información de Contacto</h2>
                      <p className="text-sm text-muted-foreground">Completa tus datos para confirmar</p>
                    </div>
                  </div>
                </Card>
                
                <BookingForm
                  onSubmit={(formData) => handleSubmit({ ...bookingData, ...formData } as BookingData)}
                  initialData={bookingData}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="hidden lg:block">
            <BookingSummary bookingData={bookingData} />
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookingId={bookingId}
      />
    </div>
  );
};

export default Index;
