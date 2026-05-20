'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github } from 'lucide-react'
import { docsConfig } from '@/config/docs'
import { MobileNav } from '@/components/mobile-nav'
import { Search } from '@/components/search'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/85'>
      <div className='container flex h-16 items-center gap-3'>
        <MobileNav />

        <Link href='/' className='flex min-w-0 items-center gap-3'>
          <span className='min-w-0'>
            <span className='block truncate font-sans text-lg font-semibold text-zinc-950 dark:text-zinc-50'>
              NeuroLab Docs
            </span>
          </span>
        </Link>

        <nav className='ml-4 hidden items-center gap-1 lg:flex'>
          {docsConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href || '/'}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href ||
                  (item.href !== '/' && item.href && pathname.startsWith(item.href))
                  ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
              )}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className='ml-auto hidden md:block'>
          <Search />
        </div>

        <Link
          href='https://github.com/neurolab-0x'
          target='_blank'
          rel='noreferrer'
          className='hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 md:flex dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-zinc-50'
        >
          <Github className='size-4' />
          <span>View code</span>
        </Link>

        <div className='rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
