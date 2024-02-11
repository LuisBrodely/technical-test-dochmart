import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableHour } from '../../interfaces/reservations.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reservations-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public availableHours: AvailableHour[] = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.daySelected.subscribe(dayId => {
      console.log(dayId)
      this.reservationsService.getHoursForDayId(dayId)
        .subscribe(availableHours => {
          this.availableHours = availableHours
          console.log({ availableHours })
        })
    })
  }

  convertTo12HourFormat(hour24: number): string {
    if (hour24 < 1 || hour24 > 24) {
      return "Invalid hour";
    }
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const period = hour24 < 12 ? "AM" : "PM";
    return hour12 + ":00 " + period;
  }

}
