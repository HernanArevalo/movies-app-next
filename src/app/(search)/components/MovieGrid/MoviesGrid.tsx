'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { getMovies, getPopularMovies } from '@/actions';
import { MovieItem } from '../MovieItem';
import { MovieResume } from '@/interfaces';
import { Loading } from '@/components';
import { debounce } from 'lodash';

export const MoviesGrid = () => {
  const [movies, setMovies] = useState<MovieResume[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [popularMovies, setPopularMovies] = useState<MovieResume[]>([]);

  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const gettingPopularMovies = async () => {
    setLoading(true);
    const { popularMovies } = await getPopularMovies();
    setPopularMovies(popularMovies);
    setLoading(false);
  };
  useEffect(() => {
    gettingPopularMovies();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === '') {
        setMovies([]);
        setLoading(false);
        return;
      }

      const { movies } = await getMovies(query);
      setMovies(movies);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    setLoading(true)
    debouncedSearch(queryParam);
  }, [queryParam, debouncedSearch]);

  return (
    loading ? 
    <Loading />
    :
    (<div className="flex-row flex flex-wrap gap-4 justify-center">
      {queryParam === '' ? (
        <div className="flex flex-col gap-6 w-full">
          <span className="text-3xl">Popular Movies:</span>
          <div className="flex-row flex flex-wrap gap-4 justify-center">
            {popularMovies.slice(0, 8).map((movie, idx) => (
              <MovieItem
                key={`${idx}${movie.id}${movie.title}`}
                movie={movie}
              />
            ))}
          </div>
        </div>
      ) : movies.length === 0 && queryParam !== '' ? (
        <div className="ml-4 mt-12 text-xl text-left w-full flex justify-start animate__animated animate__fadeIn">
          <span>No results :(</span>
        </div>
      ) : (
        movies.map((movie, idx) => (
          <MovieItem key={`${idx}${movie.id}${movie.title}`} movie={movie} />
        ))
      )}
    </div>)
  )
}
