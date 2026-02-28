import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EventosService } from '../../../core/services/evento.service'; // ajusta ruta si la tienes distinta
import { FavoritosService } from '../../../core/services/favorito.service';
import { ReservasService } from '../../../core/services/reservas.service';
import { Evento } from '../../../core/models/evento.model';
import { normalizarTexto } from '../../../core/services/filtro.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  evento?: Evento;
  relacionados: Evento[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    public favs: FavoritosService,
    private reservas: ReservasService
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.evento = this.eventosService.getEventoById(id);
    this.loadRelacionados();
  }

  toggleFav(ev: Event, id?: string) {
    ev.stopPropagation();
    ev.preventDefault();
    if (id) this.favs.toggle(id);
  }

  reservar(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.evento) return;
    this.reservas.crearReserva(this.evento.id, this.evento.titulo, this.evento.fechaISO);
    alert('Reserva/recordatorio guardado ✅');
  }

  private loadRelacionados() {
    if (!this.evento) {
      this.relacionados = [];
      return;
    }

    const cat = normalizarTexto(this.evento.categoria ?? '');
    const all = this.eventosService.getEventos();

    if (cat) {
      this.relacionados = all
        .filter(e => e.id !== this.evento!.id && normalizarTexto(e.categoria ?? '') === cat)
        .slice(0, 4);
    } else {
      this.relacionados = all.filter(e => e.id !== this.evento!.id).slice(0, 4);
    }
  }
}
