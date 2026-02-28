export type Rol = 'user' | 'admin';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}