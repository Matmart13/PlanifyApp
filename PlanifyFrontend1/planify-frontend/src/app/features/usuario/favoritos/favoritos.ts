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
    private eventos: EventosService,
    public favs: FavoritosService
  ) {
    this.refresh();
  }

  refresh() {
    const ids = this.favs.list();
    this.eventosFav = this.eventos.getEventos().filter(e => ids.includes(e.id));
  }

  quitar(id: string) {
    this.favs.remove(id);
    this.refresh();
  }
}
