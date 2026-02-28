import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EventosService } from '../../../core/services/evento.service'; // <-- tu ruta actual
import { FavoritosService } from '../../../core/services/favorito.service';
import { FiltroService } from '../../../core/services/filtro.service';
import { ReservasService } from '../../../core/services/reservas.service';
import { Evento } from '../../../core/models/evento.model';
import { normalizarTexto } from '../../../core/services/filtro.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private all: Evento[] = [];

  constructor(
    private eventosService: EventosService,
    public favs: FavoritosService,
    public filtro: FiltroService,
    private reservas: ReservasService
  ) {
    this.all = this.eventosService.getEventos();
  }

  setQuery(v: string) {
    this.filtro.query = v;
  }

  toggleFav(id: string, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.favs.toggle(id);
  }

  reservar(e: Evento, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.reservas.crearReserva(e.id, e.titulo, e.fechaISO);
    alert('Reserva/recordatorio guardado ✅');
  }

  private matchesFilters(e: Evento): boolean {
    const catSel = this.filtro.categoria ? normalizarTexto(this.filtro.categoria) : null;
    const q = normalizarTexto(this.filtro.query || '');

    const eCat = normalizarTexto(e.categoria || '');
    const okCategoria = !catSel || eCat === catSel;

    const hayTexto =
      normalizarTexto(e.titulo || '').includes(q) ||
      normalizarTexto(e.descripcion || '').includes(q) ||
      normalizarTexto(e.ubicacion || '').includes(q) ||
      eCat.includes(q);

    const okTexto = !q || hayTexto;

    return okCategoria && okTexto;
  }

  get eventosFiltrados(): Evento[] {
    return this.all.filter(e => this.matchesFilters(e));
  }

  // TOP 10 (de lo filtrado)
  get top10(): Evento[] {
    return this.eventosFiltrados.slice(0, 10);
  }

  // Secciones “tipo captura”
  get deportivos(): Evento[] {
    return this.eventosFiltrados.filter(e => normalizarTexto(e.categoria).includes('deport')).slice(0, 8);
  }

  get juegos(): Evento[] {
    const c = (x: string) => normalizarTexto(x);
    return this.eventosFiltrados
      .filter(e => c(e.categoria).includes('juego') || c(e.categoria).includes('video'))
      .slice(0, 8);
  }

  get teatro(): Evento[] {
    return this.eventosFiltrados.filter(e => normalizarTexto(e.categoria).includes('teatr')).slice(0, 8);
  }

  // Para numeración 1..N en el top
  idx(i: number) {
    return i + 1;
  }
}