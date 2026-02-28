import { Injectable } from '@angular/core';
import { Reserva, EstadoReserva } from '../models/reserva.model';

const KEY = 'planify_reservas';
const ESTADOS: EstadoReserva[] = ['confirmada', 'pendiente', 'cancelada'];

function isEstado(x: any): x is EstadoReserva {
  return ESTADOS.includes(x);
}
function normalizar(input: any): Reserva[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(r => r && typeof r === 'object')
    .map(r => ({
      id: String(r.id ?? crypto.randomUUID()),
      eventId: String(r.eventId ?? ''),
      eventTitulo: String(r.eventTitulo ?? ''),
      fechaISO: String(r.fechaISO ?? new Date().toISOString()),
      estado: isEstado(r.estado) ? r.estado : 'pendiente',
    }));
}

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private load(): Reserva[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      return normalizar(JSON.parse(raw));
    } catch {
      return [];
    }
  }
  private save(list: Reserva[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  list(): Reserva[] {
    return this.load();
  }
  crearReserva(eventId: string, eventTitulo: string, fechaISO: string): Reserva {
    const reserva: Reserva = {
      id: crypto.randomUUID(),
      eventId,
      eventTitulo,
      fechaISO,
      estado: 'confirmada',
    };

    const next = [reserva, ...this.load()];
    this.save(next);
    return reserva;
  }
  cancelar(id: string) {
    const next = this.load().map(r =>
      r.id === id ? { ...r, estado: 'cancelada' as const } : r
    );
    this.save(next);
  }
  borrar(id: string) {
    const next = this.load().filter(r => r.id !== id);
    this.save(next);
  }
}