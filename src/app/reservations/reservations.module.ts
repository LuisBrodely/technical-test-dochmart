import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    SchedulesComponent,
    ReservationSummaryComponent,
    UserFormComponent,
    UserReservationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class ReservationsModule { }
