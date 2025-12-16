import { ProjectsData } from '@/types/projects';

const projectsData: ProjectsData = [
  {
    name: 'projects.cashlo.name',
    desc: 'projects.cashlo.desc',
    technologies: [
      'React Native',
      'TypeScript',
      'React Query',
      'Expo',
      'Tailwind',
      'Apollo Client',
      'React Native Reanimated',
      'React Navigation',
      'GraphQL',
      'PostgreSQL',
      'Express',
      'Prisma ORM',
      'Apollo Server',
      'JWT',
    ],
    links: [],
    imgSrc: '/images/screenshots/cashlo.png',
  },
  {
    name: 'projects.claimStudio.name',
    desc: 'projects.claimStudio.desc',
    technologies: [
      'React.js',
      'Node.js',
      'TypeScript',
      'PHP',
      'Symfony',
      'PostgreSQL',
      'Angular',
      'Jenkins',
    ],
    links: [],
    imgSrc: '/images/screenshots/claimStudio.png',
  },
  {
    name: 'projects.tigo.name',
    desc: 'projects.tigo.desc',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'Laravel',
      'PHP',
      'JavaScript',
      'Vuetify',
      'Webpack',
      'MySQL'
    ],
    links: [
      {
        name: 'Demo',
        src: 'https://app.tigo.pl',
      },
    ],
    imgSrc: '/images/screenshots/tigo.png',
  },
  {
    name: 'projects.portfolio.name',
    desc: 'projects.portfolio.desc',
    technologies: [
      'Next.js',
      'React.js',
      'TypeScript',
      'Framer Motion',
      'Spline'
    ],
    links: [
      {
        name: 'Github',
        src: 'https://github.com/robertjuszczynski/portfolio',
      },
      {
        name: 'Demo',
        src: 'https://www.robertjuszczynski.com',
      },
    ],
    imgSrc: '/images/screenshots/portfolio.png',
  },
  {
    name: 'projects.cloudrones.name',
    desc: 'projects.cloudrones.desc',
    technologies: [
      'Advanced Custom Fields',
      'Yoast SEO',
      'Cookiebot',
      'Contact Form 7',
      'Custom Theme',
      'Responsive Design',
      'Image Optimization',
    ],
    links: [
      {
        name: 'Demo',
        src: 'https://cloudrones.pl/',
      },
    ],
    imgSrc: '/images/screenshots/cloudrones.png',
  },
  {
    name: 'projects.sylweriusz.name',
    desc: 'projects.sylweriusz.desc',
    technologies: [
      'Wordpress',
      'Advanced Custom Fields',
      'Yoast SEO',
      'Cookiebot',
      'Contact Form 7',
      'Image Optimization',
      'i18n',
      'Watermarking',
    ],
    links: [
      {
        name: 'Demo',
        src: 'https://sylweriuszstudio.pl/',
      },
    ],
    imgSrc: '/images/screenshots/sylweriusz.png',
  },
];

export default projectsData;
