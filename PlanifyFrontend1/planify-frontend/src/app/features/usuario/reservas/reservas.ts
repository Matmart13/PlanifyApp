import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservasService } from '../../../core/services/reservas.service';
import { Reserva } from '../../../core/models/reserva.model';

@Component({
  selector: 'app-reservas',
  imports: [CommonModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas {
  reservas: Reserva[] = [];

  constructor(private reservasService: ReservasService) {
    this.refresh();
  }

  refresh() {
    this.reservas = this.reservasService.list();
  }

  cancelar(id: string) {
    this.reservasService.cancelar(id);
    this.refresh();
  }

  borrar(id: string) {
    this.reservasService.borrar(id);
    this.refresh();
  }
}
