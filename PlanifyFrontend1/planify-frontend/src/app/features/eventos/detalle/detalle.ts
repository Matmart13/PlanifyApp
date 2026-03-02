import { Component, OnInit } from '@angular/core'; // 1. Añadimos OnInit
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { EventosService } from '../../../core/services/evento.service'; 
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
export class Detalle implements OnInit { // 2. Implementamos la interfaz
  evento?: Evento;
  relacionados: Evento[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    public favs: FavoritosService,
    private reservas: ReservasService
  ) {}

  // 3. Pasamos la lógica al ngOnInit
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    
    // Primero cargamos el evento principal
    this.eventosService.getEventoById(id).subscribe({
      next: (data) => {
        this.evento = data;
        // Solo cuando tenemos el evento, buscamos los relacionados
        this.loadRelacionados();
      },
      error: (err) => console.error('Error cargando el detalle:', err)
    });
  }

  toggleFav(ev: Event, id?: string) {
    ev.stopPropagation();
    ev.preventDefault();
    if (id) this.favs.toggle(parseInt(id));
  }

  reservar(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.evento) return;
    this.reservas.crearReserva(this.evento.idEventos?.toString() ?? '', this.evento.nombre, this.evento.fechaInicio);
    alert('Reserva/recordatorio guardado ✅');
  }

  private loadRelacionados() {
    if (!this.evento) return;

    const cat = normalizarTexto(this.evento.categoria ?? '');

    // Pedimos todos los eventos para filtrar los que se parecen
    this.eventosService.getEventos().subscribe({
      next: (all: Evento[]) => {
        if (cat) {
          this.relacionados = all
            .filter(e => e.idEventos !== this.evento!.idEventos && normalizarTexto(e.categoria ?? '') === cat)
            .slice(0, 4);
        } else {
          this.relacionados = all.filter(e => e.idEventos !== this.evento!.idEventos).slice(0, 4);
        }
      }
    });
  }
}