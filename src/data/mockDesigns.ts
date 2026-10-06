import type { Design } from '../types/design'

const ago = (days: number) => new Date(Date.now() - days * 864e5).toISOString()

export const mockDesigns: Design[] = [
  { id: 'd1', name: 'Uniforme Atlético FC', garment: 'set', model: '02', status: 'draft', progress: 60, missing: 'Faltan patrocinadores y escudo',
    colors: { primary: '#1F1F1F', secondary: '#F5F5F5', sleeves: '#FF4D00', collar: '#F5F5F5' }, player: { name: 'ATLAS', number: '10' }, createdAt: ago(6), updatedAt: ago(1) },
  { id: 'd2', name: 'Camiseta Los Halcones', garment: 'shirt', model: '01', status: 'ordered', progress: 100,
    colors: { primary: '#F5F5F5', secondary: '#141414', sleeves: '#141414', collar: '#FF4D00' }, player: { name: 'HALCÓN', number: '07' }, createdAt: ago(20), updatedAt: ago(9) },
  { id: 'd3', name: 'Short Training', garment: 'shorts', model: '03', status: 'saved', progress: 100,
    colors: { primary: '#737373', secondary: '#F5F5F5', sleeves: '#F5F5F5', collar: '#050505' }, player: { name: '', number: '' }, createdAt: ago(12), updatedAt: ago(3) },
  { id: 'd4', name: 'Conjunto Pro 2026', garment: 'set', model: '04', status: 'ordered', progress: 100,
    colors: { primary: '#FF4D00', secondary: '#050505', sleeves: '#050505', collar: '#050505' }, player: { name: 'NOVA', number: '23' }, createdAt: ago(30), updatedAt: ago(14) },
  { id: 'd5', name: 'Match Day Gris', garment: 'shirt', model: '01', status: 'saved', progress: 100,
    colors: { primary: '#737373', secondary: '#F5F5F5', sleeves: '#F5F5F5', collar: '#050505' }, player: { name: 'LYAN', number: '09' }, createdAt: ago(40), updatedAt: ago(21) },
]
