import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    const storedReservations = localStorage.getItem('reservations')
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations)
    } else {
      this.reservations = []
    }
  }

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
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(r => r.id === id)
    this.reservations.splice(index, 1)
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(r => r.id === id)
    this.reservations[index] = updatedReservation
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }
}
