import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sileo'
import { router } from './router'

export default function App() {
  return (
    <>
      {/* Arriba y centrado: abajo está el menú de la app en el celular */}
      <Toaster
  position="top-center"
  offset={{ top: 64 }}
  options={{
    fill: '#1F1F1F',
    roundness: 16,
    duration: 3500,
    styles: {
      title: 'text-white!',
      description: 'text-white/70!',
      badge: 'bg-white/10!',
      button: 'bg-white/10! hover:bg-white/15!',
    },
  }}
/>
      <RouterProvider router={router} />
    </>
  )
}
