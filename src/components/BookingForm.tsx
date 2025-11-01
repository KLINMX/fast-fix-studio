import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookingData } from "@/types/booking";
import { Loader2, User, Phone, MapPin, Car } from "lucide-react";

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
  initialData?: Partial<BookingData>;
  isLoading?: boolean;
}

export const BookingForm = ({ onSubmit, initialData, isLoading }: BookingFormProps) => {
  const [formData, setFormData] = useState<Partial<BookingData>>(initialData || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as BookingData);
  };

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="customerName" className="flex items-center gap-2 mb-2 font-semibold">
            <User className="h-4 w-4 text-primary" />
            Nombre Completo
          </Label>
          <Input
            id="customerName"
            type="text"
            placeholder="Juan Pérez García"
            value={formData.customerName || ""}
            onChange={(e) => handleChange("customerName", e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2 font-semibold">
            <Phone className="h-4 w-4 text-primary" />
            Teléfono
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="55 1234 5678"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="address" className="flex items-center gap-2 mb-2 font-semibold">
            <MapPin className="h-4 w-4 text-primary" />
            Dirección
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Calle Principal #123, Col. Centro"
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="car" className="flex items-center gap-2 mb-2 font-semibold">
            <Car className="h-4 w-4 text-primary" />
            Vehículo (Marca y Modelo)
          </Label>
          <Input
            id="car"
            type="text"
            placeholder="Toyota Corolla 2020"
            value={formData.car || ""}
            onChange={(e) => handleChange("car", e.target.value)}
            required
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-bold btn-hero"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            "Confirmar Reservación"
          )}
        </Button>
      </form>
    </Card>
  );
};
