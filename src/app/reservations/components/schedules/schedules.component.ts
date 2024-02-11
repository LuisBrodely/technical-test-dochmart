import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableHour, DaySelected } from '../../interfaces/reservations.interfaces';

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
      console.log('Se ha añadido correctamente')
    });
  }

  convertTo12HourFormat(hour24: number): string {
    if (hour24 < 1 || hour24 > 24) {
      return "Invalid hour";
    }
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const period = hour24 < 12 ? "AM" : "PM";
    return hour12 + ":00 " + period;
  }

  selectHour(hourId: string, hour: string) {
    this.reservationsService.hourSelected.emit({ hourId, hour })
  }

}
