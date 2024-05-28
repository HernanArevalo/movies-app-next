import { MovieResume } from '@/interfaces';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props{
  movie: MovieResume
}


export const MovieItem = ({movie}:Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>{ isLoaded?
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div
            className="w-64 h-32 text-white font-normal rounded-xl bg-gray-900 
                       animate__animated animate__fadeIn animate__delay-1s
                       flex justify-center items-center text-center shadow-sm
                       bg-cover bg-center hover:scale-110 transition-all cursor-pointer"
            style={
              movie.image_path != null
                ? { backgroundImage: `url(${movie.image})` }
                : movie.poster_path != null
                ? { backgroundImage: `url(${movie.poster})` }
                : { backgroundImage: `url()` }
              }
              >
            <div
              className="bg-black bg-opacity-50 p-2 w-full"
              style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}
              >
              {movie.title}
            </div>
          </div>
        </Link>
        :
        <div className="">
          Loading
        </div>
  
      }

    </>
  );
};
