import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FiltroService {
  categoria: string | null = null;
  query: string= '';
}

export function normalizarTexto(s: any): string {
  // Si s es un objeto (la categoría de Java), extraemos el nombre. 
  // Si no, lo usamos tal cual.
  const texto = (s && typeof s === 'object') ? s.nombre : s;
  return (texto ?? "").toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}