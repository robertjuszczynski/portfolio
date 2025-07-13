import React from 'react'
import projectsData from '@/data/projectsData'
import ProjectsItem from './ProjectsItem'
import styles from './ProjectsList.module.scss';

export default function ProjectsList() {
  return (
    <div className={styles.projectsList}>
      {projectsData.map((proj, index) => {
        return <ProjectsItem index={index} key={`${proj.name}${index}`} {...proj} />
      })}
    </div>
  )
}
