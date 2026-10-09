export interface StackItem {
  category: string
  technologies: string[]
  note: string
}

export const stackItems: StackItem[] = [
  { category: 'Languages & runtime', technologies: ['TypeScript', 'JavaScript', 'Node.js', 'PHP', 'SQL', 'Rust'], note: 'Typed by default. Rust, for the sake of love.' },
  { category: 'Frameworks', technologies: ['React', 'Next.js', 'Vue', 'Nuxt', 'Express', 'Laravel', 'Tailwind'], note: 'Picked for the problem, not the hype cycle.' },
  { category: 'Mobile & desktop', technologies: ['React Native', 'Expo', 'Flutter', 'Electron'], note: 'One codebase, as long as it earns it.' },
  { category: 'APIs & data', technologies: ['GraphQL', 'REST', 'PostgreSQL', 'Supabase', 'Prisma'], note: 'Boring APIs, still there next year. Postgres until proven otherwise.' },
  { category: 'AI & agents', technologies: ['Claude', 'Codex', 'Gemini', 'MCP servers', 'LangChain', 'LangGraph', 'RAG'], note: 'Several agents in parallel. One judgment at a time.' },
  { category: 'Infra', technologies: ['Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'DigitalOcean'], note: "If it isn't deployed, it isn't done." },
]
