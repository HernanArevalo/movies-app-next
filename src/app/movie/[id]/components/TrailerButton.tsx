'use client';

import { MoviesStore } from '@/app/store';
import { useEffect } from 'react';

export const TrailerButton = () => {
  const { openTrailer, closeTrailer } = MoviesStore();

  useEffect(() => {
    closeTrailer();
  }, [closeTrailer]);

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
