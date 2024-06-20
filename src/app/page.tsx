'use client';

import { getMovies, getPopularMovies } from '@/actions';
import { MovieItem, PageIntro } from '@/components';
import { MovieResume } from '@/interfaces';
import { useState, useCallback, useEffect } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { debounce } from 'lodash';

export default function SearchPage() {
  const [input, setInput] = useState('');
  const [popularMovies, setPopularMovies] = useState<MovieResume[]>([]);
  const [movies, setMovies] = useState<MovieResume[]>([]);
  const [loading, setLoading] = useState(false);

  const gettingMovies = async () => {
    setLoading(true);
    const { popularMovies } = await getPopularMovies();
    setPopularMovies(popularMovies);
    setLoading(false);
  };

  useEffect(() => {
    gettingMovies();
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInput(query);
    setLoading(true);
    debouncedSearch(query);
  };

  const onInputDelete = () => {
    setInput('');
    setMovies([]);
    setLoading(false);
  };

  return (
    <>
      <div className="search-background"></div>
      <div className="p-10 flex flex-col gap-2 md:gap-4 justify-center w-full z-10 search-content">
        <h1 className="text-2xl md:text-5xl animate__animated animate__fadeInLeft">
          Search a Movie
        </h1>
        <div className="flex flex-row gap-4 items-center animate__animated animate__fadeInLeft">
          <input
            value={input}
            onChange={onInputChange}
            type="text"
            className="py-2 px-4 rounded-3xl bg-white w-96 text-black"
          />
          <IoCloseCircleSharp
            size={44}
            onClick={onInputDelete}
            className="cursor-pointer"
          />
        </div>

        {loading ? (
          <div
            className="flex w-full justify-center items-center"
            style={{ height: '400px' }}
          >
            <div className="loadership_KDFDK"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        ) : (
          <div className="flex-row flex flex-wrap gap-4 justify-center">
            {input.trim() === '' ? (
              <div className="flex flex-col gap-6">
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
            ) : movies.length === 0 && input.trim() !== '' && !loading ? (
              <div className="ml-4 mt-12 text-xl text-left w-full flex justify-start animate__animated animate__fadeIn">
                <span>No results :(</span>
              </div>
            ) : (
              movies.map((movie, idx) => (
                <MovieItem
                  key={`${idx}${movie.id}${movie.title}`}
                  movie={movie}
                />
              ))
            )}
          </div>
        )}
      </div>

      <PageIntro />
    </>
  );
}
