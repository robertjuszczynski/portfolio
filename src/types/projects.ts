export interface Link {
  name: string;
  src: string;
}

export interface Project {
  name: string;
  desc: string;
  imgSrc: string;
  technologies: string[];
  links: Link[];
  index?: number;
}

export type ProjectsData = Project[]