import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReservationsModule } from './reservations/reservations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReservationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
