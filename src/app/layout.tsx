import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'NeuroLab Documentation',
  description: 'Comprehensive documentation for NeuroLab EEG & Voice Mental State Analysis Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
