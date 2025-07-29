import React, { memo } from 'react';
import styles from './Projects.module.scss';
import ProjectsList from './ProjectsList';

const ProjectsSection = () => {
  return (
    <section id="projects" className={styles.projects}>
      <ProjectsList />
    </section>
  );
}

export default memo(ProjectsSection);
