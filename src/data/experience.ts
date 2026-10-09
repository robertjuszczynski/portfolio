export interface TimelineItem {
  year: string
  role: string
  company: string
  note: string
}

export const timeline: TimelineItem[] = [
  {
    year: '2026 / Now',
    role: 'Senior Software Engineer',
    company: 'dsplce.co / TopFlight Digital',
    note: 'Embedded through dsplce.co in TopFlight Digital, a UK experimentation studio. TypeScript and Node.js at A/B-test speed, taking AI-built software from a demo that works on Tuesday to something you can run a company on.',
  },
  {
    year: '2023 / 2026',
    role: 'Mid Software Engineer',
    company: 'solveit.pl',
    note: 'Migrated Claim Studio off a legacy PHP framework. Built Cashlo end to end. React Native in front, GraphQL behind. Tigo, code reviews, and a lot of legacy that is now less legacy.',
  },
  {
    year: '2022 / 2026',
    role: 'Freelance Developer',
    company: 'Independent',
    note: 'Custom builds for small businesses. Multilingual sites, GDPR, the unglamorous bits that decide whether a launch actually works.',
  },
]
