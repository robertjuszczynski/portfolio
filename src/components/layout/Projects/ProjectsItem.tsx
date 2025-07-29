import { Project } from '@/types/projects';
import React from 'react';
import styles from './ProjectsItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import useTranslate from '@/hooks/useTranslate';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ProjectsItem(props: Project) {
  const { t } = useTranslate();
  const { isMobile } = useMediaQuery();

  return (
    <motion.div
      className={styles.projectItem}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
    >
      <Image
        unoptimized={true}
        className={styles.projectItem__screenshot}
        src={props.imgSrc}
        alt={`${props.name} screenshot`}
        quality={100}
        width={558}
        height={457}
      />
      <div className={styles.projectInfo}>
        <div>
          <p className={styles.projectInfo__name}>{t(props.name)}</p>
          <p className={styles.projectInfo__desc}>{t(props.desc)}</p>
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
                  <LinkIcon width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
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
