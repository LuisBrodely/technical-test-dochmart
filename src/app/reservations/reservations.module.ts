import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { HourComponent } from './components/hour/hour.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    SchedulesComponent,
    HourComponent,
    UserInformationComponent
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
