import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventosService } from '../../../core/services/evento.service';
import { FavoritosService } from '../../../core/services/favorito.service';
import { Evento } from '../../../core/models/evento.model';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  eventosFav: Evento[] = [];

  constructor(
    private eventos: EventosService, // <-- Aquí lo llamas "eventos"
    public favs: FavoritosService
  ) {
    this.refresh();
  }

  refresh() {
    const ids = this.favs.list();

    // 1. CAMBIO AQUÍ: Usamos "this.eventos" porque así se llama en el constructor
    this.eventos.getEventos().subscribe({
      next: (listaDeEventos: Evento[]) => {
        // 2. Filtramos usando los IDs que vienen de tu FavService
        this.eventosFav = listaDeEventos.filter((e: Evento) => ids.includes(e.idEventos!.toString()));
      },
      error: (err) => {
        console.error('Error al obtener favoritos del servidor:', err);
      }
    });
  }

  quitar(id: number) {
    this.favs.remove(id);
    this.refresh();
  }
}