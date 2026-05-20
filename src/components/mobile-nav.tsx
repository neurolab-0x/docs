"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, ChevronRight } from "lucide-react"
import { docsConfig, type NavItemWithChildren } from "@/config/docs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[86vw] max-w-sm border-r border-zinc-200 bg-white px-0 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="border-b border-zinc-200 px-5 py-5 dark:border-zinc-800">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              NeuroLab Docs
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Platform documentation
            </div>
          </Link>
        </div>

        <div className="px-3 py-4">
          <div className="space-y-1">
            <Link
              href="https://github.com/neurolab-0x"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              <Github className="size-4" />
              <span>View code</span>
            </Link>
            {docsConfig.mainNav.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    pathname={pathname}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <div className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Documentation
            </div>
            <div className="mt-3 space-y-6">
              {docsConfig.sidebarNav.map((section) => (
                <div key={section.title}>
                  <div className="px-2 mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {section.title}
                  </div>
                  <div className="flex flex-col space-y-1 border-l border-zinc-200 ml-3 pl-2 dark:border-zinc-800">
                    {section.items.map((item, index) => (
                      <MobileSidebarNavItem
                        key={index}
                        item={item}
                        pathname={pathname}
                        onOpenChange={setOpen}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps {
  href: string
  pathname: string
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  pathname,
  onOpenChange,
  children,
  className,
}: MobileLinkProps) {
  const allHrefs = React.useMemo(() => {
    const hrefs: string[] = []
    const extractHrefs = (items: NavItemWithChildren[]) => {
      items.forEach((item) => {
        if (item.href) hrefs.push(item.href)
        if (item.items) extractHrefs(item.items)
      })
    }
    docsConfig.mainNav.forEach((item) => {
      if (item.href) hrefs.push(item.href)
    })
    extractHrefs(docsConfig.sidebarNav as NavItemWithChildren[])
    return hrefs
  }, [])

  const active =
    pathname === href ||
    (href !== "/" &&
      pathname.startsWith(href) &&
      !allHrefs.some(
        (other) =>
          other !== href && pathname.startsWith(other) && other.length > href.length
      ))

  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
          : "hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
        className
      )}
    >
      {children}
    </Link>
  )
}

function MobileSidebarNavItem({
  item,
  pathname,
  onOpenChange,
}: {
  item: NavItemWithChildren
  pathname: string
  onOpenChange?: (open: boolean) => void
}) {
  const hasChildren = item.items && item.items.length > 0
  
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
            onClick={() => onOpenChange?.(false)}
            className={cn(
              "flex w-full items-center rounded-lg px-2 py-1.5 pr-8 transition-colors",
              item.disabled && "cursor-not-allowed opacity-60",
              isActive
                ? "bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            className={cn(
              "flex w-full items-center rounded-lg px-2 py-1.5 pr-8 text-zinc-600 transition-colors dark:text-zinc-400",
              item.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            )}
            onClick={!item.disabled && hasChildren ? () => setIsOpen(!isOpen) : undefined}
          >
            {item.title}
          </span>
        )}
        
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            className="absolute right-1 top-1 p-1 rounded-sm text-zinc-400 hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
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
            <MobileSidebarNavItem
              key={index}
              item={child}
              pathname={pathname}
              onOpenChange={onOpenChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}
