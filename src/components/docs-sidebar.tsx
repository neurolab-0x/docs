'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
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
    <div className='flex flex-col space-y-1 text-sm'>
      {items.map((item, index) => (
        <SidebarNavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null
}

function SidebarNavItem({ item, pathname }: { item: NavItemWithChildren; pathname: string | null }) {
  const hasChildren = item.items && item.items.length > 0
  
  // Recursively check if a child is active
  const isChildActive = React.useMemo(() => {
    const checkActive = (navItem: NavItemWithChildren): boolean => {
      if (navItem.href && pathname?.startsWith(navItem.href) && navItem.href !== '/') return true
      if (navItem.items && navItem.items.length > 0) {
        return navItem.items.some(checkActive)
      }
      return false
    }
    return checkActive(item)
  }, [item, pathname])

  const [isOpen, setIsOpen] = React.useState(isChildActive)
  const isActive = pathname === item.href

  return (
    <div className="flex flex-col space-y-1 relative">
      <div className="group relative flex w-full items-center">
        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              'flex w-full items-center rounded-md border border-transparent px-2 py-1.5 pr-8 transition-colors',
              item.disabled && 'cursor-not-allowed opacity-60',
              isActive
                ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-50'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            <span className="flex items-center">
              {item.title}
              {item.label ? (
                <span className='ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline'>
                  {item.label}
                </span>
              ) : null}
            </span>
          </Link>
        ) : (
          <span
            className={cn(
              'flex w-full items-center rounded-md px-2 py-1.5 pr-8 text-zinc-600 transition-colors dark:text-zinc-400',
              item.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
            )}
            onClick={!item.disabled && hasChildren ? () => setIsOpen(!isOpen) : undefined}
          >
            <span className="flex items-center">
              {item.title}
              {item.label ? (
                <span className='ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline'>
                  {item.label}
                </span>
              ) : null}
            </span>
          </span>
        )}
        
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            className="absolute right-1 top-1 p-1 rounded-sm text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
          </button>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div className="ml-3 border-l border-zinc-200 pl-2 dark:border-zinc-800 mt-1 flex flex-col space-y-1">
          {item.items.map((child, index) => (
            <SidebarNavItem key={index} item={child} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  )
}
