import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { AvailableHour } from '../../interfaces/reservations.interfaces';

@Component({
  selector: 'reservations-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  public hours: AvailableHour[] = [];

  constructor(private reservationsService: ReservationsService) {}

  async ngOnInit(): Promise<void> {

  }

}
