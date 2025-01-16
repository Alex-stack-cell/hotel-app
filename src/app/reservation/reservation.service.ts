import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  // CRUD
  getReservations(): Reservation[] {
      return this.reservations
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id)
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString()
    this.reservations.push(reservation)
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(r => r.id === id)
    this.reservations.splice(index, 1)
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(r => r.id === id)
    this.reservations[index] = updatedReservation
  }
}
