'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { docsConfig } from '@/config/docs'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className='border-border/40 fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
      <div className='py-6 pr-6 lg:py-8'>
        <div className='w-full'>
          {docsConfig.sidebarNav.map((section, index) => (
            <div key={index} className='pb-8'>
              <h4 className='text-foreground mb-1 rounded-md px-2 py-1 text-sm text-[10px] font-bold tracking-tight uppercase opacity-70'>
                {section.title}
              </h4>
              {section.items?.length && (
                <DocsSidebarNavItems
                  items={section.items}
                  pathname={pathname}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

interface DocsSidebarNavItemsProps {
  items: any[]
  pathname: string | null
}

function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className='grid grid-flow-row auto-rows-max text-sm'>
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-all duration-200',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href
                ? 'bg-accent/50 text-foreground font-medium shadow-sm'
                : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground',
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label && (
              <span className='ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            {item.title}
            {item.label && (
              <span className='bg-muted text-muted-foreground ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline'>
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null
}
