import type { User } from '../stores/authStore'

// MOCK: simula una petición. Cuando exista el backend, solo cambia el interior de `login`.
export const authService = {
  async login(email: string, _password: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 900))
    return { name: email.split('@')[0], email }
  },
}
