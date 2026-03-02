import { Injectable } from '@angular/core';

const KEY = 'planify_favoritos';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private getAll(): string[] {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
  }
  private setAll(ids: string[]) {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }

  isFav(id: number): boolean {
    return this.getAll().includes(id.toString());
  }

  toggle(id: number): void {
    const ids = this.getAll();
    const next = ids.includes(id.toString()) ? ids.filter(x => x !== id.toString()) : [...ids, id.toString()];
    this.setAll(next);
  }

  list(): string[] {
    return this.getAll();
  }

  remove(id: number): void {
    this.setAll(this.getAll().filter(x => x !== id.toString()));
  }
}