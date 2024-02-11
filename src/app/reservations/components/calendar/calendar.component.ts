import { Component, OnInit } from '@angular/core';
import { ReservationsResponse } from '../../interfaces/reservations.interfaces';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'reservations-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public days: ReservationsResponse[] = []

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getAllDays()
      .subscribe(days => this.days = days)
  }

  getDayOfMonth(date: Date): number {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    return day
  }

  selectDay(dayId: string) {
  }
}
