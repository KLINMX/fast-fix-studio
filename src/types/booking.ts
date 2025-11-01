export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: string;
}

export interface BookingData {
  service?: Service;
  date?: string;
  time?: string;
  customerName: string;
  phone: string;
  address: string;
  car: string;
}

export interface Booking extends BookingData {
  id: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}
