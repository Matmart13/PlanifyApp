import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FiltroService {
  categoria: string | null = null;
  query: string= '';
}

export function normalizarTexto(s: string): string {
  return (s ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')              // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/\s+/g, ' ');         // colapsa espacios
}