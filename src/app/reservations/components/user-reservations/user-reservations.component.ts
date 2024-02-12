import { Component, Input, OnInit } from '@angular/core';
import { ReservationsResponse } from '../../interfaces/reservations.interfaces';
import { ReservationsService } from '../../services/reservations.service';
import { convertTo12HourFormat, getDayOfMonth } from '../../util/util';

@Component({
  selector: 'user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css'],
})
export class UserReservationsComponent implements OnInit {

  @Input() public name: string = '';

  allDays: ReservationsResponse[] = [];
  toggleButton: boolean = false;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.reservationAdded.subscribe(({ userReservation }) => {
      if (userReservation.name === this.name) {
        this.searchReservations(userReservation.name)
      } else {
        this.allDays = []
        this.toggleButton = false;
      }
    });
  }

  searchReservations(name: string) {
    if (this.toggleButton) {
      this.allDays = []
      this.toggleButton = false
    } else {
      this.reservationsService.getAllDays()
      .subscribe(days => {
        const reservationsFound = this.findReservationsByName(days, name)
        this.allDays = reservationsFound;
        this.toggleButton = true
      });
    }
  }

  findReservationsByName(data: ReservationsResponse[], name: string) {
    const reservations: any = [];

    data.forEach((response) => {
      const date = response.date;
      const reservationHours: any = [];

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
