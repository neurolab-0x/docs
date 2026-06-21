export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  defaultOpen?: boolean
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
      title: 'API Reference',
      href: '/docs/api',
    }
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
          title: 'Prerequisites',
          href: '/docs/prerequisites',
          items: [],
        },
      ],
    },
    {
      title: 'Concepts',
      items: [
        {
          title: 'EEG Signal Processing',
          href: '/docs/concepts/eeg-processing',
          items: [],
        },
        {
          title: 'Mental States',
          href: '/docs/concepts/mental-states',
          items: [],
        },
      ],
    },
    {
      title: 'Architecture',
      items: [
        {
          title: 'Overview',
          href: '/docs/architecture',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'AI Service',
          defaultOpen: true,
          items: [
            {
              href: '/docs/installation/ai-service',
              title: 'Overview',
              items: [],
            },
          ],
        },
        {
          title: 'Backend',
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
      title: 'API Reference',
      items: [
        {
          title: 'Overview',
          defaultOpen: true,
          items: [
            {
              title: 'Overview',
              href: '/docs/api',
              items: [],
            },
            {
              title: 'Backend API',
              href: '/docs/api/backend',
              items: [],
            },
            {
              title: 'AI Service API',
              href: '/docs/api/ai-service',
              items: [],
            },
          ],
        },
      ],
    },
  ],
}
