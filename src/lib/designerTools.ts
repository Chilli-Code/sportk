import { Hash, ImagePlus, Layers, Megaphone, Palette, Shirt, Trophy, Type } from 'lucide-react'
import type { ToolId } from '../stores/viewerStore'

export const TOOLS: { id: ToolId; label: string; icon: typeof Shirt }[] = [
  { id: 'club', label: 'Equipos', icon: Trophy },
  { id: 'garment', label: 'Prenda', icon: Shirt },
  { id: 'pattern', label: 'Estilo', icon: Layers },
  { id: 'color', label: 'Color', icon: Palette },
  { id: 'player', label: 'Dorsal', icon: Hash },
  { id: 'logo', label: 'Logo', icon: ImagePlus },
  { id: 'sponsor', label: 'Patrocinio', icon: Megaphone },
  { id: 'text', label: 'Texto', icon: Type },
]

export const PALETTE = ['#F5F5F5', '#D4D4D4', '#737373', '#1F1F1F', '#050505', '#FF4D00', '#E11D2E', '#FFC400', '#18A957', '#1E4FD8', '#14213D', '#6D28D9']
