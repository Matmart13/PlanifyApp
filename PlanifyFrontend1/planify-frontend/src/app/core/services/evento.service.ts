import { Injectable } from '@angular/core';
import { Evento } from '../models/evento.model';

const KEY = 'planify_eventos';

function seed(): Evento[] {
  return [
    { id:'1', titulo:'Estreno cine', descripcion:'...', categoria:'Cine', fechaISO:'2026-03-10', ubicacion:'Madrid', precio:9, imagenUrl:'https://picsum.photos/600/300?1', webOficial:'https://example.com' },
    { id:'2', titulo:'Obra clásica', descripcion:'...', categoria:'Teatro', fechaISO:'2026-03-12', ubicacion:'Valencia', precio:25, imagenUrl:'https://picsum.photos/600/300?2', webOficial:'https://example.com' },
    { id:'3', titulo:'Concierto pop', descripcion:'...', categoria:'Música', fechaISO:'2026-04-01', ubicacion:'Barcelona', precio:45, imagenUrl:'https://picsum.photos/600/300?3', webOficial:'https://example.com' },
    { id:'4', titulo:'Torneo eSports', descripcion:'...', categoria:'Videojuegos', fechaISO:'2026-04-05', ubicacion:'Sevilla', precio:15, imagenUrl:'https://picsum.photos/600/300?4', webOficial:'https://example.com' },
  ];
}

@Injectable({ providedIn: 'root' })
export class EventosService {

  private load(): Evento[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        const s = seed();
        localStorage.setItem(KEY, JSON.stringify(s));
        return s;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private save(list: Evento[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  getEventos(): Evento[] {
    return this.load();
  }

  getEventoById(id: string): Evento | undefined {
    return this.load().find(e => e.id === id);
  }

  createEvento(data: Omit<Evento, 'id'>): Evento {
    const evento: Evento = { id: crypto.randomUUID(), ...data };
    const next = [evento, ...this.load()];
    this.save(next);
    return evento;
  }

  updateEvento(id: string, patch: Partial<Omit<Evento, 'id'>>): void {
    const next = this.load().map(e => e.id === id ? ({ ...e, ...patch }) : e);
    this.save(next);
  }

  deleteEvento(id: string): void {
    const next = this.load().filter(e => e.id !== id);
    this.save(next);
  }

  getCategorias(): string[] {
    const eventos = this.getEventos();
    const set = new Set<string>();
    for (const e of eventos) {
      if (e.categoria && e.categoria.trim()) set.add(e.categoria.trim());
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

}