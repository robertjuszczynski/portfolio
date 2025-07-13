import { ExperienceData } from '@/types/experience';

const experienceData: ExperienceData = [
  {
    company: 'Solve IT',
    period: 'Jun 2019 - Present',
    icon: 'solveit.png',
    positions: [
      {
        role: 'Full-stack Developer',
        period: 'Jan 2021 – Present',
        description: [
          'Odpowiedzialny za tworzenie i utrzymanie aplikacji webowych zarówno po stronie frontendu (interfejs użytkownika), jak i backendu (logika aplikacji, bazy danych).',
          'Zakres prac obejmuje projektowanie architektury systemu, implementację API, integrację z bazami danych, optymalizację wydajności oraz zapewnienie responsywności i intuicyjności interfejsu. Praca często wymaga współpracy z zespołem UX/UI, testerami oraz innymi programistami.',
        ],
        technologies: ['React', 'React', 'React'],
      },
      {
        role: 'Intern',
        period: 'Jun 2019 – Dec 2020',
        description: [
          'W ramach stażu uczestnik wspiera zespół przy rozwoju aplikacji webowych, zarówno po stronie frontendu, jak i backendu. Do głównych zadań należy tworzenie prostych interfejsów użytkownika przy użyciu HTML, CSS i JavaScript, a także pomoc w implementacji logiki po stronie serwera (np. Node.js, Django).',
          'Stażysta współpracuje przy integracji z bazami danych takimi jak PostgreSQL czy MongoDB, pisze podstawowe testy jednostkowe, bierze udział w debugowaniu i poznaje dobre praktyki pracy zespołowej – w tym code review, korzystanie z Gita, a także udział w spotkaniach w ramach Scrum/Agile. Staż ma charakter rozwojowy i nastawiony jest na naukę oraz praktyczne zdobywanie doświadczenia w środowisku produkcyjnym.',
        ],
        technologies: ['React', 'React', 'React'],
      },
    ],
  },
];

export default experienceData;