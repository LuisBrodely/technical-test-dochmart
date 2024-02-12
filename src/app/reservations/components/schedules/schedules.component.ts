import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableHour } from '../../interfaces/reservations.interfaces';
import { convertTo12HourFormat } from '../../util/util';

@Component({
  selector: 'reservations-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public availableHours: AvailableHour[] = [];
  public daySelected?: number;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.daySelected.subscribe(daySelected => {
      this.daySelected = daySelected.dayNumber
      this.reservationsService.getHoursForDayId(daySelected.dayId)
        .subscribe(availableHours => {
          this.availableHours = availableHours
          console.log({ availableHours })
        })
    })

    this.reservationsService.reservationAdded.subscribe(({ userReservation, hourId }) => {
      const hour = this.availableHours.find(hour => hour._id === hourId);
      if (hour) {
        hour.reservations.push({
          _id: userReservation._id,
          name: userReservation.name,
          email: userReservation.email,
          phone: userReservation.phone,
          __v: userReservation.__v
        });
      }
    });
  }

  selectHour(hourId: string, hour: string) {
    this.reservationsService.hourSelected.emit({ hourId, hour })
  }

  convertTo12HourFormat(hour24: number): string {
    return convertTo12HourFormat(hour24)
  }

}
