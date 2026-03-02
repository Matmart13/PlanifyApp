import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.services'; // ajusta si tu archivo se llama distinto
import { ReservasService } from '../../../core/services/reservas.service';
import { FavoritosService } from '../../../core/services/favorito.service';
import { EventosService } from '../../../core/services/evento.service';

import { Rol } from '../../../core/models/usuario.model';
import { Reserva } from '../../../core/models/reserva.model';
import { Evento } from '../../../core/models/evento.model';

type Tab = 'perfil' | 'favoritos' | 'reservas';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  tab: Tab = 'perfil';

  // login demo
  nombre = '';
  email = '';
  rol: Rol = 'user';

  // edición
  editNombre = '';
  editEmail = '';

  // data
  reservas: Reserva[] = [];
  eventosFav: Evento[] = [];

  constructor(
    public auth: AuthService,
    private reservasService: ReservasService,
    public favs: FavoritosService,
    private eventosService: EventosService
  ) {
    if (auth.user) {
      this.editNombre = auth.user.nombre;
      this.editEmail = auth.user.email;
    }
    this.refreshAll();
  }

  setTab(t: Tab) {
    this.tab = t;
    if (t === 'reservas') this.refreshReservas();
    if (t === 'favoritos') this.refreshFavoritos();
  }

  // --- Perfil / Auth ---
  login() {
    const nombre = this.nombre.trim();
    const email = this.email.trim();
    if (!nombre || !email) return alert('Rellena nombre y email');
    this.auth.login(email, nombre, this.rol);

    this.editNombre = this.auth.user!.nombre;
    this.editEmail = this.auth.user!.email;

    this.refreshAll();
  }

  guardarPerfil() {
    const nombre = this.editNombre.trim();
    const email = this.editEmail.trim();
    if (!nombre || !email) return alert('Nombre y email no pueden estar vacíos');
    this.auth.updateProfile({ nombre, email });
    alert('Perfil actualizado ✅');
  }

  logout() {
    this.auth.logout();
    this.nombre = '';
    this.email = '';
    this.rol = 'user';
    this.tab = 'perfil';
  }

  // --- Reservas ---
  refreshReservas() {
    this.reservas = this.reservasService.list();
  }

  cancelarReserva(id: string) {
    this.reservasService.cancelar(id);
    this.refreshReservas();
  }

  borrarReserva(id: string) {
    this.reservasService.borrar(id);
    this.refreshReservas();
  }

  // --- Favoritos ---
refreshFavoritos() {
  const ids = this.favs.list();

  // 1. Nos suscribimos al servicio (viniendo de la API de Java)
  this.eventosService.getEventos().subscribe({
    next: (todosLosEventos: Evento[]) => {
      // 2. Filtramos el Array real una vez que llega del servidor
      // 3. Tipamos 'e' como 'Evento' para quitar el error TS7006
      this.eventosFav = todosLosEventos.filter((e: Evento) => ids.includes(e.idEventos!.toString()));
    },
    error: (err) => {
      console.error('Error al cargar favoritos del servidor:', err);
    }
  });
}
  quitarFav(id: number) {
    this.favs.remove(id);
    this.refreshFavoritos();
  }

  private refreshAll() {
    this.refreshReservas();
    this.refreshFavoritos();
  }
}