'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThumbsUp, ThumbsDown, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { docsConfig, type NavItemWithChildren, type NavItem } from '@/config/docs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function DocsFooter() {
  const pathname = usePathname()
  const [feedback, setFeedback] = React.useState<'yes' | 'no' | null>(null)

  // Flatten the sidebarNav to get a sequential list of links
  const flattenedLinks = React.useMemo(() => {
    const links: NavItem[] = []
    
    // We only care about sidebarNav because it dictates the reading flow
    const flatten = (items: NavItemWithChildren[]) => {
      for (const item of items) {
        if (item.href) {
          links.push(item)
        }
        if (item.items && item.items.length > 0) {
          flatten(item.items)
        }
      }
    }
    
    flatten(docsConfig.sidebarNav)
    return links
  }, [])

  // Find current index
  const currentIndex = flattenedLinks.findIndex((link) => link.href === pathname)
  const prevLink = currentIndex > 0 ? flattenedLinks[currentIndex - 1] : null
  const nextLink = currentIndex >= 0 && currentIndex < flattenedLinks.length - 1 ? flattenedLinks[currentIndex + 1] : null

  return (
    <footer className="mt-16 mb-8">
      {/* Feedback & GitHub section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Was this page helpful?</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn("h-8 px-3 gap-2", feedback === 'yes' && "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800")}
              onClick={() => setFeedback('yes')}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-8 px-3 gap-2", feedback === 'no' && "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800")}
              onClick={() => setFeedback('no')}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              No
            </Button>
          </div>
        </div>

        <Link
          href="https://github.com/neurolab-0x/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
        >
          <Github className="h-4 w-4" />
          Edit this page on GitHub
        </Link>
      </div>

      {/* Pagination section */}
      {(prevLink || nextLink) && (
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {prevLink ? (
            <Link
              href={prevLink.href!}
              className="group flex flex-col items-start gap-2 rounded-xl border border-zinc-200 p-6 hover:border-zinc-300 hover:bg-zinc-50 transition-all dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
            >
              <span className="flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{prevLink.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextLink ? (
            <Link
              href={nextLink.href!}
              className="group flex flex-col items-end gap-2 rounded-xl border border-zinc-200 p-6 hover:border-zinc-300 hover:bg-zinc-50 transition-all dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50 text-right"
            >
              <span className="flex items-center gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Next
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{nextLink.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </footer>
  )
}
