'use client'

import { DocsSidebar } from '@/components/docs-sidebar'
import { SiteHeader } from '@/components/site-header'

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='container-wrapper flex-1'>
        <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12'>
          <DocsSidebar />
          <main className='relative py-8 lg:py-12'>
            <div className='mx-auto w-full max-w-4xl min-w-0'>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
