'use client';

import { lazy, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));
import styles from './Robot.module.scss';

export const Robot = ({ onReady }: { onReady: () => void }) => {
  const [splineLoading, setSplineLoading] = useState(true);
  useEffect(() => {
    if (!splineLoading) {
      onReady();
    }
  }, [splineLoading]);

  return (
    <Spline
      onLoad={() => setSplineLoading(false)}
      scene='https://prod.spline.design/Ly3SwDx8y5-TfDP5/scene.splinecode'
      className={styles.hero__video}
    />
  );
};
