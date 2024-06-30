import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { IoSearch } from 'react-icons/io5';
import { TbMovieOff } from 'react-icons/tb';

import { getMovieById } from '@/actions';
import { TrailerButton, TrailerComponent } from './components';
import { scoreToRgb } from '@/utils';

import './page.css';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params

  const { movie } = await getMovieById(id)


  return {
    title: `${movie?.title} | Movies App` ?? 'Movies App',
    description: movie?.story ?? '',
    openGraph: {
      title: movie?.title ?? 'Producto no encontrado',
      description: movie?.story ?? '',
      images: [`${movie?.backdrop}`],
    },
  }
}


export default async function MoviePage({ params }: Props) {
  const { id } = params;

  const { ok, movie } = await getMovieById(id);

  if (!ok) {
    redirect(`/`);
  }

  const scoreColor = scoreToRgb(movie?.vote);

  return (
    <>
      <div
        className="movie-container animate__animated animate__fadeIn"
        style={{ backgroundImage: `url(${movie?.backdrop})` }}
      >
        <div className="main-container animate__animated animate__fadeRight">
          <div className="upper-container">
            <div className="title flex justify-center items-end gap-0 flex-col">
              <h3 className="font-extrabold">{movie?.title.toUpperCase()}</h3>
              <span
                className="w-9 h-9 text-lg flex justify-center items-center rounded text-black"
                style={{ backgroundColor: scoreColor }}
              >
                {movie?.vote}
              </span>
            </div>

            <div className="info-container">
              <div className="year-genders flex flex-col gap-5 items-end">
                <div className="flex flex-row gap-2 items-center">
                  {movie?.providers.length > 0 ? (
                    movie?.providers.map((provider: any) => (
                      // <Link key={provider.logo_path} href={''}>
                      <Image
                        src={`${provider.url}`}
                        alt=""
                        width={48}
                        height={48}
                        key={provider.logo_path}
                      />
                    ))
                  ) : (
                    // </Link>
                    <div className="bg-gray-600 p-2 rounded">
                      <TbMovieOff color="white" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span className=" flex justify-center items-center">
                    {movie?.year}
                  </span>
                  <span className=" flex justify-center items-center">|</span>
                  <span className="font-normal flex justify-center items-center">
                    {movie?.genres.join(', ')}
                  </span>
                </div>
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
                  <a href={movie!.poster} target="_blank">
                    <Image
                      src={movie!.poster}
                      alt=""
                      className="h-44 w-auto"
                      width={300}
                      height={300}
                    />
                  </a>
                </div>
                <div className="flex flex-row md:flex-col gap-4">
                  <TrailerButton />
                  <a
                    href={movie!.backdrop}
                    download={movie!.title}
                    target="_blank"
                  >
                    <div className="trailer-text rounded">
                      <span>WALLPAPER</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="tagline-container animate__animated animate__slideInLeft">
              <h4>{movie?.tagline}</h4>
            </div>
          </div>

          <footer className="animate__animated animate__fadeInUp">
            <div className="flex flex-row gap-4 md:gap-16 xl:gap-32 justify-evenly">
              <span className="font-light text-center">{movie?.actor1}</span>
              <span>|</span>
              <span className="font-light text-center">{movie?.actor2}</span>
              <span>|</span>
              <span className="font-light text-center">{movie?.actor3}</span>
            </div>
          </footer>
        </div>

        <Link href={'/'}>
          <div className="search-icon">
            <IoSearch size={32} />
          </div>
        </Link>
      </div>

      <TrailerComponent trailer={movie?.trailer ?? ''} id={movie?.id} />
    </>
  );
}
