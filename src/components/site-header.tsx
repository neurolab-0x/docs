"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "@/components/search"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              NeuroLab
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {docsConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href || "/"}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Search />
          </div>
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
