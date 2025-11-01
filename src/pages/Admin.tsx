import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Search, Trash2, Calendar, DollarSign, Package } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([
    {
      id: "1",
      date: "2025-01-15",
      time: "10:00",
      customerName: "Juan Pérez",
      phone: "55 1234 5678",
      service: "Lavado Completo",
      price: 280,
      status: "confirmed" as const,
    },
    {
      id: "2",
      date: "2025-01-15",
      time: "14:00",
      customerName: "María González",
      phone: "55 8765 4321",
      service: "Lavado Premium",
      price: 450,
      status: "confirmed" as const,
    },
  ]);

  const stats = {
    total: bookings.length,
    today: bookings.filter((b) => b.date === new Date().toISOString().split("T")[0]).length,
    revenue: bookings.reduce((sum, b) => sum + b.price, 0),
  };

  const filteredBookings = bookings.filter((booking) =>
    [booking.customerName, booking.phone, booking.service]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      setBookings(bookings.filter((b) => b.id !== id));
      toast.success("Reserva eliminada");
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-primary-foreground font-black text-2xl shadow-lg">
                  AW
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Panel de Administración
                  </h1>
                  <p className="text-muted-foreground font-medium">AutoWash Pro</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                ← Volver a Inicio
              </Button>
            </div>
          </Card>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Total Reservas
              </span>
            </div>
            <div className="text-3xl font-black text-primary">{stats.total}</div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-success" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Reservas Hoy
              </span>
            </div>
            <div className="text-3xl font-black text-success">{stats.today}</div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Ingresos Totales
              </span>
            </div>
            <div className="text-3xl font-black text-foreground">${stats.revenue}</div>
          </Card>
        </div>

        {/* Table */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">Reservaciones Recientes</h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por cliente, teléfono o servicio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">Fecha</TableHead>
                  <TableHead className="font-bold">Hora</TableHead>
                  <TableHead className="font-bold">Cliente</TableHead>
                  <TableHead className="font-bold">Servicio</TableHead>
                  <TableHead className="font-bold">Precio</TableHead>
                  <TableHead className="font-bold">Estado</TableHead>
                  <TableHead className="font-bold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      {searchQuery ? "No se encontraron resultados" : "No hay reservaciones"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {new Date(booking.date + "T00:00:00").toLocaleDateString("es-MX")}
                      </TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">{booking.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell className="font-bold text-primary">${booking.price}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>
                          {booking.status === "confirmed" ? "Confirmada" : "Cancelada"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(booking.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
