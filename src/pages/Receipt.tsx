import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Share2, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Receipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Simulate loading booking data
    setTimeout(() => {
      setBooking({
        id: id,
        date: "2025-01-15",
        time: "10:00",
        customerName: "Juan Pérez",
        phone: "55 1234 5678",
        address: "Calle Principal #123, Col. Centro",
        car: "Toyota Corolla 2020",
        service: "Lavado Completo",
        duration: 60,
        price: 280,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Enlace copiado al portapapeles");
  };

  const handleDownload = () => {
    toast.success("Descargando recibo...");
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Card className="p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Cargando recibo...</p>
        </Card>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold mb-2">Recibo No Encontrado</h2>
          <p className="text-muted-foreground mb-6">
            No pudimos encontrar la información de esta reservación.
          </p>
          <Button onClick={() => navigate("/")} className="btn-hero">
            Ir a Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const verificationCode = `AWP-${booking.id?.slice(-6).toUpperCase()}`;

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Card className="p-8 fade-in">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-2xl shadow-lg">
                AW
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AutoWash Pro</h1>
                <p className="text-muted-foreground">
                  Recibo #{booking.id?.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                Fecha de Reserva
              </div>
              <div className="font-bold text-lg text-foreground">
                {new Date(booking.date + "T00:00:00").toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="font-bold text-foreground">{booking.time}</div>
              <Badge className="mt-2 bg-success text-success-foreground">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Confirmada
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Customer Info */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">
              Información del Cliente
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Nombre Completo</span>
                <span className="font-bold text-foreground">{booking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Teléfono</span>
                <span className="font-bold text-foreground">{booking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Dirección</span>
                <span className="font-bold text-foreground text-right max-w-xs">
                  {booking.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Vehículo</span>
                <span className="font-bold text-foreground">{booking.car}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Service Info */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">
              Detalles del Servicio
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Servicio</span>
                <span className="font-bold text-foreground">{booking.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-medium">Duración Estimada</span>
                <span className="font-bold text-foreground">{booking.duration} min</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <Card className="p-6 bg-gradient-to-br from-primary-lighter to-background border-2 border-primary mb-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-foreground">Total a Pagar</span>
              <span className="text-4xl font-black text-primary">${booking.price}</span>
            </div>
          </Card>

          {/* Verification Code */}
          <div className="text-center mb-8 p-6 bg-muted/50 rounded-lg">
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-2">
              Código de Verificación
            </div>
            <div className="text-3xl font-black text-foreground tracking-wider font-mono">
              {verificationCode}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleDownload} className="flex-1 btn-hero h-12">
              <Download className="mr-2 h-5 w-5" />
              Descargar PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1 h-12">
              <Share2 className="mr-2 h-5 w-5" />
              Compartir
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 h-12"
            >
              Nueva Reserva
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-success-light text-success text-center rounded-lg text-sm font-medium">
            <strong>¡Gracias por tu preferencia!</strong>
            <br />
            Conserva este recibo como comprobante de tu reservación.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Receipt;
