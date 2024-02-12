import { Component, Input, OnInit } from '@angular/core';
import { PersoAvailableHour, PersoReservationsResponse, ReservationsResponse } from '../../interfaces/reservations.interfaces';
import { ReservationsService } from '../../services/reservations.service';
import { convertTo12HourFormat, getDayOfMonth } from '../../util/util';

@Component({
  selector: 'user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css'],
})
export class UserReservationsComponent implements OnInit {

  @Input() public name: string = '';
  @Input() public email: string = '';

  allDays: PersoReservationsResponse[] = [];
  buttonPressed : boolean = false;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.reservationAdded.subscribe(({ userReservation }) => {
      if (this.buttonPressed && userReservation.name === this.name) {
        this.searchReservations(userReservation.name, userReservation.email);
      } else {
        this.buttonPressed = false;
        this.allDays = []
      }
    });
  }

  searchReservations(name: string, email: string) {
    this.reservationsService.getAllDays()
      .subscribe(days => {
        const reservationsFound = this.findReservationsByName(days, name, email)
        this.allDays = reservationsFound;
        this.buttonPressed = true;
      });
  }

  hideReservations() {
    this.buttonPressed = false;
    this.allDays = []
  }

  findReservationsByName(data: ReservationsResponse[], name: string, email: string) {
    const reservations: PersoReservationsResponse[] = [];
    debugger
    data.forEach((response) => {
      const date = response.date;
      const reservationHours: PersoAvailableHour[] = [];

      response.availableHours.forEach((hour) => {
        const matchingReservations = hour.reservations.filter(
          (reservation) => reservation.name === name
        );

        if (matchingReservations.length > 0) {
          reservationHours.push({
            time: hour.time,
            reservations: matchingReservations,
          });
        }
      });

      if (reservationHours.length > 0) {
        reservations.push({
          date: date,
          reservationHours: reservationHours,
        });
      }
      console.log({reservationHours})
    });

    return reservations;
  }

  getDayOfMonth(date: Date): number {
    return getDayOfMonth(date);
  }

  convertTo12HourFormat(hour24: number): string {
    return convertTo12HourFormat(hour24)
  }
}
