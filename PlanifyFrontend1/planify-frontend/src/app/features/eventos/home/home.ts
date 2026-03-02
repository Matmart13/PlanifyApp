import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EventosService } from '../../../core/services/evento.service';
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
export class Home implements OnInit {
  private all: Evento[] = [];

  constructor(
    private eventosService: EventosService,
    public favs: FavoritosService,
    public filtro: FiltroService,
    private reservas: ReservasService
  ) {}

  ngOnInit(): void {
    this.eventosService.getEventos().subscribe({
      next: (data: Evento[]) => {
        this.all = data;
      },
      error: (err) => console.error('Error cargando eventos desde el backend:', err)
    });
  }

  setQuery(v: string) {
    this.filtro.query = v;
  }

  toggleFav(id: number, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.favs.toggle(id);
  }

  reservar(e: any, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    // Usamos id_eventos y nombre que coinciden con tu base de datos actual
    this.reservas.crearReserva(e.id_eventos, e.nombre, e.fecha_de_inicio);
    alert('Reserva/recordatorio guardado ✅');
  }

  // MÉTODO ACTUALIZADO PARA EVITAR ERROR TRIM()
  private matchesFilters(e: any): boolean {
    const catSel = this.filtro.categoria ? normalizarTexto(this.filtro.categoria) : null;
    const q = normalizarTexto(this.filtro.query || '');

    // Accedemos al nombre dentro del objeto categoría que envía Java
    const eCat = normalizarTexto(e.categoria?.nombre || ''); 
    const okCategoria = !catSel || eCat === catSel;

    const hayTexto =
      normalizarTexto(e.nombre || '').includes(q) || // nombre en lugar de titulo
      normalizarTexto(e.descripcion || '').includes(q) ||
      normalizarTexto(e.ubicacion || '').includes(q) ||
      eCat.includes(q);

    const okTexto = !q || hayTexto;

    return okCategoria && okTexto;
  }

  get eventosFiltrados(): Evento[] {
    return this.all.filter(e => this.matchesFilters(e));
  }

  get top10(): Evento[] {
    return this.eventosFiltrados.slice(0, 10);
  }

  // SECCIONES ACTUALIZADAS PARA ACCEDER A e.categoria.nombre
  get deportivos(): Evento[] {
    return this.eventosFiltrados
      .filter(e => normalizarTexto((e.categoria as any)?.nombre || '').includes('deport'))
      .slice(0, 8);
  }

  get juegos(): Evento[] {
    const c = (x: any) => normalizarTexto(x?.nombre || '');
    return this.eventosFiltrados
      .filter(e => c(e.categoria).includes('juego') || c(e.categoria).includes('video'))
      .slice(0, 8);
  }

  get teatro(): Evento[] {
    return this.eventosFiltrados
      .filter(e => normalizarTexto((e.categoria as any)?.nombre || '').includes('teatr'))
      .slice(0, 8);
  }

  idx(i: number) {
    return i + 1;
  }
}