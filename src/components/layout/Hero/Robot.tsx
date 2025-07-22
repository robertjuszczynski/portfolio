import { lazy, Suspense, useState } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export const Robot = () => {
const [splineLoading, setSplineLoading] = useState<boolean>(true);
return (
    <div className="flex w-screen !mt-[-580px] !mb-[-30px] z-[-1]">
            <Suspense fallback={<div>Loading...</div>}>
                <Spline onLoad={() => setSplineLoading(false)} scene="https://prod.spline.design/Ly3SwDx8y5-TfDP5/scene.splinecode" />
                {splineLoading && (
                    <div>Loading...</div>
                )}
            </Suspense>
    </div>
);
};