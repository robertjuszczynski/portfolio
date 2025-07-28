import { ExperienceData } from '@/types/experience';

const experienceData: ExperienceData = [
  {
    company: 'Solve IT',
    period: 'July 2023 - Present',
    icon: 'solveit.png',
    positions: [
      {
        role: 'Full-stack Developer',
        period: 'July 2023 – Present',
        description: [
          'Worked on large-scale, high-complexity projects, often tasked with solving non-standard technical challenges such as integrating legacy systems with modern APIs, improving system scalability, or addressing critical performance bottlenecks. Took ownership of cross-project integrations and contributed to architectural decisions across multiple teams.',
          'Involved in full-stack development using technologies such as React, Node.js, Vue, Laravel, PHP, and PostgreSQL. Regularly collaborated with QA engineers, designers, and product owners to refine requirements and deliver high-quality features in agile environments (Scrum/Kanban).',
          'Participated in sprint planning, backlog grooming, and technical discussions; played an active role in code reviews and contributed to the adoption of best practices around clean code, testing, and CI/CD pipelines. Contributed to refactoring initiatives aimed at reducing technical debt, such as modularizing monolithic codebases and migrating legacy systems to microservices or more modern front-end stacks.',
          'Supported architectural improvements and evolution of the tech stack, advocating for tools and frameworks that improved developer productivity and code maintainability. Mentored junior developers and collaborated across teams to ensure consistency in code style, testing strategies, and deployment processes.'
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Typescript', 'Vue.js', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL', 'Wordpress'],
      },
    ],
  },
];

export default experienceData;