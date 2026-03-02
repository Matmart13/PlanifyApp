import { Evento } from '../models/evento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const KEY = 'planify_eventos';

function seed(): Evento[] {
  return [
    { 
      idEventos: 1, 
      nombre: 'Estreno cine', 
      descripcion: '...', 
      capacidad: 100,  // Añadido
      categoria: { idCategorias: 1, nombre: 'Cine' }, // Ajustado a objeto
      fechaInicio: '2026-03-10', 
      ubicacion: 'Madrid', 
      precio: 9, 
      imagenUrl: 'https://picsum.photos/600/300?1', 
      urlReserva: 'https://example.com' ,
      recomendado: true
    },
    { 
      idEventos: 2, 
      nombre: 'Obra clásica', 
      descripcion: '...', 
      capacidad: 50,
      categoria: { idCategorias: 2, nombre: 'Teatro' }, 
      fechaInicio: '2026-03-12', 
      ubicacion: 'Valencia', 
      precio: 25, 
      imagenUrl: 'https://picsum.photos/600/300?2', 
      urlReserva: 'https://example.com' ,
      recomendado: true
    },
    { 
      idEventos: 3, 
      nombre: 'Concierto pop', 
      descripcion: '...', 
      capacidad: 500,
      categoria: { idCategorias: 3, nombre: 'Música' }, 
      fechaInicio : '2026-04-01', 
      ubicacion: 'Barcelona', 
      precio: 45, 
      imagenUrl : 'https://picsum.photos/600/300?3', 
      urlReserva: 'https://example.com' ,
      recomendado: true
    },
    { 
      idEventos: 4, 
      nombre: 'Torneo eSports', 
      descripcion: '...', 
      categoria: { idCategorias: 4, nombre: 'Videojuegos' }, 
      capacidad: 200,
      fechaInicio : '2026-04-05', 
      ubicacion: 'Sevilla', 
      precio: 15, 
      imagenUrl: 'https://picsum.photos/600/300?4', 
      urlReserva: 'https://example.com' ,
      recomendado: true
    },
  ];
}
@Injectable({
  providedIn: 'root'
})
export class EventosService {
  
  // La URL que configuramos en tu application.properties
  private apiUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos desde la DB
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento por ID (Ojo: en tu Java es un Long, aquí pasamos número o string)
  getEventoById(id: string | number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Crear evento enviándolo al Backend
  createEvento(data: Omit<Evento, 'id'>): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, data);
  }

  // Actualizar evento
  updateEvento(id: string | number, patch: Partial<Evento>): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, patch);
  }

  // Borrar de la DB
  deleteEvento(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener categorías únicas (basado en los datos que vienen del servidor)
getCategorias(): Observable<string[]> {
  return this.getEventos().pipe(
    map(eventos => {
      const set = new Set<string>();
      // El bucle va AQUÍ adentro, donde 'eventos' ya es el Array real
      for (const e of eventos) {
        if (e.categoria?.nombre?.trim()) set.add(e.categoria.nombre.trim());
      }
      return Array.from(set).sort();
    })
  );
}
}