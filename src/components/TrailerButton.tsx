'use client';

import { trailerStore } from '@/app/store';
import { useEffect } from 'react';

export const TrailerButton = () => {
  const { openTrailer, closeTrailer } = trailerStore();

  useEffect(() => {
    closeTrailer();
  }, []);

  const onSubmitOpen = () => {
    openTrailer();
  };

  return (
    <button onClick={onSubmitOpen}>
      <div className="trailer-text rounded">
        <span>TRAILER</span>
      </div>
    </button>
  );
};
