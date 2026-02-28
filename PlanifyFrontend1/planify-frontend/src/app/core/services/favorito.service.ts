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

  isFav(id: string): boolean {
    return this.getAll().includes(id);
  }

  toggle(id: string): void {
    const ids = this.getAll();
    const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
    this.setAll(next);
  }

  list(): string[] {
    return this.getAll();
  }

  remove(id: string): void {
    this.setAll(this.getAll().filter(x => x !== id));
  }
}