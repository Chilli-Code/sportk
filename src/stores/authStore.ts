import { create } from 'zustand'

export type User = { name: string; email: string }
type AuthState = { user: User | null; login: (u: User) => void; logout: () => void }

// Estado de sesión (mock). Más adelante se llena con la respuesta real del backend.
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
