import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddReservation, AvailableHour, DaySelected, HourSelected, Reservation, ReservationBody, ReservationsResponse } from '../interfaces/reservations.interfaces';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReservationsService {

  private apiUrl = 'http://localhost:3000/api';

  @Output() daySelected: EventEmitter<DaySelected> = new EventEmitter()
  @Output() hourSelected: EventEmitter<HourSelected> = new EventEmitter()
  @Output() reservationAdded: EventEmitter<AddReservation> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllDays(): Observable<ReservationsResponse[]> {
    return this.http.get<ReservationsResponse[]>(`${ this.apiUrl }/days`)
  }

  getHoursForDayId(dayId: string): Observable<AvailableHour[]> {
    return this.http.get<AvailableHour[]>(`${ this.apiUrl }/days/${ dayId }`)
  }

  addReservation(reservation: ReservationBody): Observable<Reservation> {
    return this.http.post<Reservation>(`${ this.apiUrl }/reservations/`, reservation)
  }

}
