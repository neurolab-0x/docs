'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Timeout ensures we capture DOM elements after MDX renders and hydrates
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('main h2, main h3'))
      
      const tocItems: TocItem[] = elements.map((el) => ({
        id: el.id,
        title: el.textContent || '',
        level: Number(el.tagName.charAt(1)),
      })).filter(item => item.id)

      setItems(tocItems)
      
      // Initialize active ID to the first item if none is set and we have items
      if (tocItems.length > 0 && !activeId) {
        // Find which item is currently near top of viewport, or just default to first
        setActiveId(tocItems[0].id)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66% 0px' }
    )

    const elements = document.querySelectorAll('main h2, main h3')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">On This Page</p>
      <ul className="m-0 list-none flex flex-col space-y-2.5 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                activeId === item.id
                  ? "font-medium text-sky-600 dark:text-sky-400"
                  : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
