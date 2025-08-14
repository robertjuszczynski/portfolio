import { ExperienceData } from '@/types/experience';

const experienceData: ExperienceData = [
  {
    company: 'Solve IT',
    period: 'experience.period',
    icon: 'solveit.png',
    positions: [
      {
        role: 'Full-stack Developer',
        period: 'experience.position.solveit.period',
        description: [
          'experience.position.solveit.description.1',
          'experience.position.solveit.description.2',
          'experience.position.solveit.description.3',
          'experience.position.solveit.description.4'
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Typescript', 'Vue.js', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL', 'Wordpress'],
      },
    ],
  },
];

export default experienceData;