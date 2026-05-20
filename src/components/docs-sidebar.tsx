'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsConfig, type NavItemWithChildren } from '@/config/docs'
import { cn } from '@/lib/utils'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className='border-border/40 fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
      <div className='py-6 pr-6 lg:py-8'>
        <div className='w-full'>
          {docsConfig.sidebarNav.map((section, index) => (
            <div key={index} className='pb-6'>
              <h4 className='mb-1 px-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
                {section.title}
              </h4>
              {section.items?.length ? (
                <DocsSidebarNavItems items={section.items} pathname={pathname} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

interface DocsSidebarNavItemsProps {
  items: NavItemWithChildren[]
  pathname: string | null
}

function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items.length ? (
    <div className='flex flex-col space-y-1 border-l border-zinc-200 ml-3 pl-2 text-sm dark:border-zinc-800'>
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-colors',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href
                ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-50'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.label ? (
              <span className='ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                {item.label}
              </span>
            ) : null}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'flex w-full cursor-not-allowed items-center rounded-md px-2 py-1.5 text-zinc-600 hover:underline dark:text-zinc-400',
              item.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            {item.title}
            {item.label ? (
              <span className='ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline'>
                {item.label}
              </span>
            ) : null}
          </span>
        ),
      )}
    </div>
  ) : null
}
