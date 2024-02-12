import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { AddReservation, Reservation, ReservationBody, ReservationsResponse } from '../../interfaces/reservations.interfaces';

@Component({
  selector: 'schedules-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  public dayId?: string;
  public hourId?: string;
  public daySelected?: number;
  public hourSelected?: string;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.hourSelected.subscribe(hourSelected => {
      this.hourId = hourSelected.hourId
      this.hourSelected = hourSelected.hour
    })
    this.reservationsService.daySelected.subscribe(daySelected => {
      this.dayId = daySelected.dayId
      this.daySelected = daySelected.dayNumber
    })

  }

  get currentUser(): ReservationBody {
    let user = this.userForm.value as ReservationBody;
    return user;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Faltan datos.')
      return
    };

    if (this.dayId && this.hourId) {
      const user = {...this.currentUser, hourId: this.hourId, dayId: this.dayId};

      this.reservationsService.addReservation(user)
        .subscribe({
          next: (userReservation: Reservation) => {
            userReservation = {...userReservation, hourSelected: this.hourSelected, daySelected: this.daySelected}

            this.reservationsService.reservationAdded.emit({ userReservation, hourId: this.hourId } as AddReservation);
            this.hourSelected = undefined;
            this.hourId = undefined;
          },
          error: (error) => alert(error.error.message)
        });
    } else {
      alert('Verifica dia y hora.')
    }
  }
}
