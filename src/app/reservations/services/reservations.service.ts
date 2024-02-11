import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvailableHour, Reservation, ReservationBody, ReservationsResponse } from '../interfaces/reservations.interfaces';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReservationsService {

  private apiUrl = 'http://localhost:3000/api';

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
