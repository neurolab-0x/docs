export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Architecture',
      href: '/docs/architecture',
    },
    {
      title: 'AI API',
      href: '/docs/api/ai-service',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/neurolab',
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Quick Start',
          href: '/docs/quick-start',
          items: [],
        },
        {
          title: 'Architecture',
          href: '/docs/architecture',
          items: [],
        },
        {
          title: 'Prerequisites',
          href: '/docs/prerequisites',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'AI Service',
          href: '/docs/installation/ai-service',
          items: [],
        },
        {
          title: 'Backend API',
          href: '/docs/installation/backend',
          items: [],
        },
        {
          title: 'Docker',
          href: '/docs/installation/docker',
          items: [],
        },
        {
          title: 'Production',
          href: '/docs/installation/production',
          items: [],
        },
      ],
    },
    {
      title: 'Core Concepts',
      items: [
        {
          title: 'Mental States',
          href: '/docs/concepts/mental-states',
          items: [],
        },
        {
          title: 'EEG Processing',
          href: '/docs/concepts/eeg-processing',
          items: [],
        },
      ],
    },
    {
      title: 'API Reference',
      items: [
        {
          title: 'AI Service API',
          href: '/docs/api/ai-service',
          items: [],
        },
        {
          title: 'Backend API',
          href: '/docs/api/backend',
          items: [],
        },
      ],
    },
  ],
}
