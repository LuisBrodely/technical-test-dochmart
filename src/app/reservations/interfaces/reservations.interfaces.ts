export interface ReservationsResponse {
  _id:            string;
  date:           Date;
  availableHours: AvailableHour[];
  __v:            number;
}

export interface AvailableHour {
  time:         number;
  capacity:     number;
  reservations: Reservation[];
  _id:          string;
}

export interface Reservation {
  _id:   string;
  name:  string;
  email: string;
  phone: string;
  __v:   number;
}

export interface ReservationBody {
  dayId: string;
  hourId: string;
  name:  string;
  email: string;
  phone: string;
}

export interface DaySelected {
  dayId: string;
  dayNumber: number;
}

export interface HourSelected {
  hourId: string;
  hour: string;
}

export interface AddReservation {
  userReservation: Reservation;
   hourId: string;
}
