import { Service } from "@/types/booking";

export const SERVICES: Service[] = [
  {
    id: "basico",
    name: "Lavado Básico",
    description: "Lavado exterior e interior estándar",
    price: 150,
    duration: 30,
    icon: "🚗",
  },
  {
    id: "completo",
    name: "Lavado Completo",
    description: "Lavado profundo + aspirado + encerado",
    price: 280,
    duration: 60,
    icon: "✨",
  },
  {
    id: "premium",
    name: "Lavado Premium",
    description: "Todo incluido + protección de pintura",
    price: 450,
    duration: 90,
    icon: "💎",
  },
  {
    id: "detallado",
    name: "Detallado Completo",
    description: "Servicio premium total con detallado profundo",
    price: 800,
    duration: 180,
    icon: "👑",
  },
];

export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

export const generateAvailableDates = (daysAhead: number = 7): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

export const formatDateDisplay = (dateStr: string): { day: string; label: string } => {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  let label = '';
  if (diffDays === 0) label = 'HOY';
  else if (diffDays === 1) label = 'MAÑANA';
  else label = date.toLocaleDateString('es-MX', { weekday: 'short' }).toUpperCase();
  
  const day = date.getDate().toString();
  
  return { day, label };
};
