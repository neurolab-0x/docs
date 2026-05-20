'use client'

import Link from 'next/link'
import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  return (
    <Link
      href='/docs'
      className='flex h-10 w-[220px] items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-white hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-950 dark:hover:text-zinc-200 lg:w-[260px]'
    >
      <SearchIcon className='size-4' />
      <span className='truncate'>Search documentation</span>
    </Link>
  )
}
