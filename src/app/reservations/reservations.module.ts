import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { HourComponent } from './components/hour/hour.component';



@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    SchedulesComponent,
    HourComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class ReservationsModule { }
