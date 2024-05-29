import { getMovieById } from '@/actions';
import { redirect } from 'next/navigation';
import './page.css';
import Link from 'next/link';
import { TrailerComponent } from '@/components';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';
import { DowloadBackdrop } from '@/components/DowloadBackdrop';

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = params;

  const { ok, movie } = await getMovieById(id);

  if (!ok) {
    redirect('/search');
  }

  return (
    <>
      <div
        className="movie-container animate__animated animate__fadeIn "
        style={{ backgroundImage: `url(${movie?.backdrop})` }}
      >
        <div className="main-container">
          <div className="upper-container">
            <div className="title animate__animated animate__fadeInRight">
              <h3 className="font-extrabold">{movie?.title.toUpperCase()}</h3>
            </div>

            <div className="info-container animate__animated animate__fadeInRight">
              <div className="year-genders animate__animated animate__fadeInRight">
                {movie != null && (
                  <span>
                    {movie.year} | {movie.genre1}, {movie.genre2}
                  </span>
                )}
              </div>
              <div className="story-title flex flex-row gap-5 justify-end pr-5">
                <h4>The Story</h4>
                <span>|</span>
              </div>
              <div className="story animate__animated animate__fadeInRight">
                <p className="font-light text-justify">{movie?.story}</p>
              </div>

              <div className="directing-title flex flex-row gap-5 justify-end pr-5">
                <h4>Directing</h4>
                <span>|</span>
              </div>
              <div className="director animate__animated animate__fadeInRight">
                <p className="font-light">{movie?.director}</p>
              </div>

              <div className="multimedia-container trailerActive animate__animated animate__fadeInRight">
                <div className="poster">
                  <Image
                    src={movie!.poster}
                    alt=""
                    className="h-44 w-auto"
                    width={300}
                    height={300}
                  />
                </div>
                <Link href={`./trailer`}>
                  <div className="trailer-text">
                    <span>TRAILER</span>
                    <i className="bx bxs-right-arrow"></i>
                  </div>
                </Link>
								<DowloadBackdrop url={movie!.backdrop} title={movie!.title}/>
              </div>
            </div>

            <div className="tagline-container animate__animated animate__slideInLeft">
              <h4>{movie?.tagline}</h4>
            </div>
          </div>

          <footer className="animate__animated animate__fadeInUp">
            <div className="flex flex-row gap-4 md:gap-16 xl:gap-32 justify-evenly">
              <span className="font-light">{movie?.actor1}</span>
              <span>|</span>
              <span className="font-light">{movie?.actor2}</span>
              <span>|</span>
              <span className="font-light">{movie?.actor3}</span>
            </div>
          </footer>
        </div>

        {/* <TrailerComponent
                              trailer={ movie?.trailer }
                              id={ movie?.id }
                /> */}

        <Link href={'/'}>
          <div className="search-icon">
            <IoSearch size={32} />
          </div>
        </Link>
      </div>
    </>
  );
}
