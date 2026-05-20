'use client'

import { DocsSidebar } from '@/components/docs-sidebar'
import { SiteHeader } from '@/components/site-header'
import { TableOfContents } from '@/components/toc'
import { DocsFooter } from '@/components/docs-footer'

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='container-wrapper flex-1'>
        <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_200px]'>
          <DocsSidebar />
          <main className='relative py-8 lg:py-12'>
            <div className='mx-auto w-full max-w-4xl min-w-0'>
              {children}
              <DocsFooter />
            </div>
          </main>
          <aside className='hidden text-sm xl:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pt-12 pb-8 pl-4 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  )
}
