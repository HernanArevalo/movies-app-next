'use client';
import { MoviesStore } from '@/app/store';
import { useEffect } from 'react';

export const PageIntro = () => {
  const { firstTime, cancelFirstTime } = MoviesStore();

  useEffect(() => {
    if (firstTime) {
      const timer = setTimeout(() => {
        cancelFirstTime();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [firstTime, cancelFirstTime]);

  return (
    <div>
      {firstTime && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-20 pointer-events-none animate__animated animate__fadeOut animate__delay-3s">
          <h1 className="text-white text-4xl animate__animated animate__fadeIn animate__delay-1s">
            Movies App.
          </h1>
        </div>
      )}
    </div>
  );
};
