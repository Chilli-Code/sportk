import { House, Package, Pencil, Shirt, User } from 'lucide-react'

export const navMain = [
  { to: '/app', label: 'Inicio', icon: House, end: true },
  { to: '/app/designs', label: 'Mis diseños', icon: Shirt, end: false },
  { to: '/app/orders', label: 'Mis pedidos', icon: Package, end: false },
]
export const navDesign = { to: '/app/designer', label: 'Diseñar', icon: Pencil, end: false }
export const navProfile = { to: '/app/profile', label: 'Perfil', icon: User, end: false }
