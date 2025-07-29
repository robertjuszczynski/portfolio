'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { lazy, Suspense, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export const Robot = ({ onReady }: { onReady: () => void }) => {
  const { isMobile } = useMediaQuery();
  const [splineLoading, setSplineLoading] = useState(true);
  useEffect(() => {
    if (!splineLoading) {
      onReady();
    }
  }, [splineLoading]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        onLoad={() => setSplineLoading(false)}
        scene='https://prod.spline.design/Ly3SwDx8y5-TfDP5/scene.splinecode'
        style={{
          width: '100vw',
          position: 'absolute',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          bottom: 0,
        }}
      />
    </Suspense>
  );
};
