export interface Room {
  id: number;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  available: boolean;
}

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: number;
  customerId: number;
  customerName: string;
  roomId: number;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  cancelled: boolean;
  totalPrice: number;
}
