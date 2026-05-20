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
      title: 'AI/ML Services',
      href: '/docs/api/ai-service',
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
          title: 'Architecture',
          defaultOpen: true,
          items: [
            {
              title: 'Introduction',
              href: '/docs/architecture',
              items: [],
            },
            {
              title: 'Data Prep',
              href: '/docs/architecture/data-prep',
              items: [],
            },
            {
              title: 'Preprocessor',
              href: '/docs/architecture/preprocessor',
              items: [],
            },
            {
              title: 'Training System',
              href: '/docs/architecture/training-system',
              items: [],
            },
            {
              title: 'Model Registry',
              href: '/docs/architecture/model-registry',
              items: [],
            },
            {
              title: 'Data Storage',
              href: '/docs/architecture/data-storage',
              items: []
            },
            {
              title: 'Inference Backend',
              href: '/docs/architecture/inference-backend',
              items: []
            },
            {
              title : 'Orchestration Backend',
              href : '/docs/architecture/orchestration-backend',
              items : []
            },
            {
              title: 'Web UI',
              href: '/docs/architecture/web-ui',
              items: []
            }
          ],
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
          defaultOpen: true,
          items: [
            {
              title: 'Introduction',
              href: '/docs/installation/ai-service',
              items: [],
            },
            {
              title: 'Inference Backend',
              href: '/docs/installation/ai-service/inference-backend',
              items: [],
            },
            {
              title: 'Data Prep',
              href: '/docs/installation/ai-service/data-prep',
              items: [],
            },
            {
              title: 'Preprocessor',
              href: '/docs/installation/ai-service/preprocessor',
              items: [],
            },
            {
              title: 'Training System',
              href: '/docs/installation/ai-service/training-system',
              items: [],
            },
            {
              title: 'Model Registry',
              href: '/docs/installation/ai-service/model-registry',
              items: [],
            },
          ],
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
      title: 'API Reference',
      items: [
        {
          title: 'AI Service API',
          defaultOpen: true,
          items: [
            {
              title: 'All',
              href: '/docs/api/ai-service',
              items: [],
            },
            {
              title: 'Authentication',
              href: '/docs/api/ai-service/authentication',
              items: [],
            },
            {
              title: 'Models',
              href: '/docs/api/ai-service/models',
              items: [],
            },
            {
              title: 'RAG Ingestion',
              href: '/docs/api/ai-service/rag',
              items: [],
            },
            {
              title: 'Speech & Audio',
              href: '/docs/api/ai-service/speech',
              items: [],
            },
            {
              title: 'Content Moderation',
              href: '/docs/api/ai-service/moderation',
              items: [],
            },
            {
              title: 'Streaming Chat',
              href: '/docs/api/ai-service/chat',
              items: [],
            },
            {
              title: 'Error Handling',
              href: '/docs/api/ai-service/errors',
              items: [],
            },
            {
              title: 'Rate Limits',
              href: '/docs/api/ai-service/rate-limits',
              items: [],
            },
          ],
        },
        {
          title: 'Backend API',
          defaultOpen: true,
          items: [
            {
              title: 'All',
              href: '/docs/api/backend',
              items: [],
            },
            {
              title: 'Authentication',
              href: '/docs/api/backend/authentication',
              items: [],
            },
            {
              title: 'Users & Roles',
              href: '/docs/api/backend/users',
              items: [],
            },
            {
              title: 'Organizations',
              href: '/docs/api/backend/organizations',
              items: [],
            },
            {
              title: 'Billing & Subscriptions',
              href: '/docs/api/backend/billing',
              items: [],
            },
            {
              title: 'Webhooks',
              href: '/docs/api/backend/webhooks',
              items: [],
            },
            {
              title: 'Status Codes',
              href: '/docs/api/backend/status-codes',
              items: [],
            },
          ],
        },
      ],
    },
  ],
}
