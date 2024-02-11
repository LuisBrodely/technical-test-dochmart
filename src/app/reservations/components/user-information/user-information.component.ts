import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationBody } from '../../interfaces/reservations.interfaces';

@Component({
  selector: 'schedules-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {

  public userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })

  constructor(private reservationsService: ReservationsService) {}

  get currentUser(): ReservationBody {
    const user = this.userForm.value as ReservationBody
    user.dayId = '65c86f5e164139afe929b1d2'
    user.hourId = '65c86f5e164139afe929b1d5'
    return user
  }

  onSubmit(): void {

    if (this.userForm.invalid) return

    this.reservationsService.addReservation(this.currentUser)
      .subscribe(userReservation => {
        console.log(userReservation)
      })

    console.log({
      formIsValid: this.userForm.valid,
      value: this.userForm.value
    })
  }
}
