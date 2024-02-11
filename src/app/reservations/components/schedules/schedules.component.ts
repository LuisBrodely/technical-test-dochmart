import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableHour } from '../../interfaces/reservations.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reservations-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent{

  public availableHour: AvailableHour[] = [];

  constructor(private reservationsService: ReservationsService) {}

  
}
