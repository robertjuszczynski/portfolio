import { GITHUB } from './links'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  number: string
  category: string
  year: string
  title: string
  lede: string
  stack: string[]
  stackHighlight?: string
  links: ProjectLink[]
  role: string
  imgSrc?: string
}

export const projects: Project[] = [
  {
    number: '01',
    category: 'Insurance',
    year: '2023',
    title: 'Claim Studio',
    lede: 'Large-scale insurance management app within a monorepo. Migrated legacy PHP to React, integrating REST/SOAP APIs with JWT and OAuth2 authentication.',
    stack: ['React', 'Node.js', 'TypeScript', 'PHP', 'PostgreSQL', 'Angular', 'Jenkins'],
    links: [],
    role: 'Full-stack Developer',
    imgSrc: '/images/screenshots/claimStudio.webp',
  },
  {
    number: '02',
    category: 'SaaS',
    year: '2023',
    title: 'Tigo',
    lede: 'Time-tracking SaaS with JWT auth, team and role management, real-time activity via WebSockets, PDF/CSV report generation, full i18n, and dark/light mode.',
    stack: ['Vue.js', 'Nuxt.js', 'Laravel', 'PHP', 'MySQL', 'WebSockets'],
    links: [{ label: 'Demo', href: 'https://app.tigo.pl' }],
    role: 'Full-stack Developer',
    imgSrc: '/images/screenshots/tigo.webp',
  },
  {
    number: '03',
    category: 'Mobile Finance',
    year: '2024',
    title: 'Cashlo',
    lede: 'Mobile iOS app for personal finance management based on the envelope budgeting method, helping users plan expenses, track spending, and stay in control through clear categories and real-time insights.',
    stack: ['React Native', 'TypeScript', 'GraphQL', 'Apollo', 'PostgreSQL', 'Expo', 'Prisma', 'JWT'],
    stackHighlight: 'Lead',
    links: [],
    role: 'Sole Engineer',
    imgSrc: '/images/screenshots/cashlo.webp',
  },
  {
    number: '04',
    category: 'Portfolio',
    year: '2026',
    title: 'Portfolio',
    lede: 'This site. Black, white, and an AI agent that knows my CV better than I do.',
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'SCSS', 'Claude API'],
    links: [{ label: 'GitHub', href: `${GITHUB}/portfolio` }],
    role: 'Sole Engineer',
    imgSrc: '/images/screenshots/portfolio.webp',
  },
]
