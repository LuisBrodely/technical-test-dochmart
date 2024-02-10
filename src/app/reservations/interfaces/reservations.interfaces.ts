export interface Welcome {
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
