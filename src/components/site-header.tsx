'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { docsConfig } from '@/config/docs'
import { MobileNav } from '@/components/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Search } from '@/components/search'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className='bg-background/60 border-border/40 hover:border-border/80 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ease-in-out'>
      <div className='container flex h-16 items-center'>
        <MobileNav />
        <div className='mr-4 hidden md:flex'>
          <Link
            href='/'
            className='mr-8 flex items-center space-x-2 transition-opacity hover:opacity-80'
          >
            <span className='hidden text-lg font-extrabold tracking-tighter uppercase sm:inline-block'>
              NeuroLab
            </span>
          </Link>
          <nav className='flex items-center space-x-8 text-sm font-medium'>
            {docsConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href || '/'}
                className={cn(
                  'hover:text-foreground relative py-1 transition-colors',
                  pathname === item.href
                    ? 'text-foreground after:bg-primary font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full'
                    : 'text-foreground/60',
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <Search />
          </div>
          <nav className='flex items-center'>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
