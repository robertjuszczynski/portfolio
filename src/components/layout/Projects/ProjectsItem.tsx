import { Project } from '@/types/projects';
import React from 'react';
import styles from './ProjectsItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsItem(props: Project) {
  const flexDirection = props.index! % 2 === 0 ? true : false;

  return (
    <motion.div
      className={styles.projectItem}
      style={{
        flexDirection: flexDirection ? 'row' : 'row-reverse',
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
      initial={{
        position: 'relative',
        opacity: 0,
        x: flexDirection ? -50 : 50
      }}
      whileInView={{
        opacity: 1,
        x: 0
      }}
      viewport={{
        once: true,
        amount: 1
      }}
      transition={{
        duration: 1,
        ease: 'easeIn'
      }}
    >
      <Image
        className={styles.projectItem__screenshot}
        src='/images/screenshots/000.png'
        alt={`${props.name} screenshot`}
        width={558}
        height={457}
      />
      <div className={styles.projectInfo}>
        <div>
          <p className={styles.projectInfo__name}>{props.name}</p>
          <p className={styles.projectInfo__desc}>{props.desc}</p>
        </div>
        <div>
          <div className={styles.projectInfo__divider}></div>
          <div className={styles.projectInfo__technologies}>
            {props.technologies.map((tech) => {
              return <div className={styles.projectInfo__techTag}>{tech}</div>;
            })}
          </div>
          <div className={styles.projectInfo__links}>
            {props.links.map((link) => {
              return (
                <div className={styles.projectInfo__linksItem}>
                  <LinkIcon />
                  <Link href={link.src}>{link.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
