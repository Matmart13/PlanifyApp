import { Injectable } from '@angular/core';
import { Usuario, Rol } from '../models/usuario.model';

const KEY = 'planify_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: Usuario | null = this.read();

  private read(): Usuario | null {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Usuario) : null;
    } catch {
      return null;
    }
  }

  private write(u: Usuario | null) {
    if (!u) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify(u));
  }

  get user(): Usuario | null {
    return this._user;
  }

  get isLogged(): boolean {
    return !!this._user;
  }

  get rol(): Rol | null {
    return this._user?.rol ?? null;
  }

  login(email: string, nombre: string, rol: Rol): void {
    const u: Usuario = {
      id: crypto.randomUUID(),
      email,
      nombre,
      rol,
    };
    this._user = u;
    this.write(u);
  }

  logout(): void {
    this._user = null;
    this.write(null);
  }

  updateProfile(patch: Partial<Pick<Usuario, 'nombre' | 'email'>>): void {
    if (!this._user) return;
    this._user = { ...this._user, ...patch };
    this.write(this._user);
  }
}