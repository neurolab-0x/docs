'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Brain } from 'lucide-react'
import { docsConfig } from '@/config/docs'
import { MobileNav } from '@/components/mobile-nav'
import { Search } from '@/components/search'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-50 w-full border-b border-zinc-200/40 bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/40 dark:bg-zinc-950/60'>
      <div className='container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8'>
        
        {/* Left Section: Logo & Desktop Nav */}
        <div className='flex items-center gap-6 md:gap-8'>
          <div className='flex items-center gap-2'>
            <MobileNav />
            <Link href='/' className='flex items-center gap-2.5 transition-opacity hover:opacity-80'>

              <span className='hidden sm:inline-block font-sans text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50'>
                NeuroLab Documentation
              </span>
            </Link>
          </div>

          <nav className='hidden items-center gap-1.5 lg:flex'>
            {docsConfig.mainNav.map((item) => {
              const allMainHrefs = docsConfig.mainNav.map((n) => n.href).filter(Boolean) as string[]
              const isActive =
                pathname === item.href ||
                (!!item.href &&
                  item.href !== '/' &&
                  pathname.startsWith(item.href) &&
                  !allMainHrefs.some(
                    (other) =>
                      other !== item.href &&
                      pathname.startsWith(other) &&
                      other.length > item.href!.length
                  ))

              return (
                <Link
                  key={item.href}
                  href={item.href || '/'}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800/50 dark:text-zinc-50'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
                  )}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Section: Search & Actions */}
        <div className='flex items-center justify-end gap-2 sm:gap-4'>
          <div className='hidden w-full md:block md:w-auto md:max-w-xs'>
            <Search />
          </div>

          <div className='flex items-center gap-0.5'>
            <Link
              href='https://github.com/neurolab-0x'
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-9 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50")}
            >
              <Github className='size-4' />
              <span className='sr-only'>GitHub</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
