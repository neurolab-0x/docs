'use client'

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
          <main className='relative py-8 lg:gap-12 lg:py-12 xl:grid xl:grid-cols-[1fr_300px] xl:gap-16'>
            <div className='mx-auto w-full max-w-4xl min-w-0'>{children}</div>
            <aside className='hidden text-sm xl:block'>
              <div className='sticky top-20 -mt-10 pt-4'>
                <div className='space-y-4'>
                  <p className='text-[11px] font-bold tracking-tight uppercase opacity-70'>
                    On This Page
                  </p>
                  <div className='border-border/40 relative border-l pl-4'>
                    <div className='text-primary border-primary -ml-[17px] border-l-2 py-1 pl-4 font-medium'>
                      Overview
                    </div>
                    <div className='text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors'>
                      What is NeuroLab?
                    </div>
                    <div className='text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors'>
                      Key Features
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}
