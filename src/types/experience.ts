export interface ExperiencePosition {
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface ExperienceCompany {
  company: string;
  period: string;
  icon: string;
  positions: ExperiencePosition[];
}

export type ExperienceData = ExperienceCompany[]