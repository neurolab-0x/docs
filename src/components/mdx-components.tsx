'use client'

import * as React from 'react'
import {
  Check,
  Copy,
  Cpu,
  Database,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function extractTextContent(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') {
    return ''
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('')
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractTextContent(node.props.children)
  }

  return ''
}

function getLanguageLabel(className?: string): string | null {
  if (!className) {
    return null
  }

  const match = className.match(/language-([\w-]+)/)
  if (!match) {
    return null
  }

  return match[1]
}

function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'bg-zinc-100 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-200 rounded-md px-1.5 py-0.5 font-mono text-[13px] font-medium border border-zinc-200/50 dark:border-zinc-700/50',
        className,
      )}
      {...props}
    />
  )
}

function Pre({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = React.useState(false)
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string
    children?: React.ReactNode
  }>

  const language = React.isValidElement(child)
    ? getLanguageLabel(child.props.className)
    : null
  const rawCode = extractTextContent(
    React.isValidElement(child) ? child.props.children : children,
  ).replace(/\n$/, '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className='my-8 overflow-hidden rounded-2xl border border-zinc-200/40 bg-[#0a0a0a] shadow-lg dark:border-white/10 dark:bg-[#0d1117]'>
      <div className='flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          <span className='text-[12px] font-medium text-zinc-400 uppercase tracking-wider'>
            {language || 'text'}
          </span>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-7 rounded-md px-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100'
          onClick={handleCopy}
        >
          {copied ? <Check className='size-3.5' /> : <Copy className='size-3.5' />}
        </Button>
      </div>
      <pre
        className={cn(
          'overflow-x-auto px-5 py-4 text-[13px] leading-relaxed text-zinc-50',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  children?: React.ReactNode
  title?: string
  type?: 'default' | 'warning' | 'danger' | 'success'
}

function Callout({
  children,
  className,
  icon,
  title,
  type = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-2xl border bg-opacity-50 p-5 shadow-sm backdrop-blur-sm',
        {
          'border-sky-200 border-l-[4px] border-l-sky-500 bg-sky-50/50 dark:border-sky-900/50 dark:border-l-sky-500 dark:bg-sky-950/20':
            type === 'default',
          'border-amber-200 border-l-[4px] border-l-amber-500 bg-amber-50/50 dark:border-amber-900/50 dark:border-l-amber-500 dark:bg-amber-950/20':
            type === 'warning',
          'border-rose-200 border-l-[4px] border-l-rose-500 bg-rose-50/50 dark:border-rose-900/50 dark:border-l-rose-500 dark:bg-rose-950/20':
            type === 'danger',
          'border-emerald-200 border-l-[4px] border-l-emerald-500 bg-emerald-50/50 dark:border-emerald-900/50 dark:border-l-emerald-500 dark:bg-emerald-950/20':
            type === 'success',
        },
        className,
      )}
      {...props}
    >
      <div className='flex items-start gap-3.5'>
        {icon ? (
          <span className={cn('mt-0.5 text-xl', {
            'text-sky-600 dark:text-sky-400': type === 'default',
            'text-amber-600 dark:text-amber-400': type === 'warning',
            'text-rose-600 dark:text-rose-400': type === 'danger',
            'text-emerald-600 dark:text-emerald-400': type === 'success',
          })}>{icon}</span>
        ) : (
          <Sparkles className={cn('mt-0.5 size-5', {
            'text-sky-600 dark:text-sky-400': type === 'default',
            'text-amber-600 dark:text-amber-400': type === 'warning',
            'text-rose-600 dark:text-rose-400': type === 'danger',
            'text-emerald-600 dark:text-emerald-400': type === 'success',
          })} />
        )}
        <div className='min-w-0 flex-1'>
          {title ? (
            <p className='mb-1.5 text-[13px] font-bold tracking-widest text-zinc-900 uppercase dark:text-zinc-100'>
              {title}
            </p>
          ) : null}
          <div className='text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 [&>p]:mt-0'>{children}</div>
        </div>
      </div>
    </div>
  )
}

interface CodeBlockProps {
  children?: React.ReactNode
  title?: string
  language?: string
}

function CodeBlock({ children, title, language }: CodeBlockProps) {
  return (
    <div className='my-8 overflow-hidden rounded-2xl border border-zinc-200/40 bg-[#0a0a0a] shadow-lg dark:border-white/10 dark:bg-[#0d1117]'>
      {(title || language) && (
        <div className='flex flex-row items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2.5'>
          <span className='text-[13px] font-medium text-zinc-200'>
            {title || 'Code example'}
          </span>
          {language ? (
            <span className='text-[11px] font-medium tracking-wider text-zinc-400 uppercase'>
              {language}
            </span>
          ) : null}
        </div>
      )}
      <Pre className='my-0 rounded-none border-0 shadow-none'>{children}</Pre>
    </div>
  )
}

interface TabsProps {
  children?: React.ReactNode
}

function Tabs({ children }: TabsProps) {
  return (
    <div className='my-8 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-950/20'>
      {children}
    </div>
  )
}

interface EndpointProps extends React.HTMLAttributes<HTMLDivElement> {
  method: string
  path: string
  auth?: 'required' | 'optional' | 'none'
  status?: string
  title?: string
  children?: React.ReactNode
}

function Endpoint({
  method,
  path,
  auth = 'required',
  status,
  title,
  children,
  className,
  ...props
}: EndpointProps) {
  const methodTone =
    {
      GET: 'bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20',
      POST: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
      PUT: 'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
      PATCH: 'bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/20',
      DELETE: 'bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20',
    }[method.toUpperCase()] ||
    'bg-zinc-500/10 text-zinc-700 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-500/20'

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/50',
        className,
      )}
      {...props}
    >
      <div className='flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/50 bg-zinc-50/50 px-5 py-3.5 dark:border-zinc-800/50 dark:bg-zinc-900/30'>
        <div className='flex items-center gap-3'>
          <span
            className={cn(
              'rounded-md px-2 py-1 text-[12px] font-bold tracking-wider uppercase ring-1 ring-inset',
              methodTone,
            )}
          >
            {method}
          </span>
          <code className='font-mono text-[14px] font-medium text-zinc-900 dark:text-zinc-100'>
            {path}
          </code>
        </div>
        <div className='flex items-center gap-3 text-[13px] font-medium text-zinc-500 dark:text-zinc-400'>
          {title ? <span className='text-zinc-700 dark:text-zinc-300'>{title}</span> : null}
          {status ? <span className='rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800/80'>Status {status}</span> : null}
          <span className='flex items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800/80'>
            <ShieldCheck className='size-3.5' />
            {auth}
          </span>
        </div>
      </div>
      {children ? (
        <div className='px-5 py-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400'>
          {children}
        </div>
      ) : null}
    </div>
  )
}

interface EndpointGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children?: React.ReactNode
}

function EndpointGroup({
  title,
  description,
  children,
  className,
  ...props
}: EndpointGroupProps) {
  return (
    <section
      className={cn(
        'my-12 rounded-3xl border border-zinc-200/50 bg-zinc-50/30 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/20',
        className,
      )}
      {...props}
    >
      <div className='mb-6'>
        <p className='text-[12px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400'>
          Route Group
        </p>
        <h3 className='mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
          {title}
        </h3>
        {description ? (
          <p className='mt-2 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400'>
            {description}
          </p>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  )
}

interface ArchitectureGridProps {
  children?: React.ReactNode
}

function ArchitectureGrid({ children }: ArchitectureGridProps) {
  return <div className='my-8 grid gap-5 sm:grid-cols-2'>{children}</div>
}

interface ArchitectureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  eyebrow?: string
  stack?: string
  icon?: 'backend' | 'ai' | 'data' | 'network'
  children?: React.ReactNode
}

function ArchitectureCard({
  title,
  eyebrow,
  stack,
  icon = 'backend',
  children,
  className,
  ...props
}: ArchitectureCardProps) {
  const Icon =
    {
      backend: Server,
      ai: Cpu,
      data: Database,
      network: Network,
    }[icon] || Server

  return (
    <div
      className={cn(
        'group flex flex-col gap-0 rounded-3xl border border-zinc-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60',
        className,
      )}
      {...props}
    >
      <div className='flex flex-row items-start justify-between gap-4 p-6 pb-4'>
        <div className='min-w-0'>
          {eyebrow ? (
            <p className='text-[11px] font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400'>
              {eyebrow}
            </p>
          ) : null}
          <h4 className='mt-2 text-[1.25rem] font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
            {title}
          </h4>
          {stack ? (
            <p className='mt-1.5 text-[13px] font-medium text-zinc-500 dark:text-zinc-400'>
              {stack}
            </p>
          ) : null}
        </div>
        <div className='rounded-2xl border border-zinc-200/50 bg-zinc-50 p-3 transition-colors group-hover:border-zinc-200 group-hover:bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900 dark:group-hover:bg-zinc-800'>
          <Icon className='size-5 text-zinc-700 dark:text-zinc-300' />
        </div>
      </div>
      <div className='px-6 pb-6 pt-0 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400'>
        {children}
      </div>
    </div>
  )
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-[2.5rem] font-bold tracking-tight text-zinc-900 sm:text-[3rem] dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-16 scroll-m-20 border-b border-zinc-200/40 pb-4 text-[1.75rem] font-semibold tracking-tight text-zinc-900 first:mt-0 dark:border-zinc-800/40 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-12 scroll-m-20 text-[1.25rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-[1.125rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-[1rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-[0.875rem] font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font-medium text-sky-600 underline decoration-sky-500/30 underline-offset-4 transition-colors hover:text-sky-500 hover:decoration-sky-500 dark:text-sky-400 dark:hover:text-sky-300',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'text-[16px] leading-[1.7] text-zinc-600 dark:text-zinc-400 [&:not(:first-child)]:mt-6',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'my-6 ml-6 list-disc space-y-2 text-[16px] leading-[1.7] text-zinc-600 marker:text-zinc-300 dark:text-zinc-400 dark:marker:text-zinc-700',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal space-y-2 text-[16px] leading-[1.7] text-zinc-600 marker:text-zinc-400 dark:text-zinc-400 dark:marker:text-zinc-600',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('pl-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        'mt-8 border-l-[3px] border-zinc-200 pl-5 text-[16px] leading-[1.7] italic text-zinc-600 dark:border-zinc-800 dark:text-zinc-400',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('rounded-xl border border-zinc-200/50 shadow-sm dark:border-zinc-800/50', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className='my-10 border-zinc-200/50 dark:border-zinc-800/50' {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-xl border border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-950/20">
      <table className={cn('w-full border-collapse text-left text-[14px]', className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border-b border-zinc-200/50 bg-zinc-50/50 px-5 py-3.5 font-semibold text-zinc-900 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-100',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border-b border-zinc-100/50 px-5 py-3.5 text-zinc-600 whitespace-normal leading-relaxed dark:border-zinc-800/30 dark:text-zinc-400',
        className,
      )}
      {...props}
    />
  ),
  pre: Pre,
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = typeof className === 'string' && className.includes('language-')
    if (isBlock) {
      return (
        <code className={cn('font-mono text-[13px]', className)} {...props}>
          {children}
        </code>
      )
    }

    return (
      <InlineCode className={className} {...props}>
        {children}
      </InlineCode>
    )
  },
  Callout,
  CodeBlock,
  Tabs,
  Endpoint,
  EndpointGroup,
  ArchitectureGrid,
  ArchitectureCard,
}

export {
  ArchitectureCard,
  ArchitectureGrid,
  Callout,
  CodeBlock,
  Endpoint,
  EndpointGroup,
  Tabs,
  components,
}
