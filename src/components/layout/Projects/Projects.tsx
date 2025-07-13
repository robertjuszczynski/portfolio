import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.scss';
import ProjectsList from './ProjectsList';

export default function ProjectsSection() {
  return (
    <section className={styles.projects}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        viewport={{ amount: 1, once: true }}
        className={styles.projectsHeader}
      >
        <p className={styles.projectsHeader__label}>Think. Code. Ship.</p>
        <h2 className={styles.projectsHeader__title}>
          Things I've <span className='globals_text-gradient'>built</span>
        </h2>
        <p className={styles.projectsHeader__desc}>
          Explore our portfolio of exceptional web design and custom Webflow
          websites that drive results for businesses worldwide.
        </p>
      </motion.div>
      <ProjectsList />
    </section>
  );
}
