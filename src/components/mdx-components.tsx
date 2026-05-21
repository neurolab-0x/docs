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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
        'bg-zinc-100/80 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 rounded px-1.5 py-0.5 font-mono text-[0.875em] font-medium border border-zinc-200/40 dark:border-zinc-700/40',
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
    <div className='my-8 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800'>
      <div className='flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-full bg-rose-400' />
            <span className='h-2.5 w-2.5 rounded-full bg-amber-300' />
            <span className='h-2.5 w-2.5 rounded-full bg-emerald-400' />
          </div>
          <span className='text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase'>
            {language || 'plain text'}
          </span>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='h-8 rounded-lg px-2.5 text-zinc-300 hover:bg-white/10 hover:text-white'
          onClick={handleCopy}
        >
          {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
          <span className='text-xs font-semibold'>
            {copied ? 'Copied' : 'Copy'}
          </span>
        </Button>
      </div>
      <pre
        className={cn(
          'overflow-x-auto bg-zinc-950 px-4 py-5 text-[13px] leading-6 text-zinc-100 sm:px-5',
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
    <Card
      className={cn(
        'my-8 gap-0 rounded-2xl px-0 py-0 shadow-sm',
        {
          'border-sky-200 bg-sky-50/70 dark:border-sky-900 dark:bg-sky-950/30':
            type === 'default',
          'border-amber-300 bg-amber-50/80 dark:border-amber-900 dark:bg-amber-950/30':
            type === 'warning',
          'border-rose-300 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/30':
            type === 'danger',
          'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/30':
            type === 'success',
        },
        className,
      )}
      {...props}
    >
      <CardContent className='px-5 py-4'>
        <div className='flex items-start gap-3'>
          {icon ? (
            <span className='mt-0.5 text-xl'>{icon}</span>
          ) : (
            <Sparkles className='mt-0.5 size-5 text-current opacity-80' />
          )}
          <div className='min-w-0 flex-1'>
            {title ? (
              <p className='mb-2 text-sm font-black tracking-[0.14em] uppercase'>
                {title}
              </p>
            ) : null}
            <div className='text-sm leading-7'>{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CodeBlockProps {
  children?: React.ReactNode
  title?: string
  language?: string
}

function CodeBlock({ children, title, language }: CodeBlockProps) {
  return (
    <Card className='my-8 gap-0 overflow-hidden rounded-2xl border-zinc-200 bg-white py-0 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
      {(title || language) && (
        <CardHeader className='flex flex-row items-center justify-between border-b bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900'>
          <span className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
            {title || 'Code example'}
          </span>
          {language ? (
            <span className='text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400'>
              {language}
            </span>
          ) : null}
        </CardHeader>
      )}
      <Pre>{children}</Pre>
    </Card>
  )
}

interface TabsProps {
  children?: React.ReactNode
}

function Tabs({ children }: TabsProps) {
  return (
    <Card className='my-8 overflow-hidden rounded-2xl border-zinc-200 bg-white py-0 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
      {children}
    </Card>
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
      GET: 'bg-sky-100 text-sky-900 ring-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-900',
      POST: 'bg-emerald-100 text-emerald-900 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900',
      PUT: 'bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-900',
      PATCH:
        'bg-orange-100 text-orange-950 ring-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:ring-orange-900',
      DELETE:
        'bg-rose-100 text-rose-900 ring-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-900',
    }[method.toUpperCase()] ||
    'bg-zinc-100 text-zinc-900 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800'

  return (
    <Card
      className={cn(
        'my-6 gap-0 overflow-hidden rounded-2xl border-zinc-200 bg-white py-0 shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
        className,
      )}
      {...props}
    >
      <CardHeader className='border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/70'>
        <div className='mb-3 flex flex-wrap items-center gap-2'>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-black tracking-[0.16em] ring-1 uppercase',
              methodTone,
            )}
          >
            {method}
          </span>
          <code className='rounded-md bg-zinc-950 px-3 py-1.5 font-mono text-sm font-semibold text-zinc-50 dark:bg-black'>
            {path}
          </code>
        </div>
        <div className='flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400'>
          <span className='inline-flex items-center gap-1.5'>
            <ShieldCheck className='size-3.5' />
            Auth {auth}
          </span>
          {status ? <span>Status {status}</span> : null}
          {title ? <span className='text-zinc-900 dark:text-zinc-100'>{title}</span> : null}
        </div>
      </CardHeader>
      {children ? (
        <CardContent className='px-5 py-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300'>
          {children}
        </CardContent>
      ) : null}
    </Card>
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
        'my-10 rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/30',
        className,
      )}
      {...props}
    >
      <div className='mb-5'>
        <p className='text-[11px] font-black tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400'>
          Route Group
        </p>
        <h3 className='mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50'>
          {title}
        </h3>
        {description ? (
          <p className='mt-2 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-300'>
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
  return <div className='my-8 grid gap-5 md:grid-cols-2'>{children}</div>
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
    <Card
      className={cn(
        'gap-0 rounded-3xl border-zinc-200 bg-white py-0 shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
        className,
      )}
      {...props}
    >
      <CardHeader className='mb-0 flex flex-row items-start justify-between gap-4 p-6 pb-0'>
        <div className='min-w-0'>
          {eyebrow ? (
            <p className='text-[11px] font-black tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400'>
              {eyebrow}
            </p>
          ) : null}
          <CardTitle className='mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50'>
            {title}
          </CardTitle>
          {stack ? (
            <CardDescription className='mt-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300'>
              {stack}
            </CardDescription>
          ) : null}
        </div>
        <div className='rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900'>
          <Icon className='size-5 text-zinc-700 dark:text-zinc-200' />
        </div>
      </CardHeader>
      <CardContent className='p-6 pt-5 text-sm leading-7 text-zinc-700 dark:text-zinc-300'>
        {children}
      </CardContent>
    </Card>
  )
}

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-[2.5rem] leading-[1.08] font-bold tracking-[-0.04em] text-zinc-950 sm:text-[3rem] dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-14 scroll-m-20 border-b border-zinc-200/50 pb-3 text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.03em] text-zinc-950 first:mt-0 sm:text-[2.125rem] dark:border-zinc-800/50 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-10 scroll-m-20 text-[1.375rem] leading-[1.25] font-semibold tracking-[-0.025em] text-zinc-950 sm:text-[1.5rem] dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-[1.125rem] leading-[1.35] font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-base leading-7 font-semibold tracking-[-0.01em] text-zinc-950 dark:text-zinc-50',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-sm leading-6 font-semibold uppercase tracking-[0.02em] text-zinc-700 dark:text-zinc-300',
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 underline underline-offset-4 decoration-sky-500/30 hover:decoration-sky-500 transition-colors',
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'text-[1rem] leading-8 text-zinc-700 dark:text-zinc-300 [&:not(:first-child)]:mt-5',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        'my-6 ml-6 list-disc space-y-2.5 text-[1rem] leading-8 text-zinc-700 marker:text-zinc-300 dark:text-zinc-300 dark:marker:text-zinc-700',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal space-y-2.5 text-[1rem] leading-8 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-500',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-1.5 pl-1 leading-8', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        'mt-8 border-l-2 border-zinc-300 pl-4 text-[1rem] leading-8 italic text-zinc-700 dark:border-zinc-700 dark:text-zinc-300',
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
      className={cn('rounded-xl border border-zinc-200/60 shadow-sm dark:border-zinc-800/60', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className='my-8 border-zinc-200/60 dark:border-zinc-800/60' {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl bg-white dark:bg-zinc-950/20">
      <table className={cn('w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn(
        'border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30',
        className,
      )}
      {...props}
    />
  ),
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        'border-b border-zinc-100 dark:border-zinc-900 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10',
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-4 py-3 align-top text-zinc-600 dark:text-zinc-400 whitespace-normal leading-6',
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
