import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from "../home/home.component";
@Component({
  selector: 'app-reservation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HomeComponent],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({

  })

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      let reservation = this.reservationService.getReservation(id)
      if (reservation) {
        this.reservationForm.patchValue(reservation)
      }
    }
  }



  onSubmit() {
    if (this.reservationForm.valid) {

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if (id) {
        // Update
        this.reservationForm.value.id = id
        this.reservationService.updateReservation(id, this.reservationForm.value)
      } else {
        // New
        this.reservationService.addReservation(this.reservationForm.value)
      }
      this.router.navigate(['/list'])
    }
  }
}
