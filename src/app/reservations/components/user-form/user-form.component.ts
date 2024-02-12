import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { AddReservation, Reservation, ReservationBody, ReservationsResponse } from '../../interfaces/reservations.interfaces';

@Component({
  selector: 'schedules-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
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
      if (this.dayId !== daySelected.dayId) {
        this.hourId = ''
        this.hourSelected = ''
        this.dayId = daySelected.dayId
        this.daySelected = daySelected.dayNumber
      } else {
        this.dayId = daySelected.dayId
        this.daySelected = daySelected.dayNumber
      }
    })

  }

  get currentUser(): ReservationBody {
    const user = this.userForm.value as ReservationBody;
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
