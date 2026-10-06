import type { ReactNode } from 'react'

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 py-6 md:px-8 lg:px-10 lg:py-10">{children}</div>
}
