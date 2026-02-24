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
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "API Reference",
      href: "/docs/api",
    },
    {
      title: "Guides",
      href: "/docs/guides",
    },
    {
      title: "GitHub",
      href: "https://github.com/neurolab",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Quick Start",
          href: "/docs/quick-start",
          items: [],
        },
        {
          title: "Architecture",
          href: "/docs/architecture",
          items: [],
        },
        {
          title: "Prerequisites",
          href: "/docs/prerequisites",
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "AI Service",
          href: "/docs/installation/ai-service",
          items: [],
        },
        {
          title: "Backend API",
          href: "/docs/installation/backend",
          items: [],
        },
        {
          title: "Frontend",
          href: "/docs/installation/frontend",
          items: [],
        },
        {
          title: "Docker",
          href: "/docs/installation/docker",
          items: [],
        },
        {
          title: "Production",
          href: "/docs/installation/production",
          items: [],
        },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        {
          title: "Mental States",
          href: "/docs/concepts/mental-states",
          items: [],
        },
        {
          title: "EEG Processing",
          href: "/docs/concepts/eeg-processing",
          items: [],
        },
        {
          title: "Voice Analysis",
          href: "/docs/concepts/voice-analysis",
          items: [],
        },
        {
          title: "Multimodal Analysis",
          href: "/docs/concepts/multimodal",
          items: [],
        },
        {
          title: "Interpretability",
          href: "/docs/concepts/interpretability",
          items: [],
        },
      ],
    },
    {
      title: "API Reference",
      items: [
        {
          title: "AI Service API",
          href: "/docs/api/ai-service",
          items: [],
        },
        {
          title: "Backend API",
          href: "/docs/api/backend",
          items: [],
        },
        {
          title: "Authentication",
          href: "/docs/api/authentication",
          items: [],
        },
        {
          title: "WebSocket",
          href: "/docs/api/websocket",
          items: [],
        },
        {
          title: "MQTT",
          href: "/docs/api/mqtt",
          items: [],
        },
      ],
    },
    {
      title: "Guides",
      items: [
        {
          title: "Frontend Integration",
          href: "/docs/guides/frontend-integration",
          items: [],
        },
        {
          title: "Real-time Streaming",
          href: "/docs/guides/streaming",
          items: [],
        },
        {
          title: "Model Training",
          href: "/docs/guides/training",
          items: [],
        },
        {
          title: "Custom Models",
          href: "/docs/guides/custom-models",
          items: [],
        },
      ],
    },
    {
      title: "Advanced",
      items: [
        {
          title: "Signal Processing",
          href: "/docs/advanced/signal-processing",
          items: [],
        },
        {
          title: "ML Architecture",
          href: "/docs/advanced/ml-architecture",
          items: [],
        },
        {
          title: "Performance",
          href: "/docs/advanced/performance",
          items: [],
        },
        {
          title: "Scalability",
          href: "/docs/advanced/scalability",
          items: [],
        },
      ],
    },
  ],
}
