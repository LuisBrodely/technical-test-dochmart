import { Component, OnInit } from '@angular/core';
import { ReservationsResponse } from '../../interfaces/reservations.interfaces';
import { ReservationsService } from '../../services/reservations.service';
import { getDayOfMonth } from '../../util/util';

@Component({
  selector: 'reservations-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  public days: ReservationsResponse[] = []

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getAllDays()
      .subscribe(days => {
        this.days = days
      })
    this.reservationsService.reservationAdded.subscribe(() => {
      this.loadDays();
    });
  }

  selectDay(dayId: string, dayNumber: number) {
    this.reservationsService.daySelected.emit({ dayId, dayNumber })
  }

  isFullyBooked(dayIndex: number): boolean {
    return this.days[dayIndex].availableHours.every(hour => hour.reservations.length > 0);
  }

  loadDays(): void {
    this.reservationsService.getAllDays()
      .subscribe(days => {
        this.days = days;
      });
  }

  getDayOfMonth(date: Date): number {
    return getDayOfMonth(date);
  }

}
