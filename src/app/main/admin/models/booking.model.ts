export interface Booking {
  room_id: string;
  room_type: string;
  rate: number;
  booking_timestamp: string;
  check_in: string;
  check_out: string;
  booking_from: string;
  booking_to: string;
  occupancy: number;
  customer_types: string[];
  total_nights: number;
  total_cost: number;
}
