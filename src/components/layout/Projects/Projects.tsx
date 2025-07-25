import React from 'react';
import styles from './Projects.module.scss';
import ProjectsList from './ProjectsList';

export default function ProjectsSection() {
  return (
    <section className={styles.projects}>
      <ProjectsList />
    </section>
  );
}
