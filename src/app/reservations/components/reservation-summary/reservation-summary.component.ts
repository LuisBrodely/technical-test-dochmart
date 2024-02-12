import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../interfaces/reservations.interfaces';

@Component({
  selector: 'reservations-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {

  public reservationInfo?: Reservation;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.reservationAdded.subscribe(({ userReservation }) => {
      this.reservationInfo = userReservation
    });
  }

}
