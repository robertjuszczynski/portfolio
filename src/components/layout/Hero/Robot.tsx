'use client';

import { lazy, Suspense, useState, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export const Robot = ({
  onReady,
}: {
  onReady: () => void;
}) => {
  const [splineLoading, setSplineLoading] = useState(true);
  useEffect(() => {
    if (!splineLoading) {
      onReady();
    }
  }, [splineLoading]);

  return (
    <div className='flex w-screen !mt-[-580px] !mb-[-30px] z-[-1]'>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          onLoad={() => setSplineLoading(false)}
          scene='https://prod.spline.design/Ly3SwDx8y5-TfDP5/scene.splinecode'
        />
        {splineLoading && <div>Loading...</div>}
      </Suspense>
    </div>
  );
};
