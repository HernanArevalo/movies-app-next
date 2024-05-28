import { getMovieById } from "@/actions";
import { redirect } from "next/navigation";
import './page.css'
import Link from "next/link";
import { TrailerComponent } from "@/components";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {

  const { id } = params

  const { ok, movie } = await getMovieById(id)

  if (!ok) {
    redirect('/search');
  }

  return (
    <>
        <div className="movie-container animate__animated animate__fadeIn " style={ { backgroundImage: `url(${movie?.backdrop})`} }>
            <div className="main-container"> 

                
                <div className="upper-container">

                

                    <div className="title animate__animated animate__fadeInRight">
                        <h3>{ movie?.title.toUpperCase() }</h3>
                    </div>

                    <div className="info-container animate__animated animate__fadeInRight">

                        <div className="year-genders animate__animated animate__fadeInRight">
                            {
                                movie != null &&
                                (<span>{ movie.year }     |     {movie.genre1}, {movie.genre2}</span>)
                            }
                        </div>
                        <div className="story-title">
                            <h4>The Story</h4>
                        </div>
                        <div className="story animate__animated animate__fadeInRight">
                            <p> 
                                { movie?.story }
                            </p>
                        </div>

                        <div className="directing-title">
                            <h4>Directing</h4> 
                        </div>
                        <div className="director animate__animated animate__fadeInRight">
                            <p> 
                                { movie?.director }
                            </p>
                        </div>

                        <div className='multimedia-container trailerActive animate__animated animate__fadeInRight'>
                            <div className="poster">
                                <Image  src={ movie!.poster } alt="" className="poster-img" width={300} height={300}/>
                            </div>
                            <Link href={`./trailer`}>
                                <div className="trailer-text">
                                    <span>TRAILER</span>
                                    <i className='bx bxs-right-arrow'></i>
                                </div>
                            </Link>
                        </div>

                    </div>
                    
                    <div className="tagline-container animate__animated animate__slideInLeft">
                        <h4>{ movie?.tagline }</h4>
                    </div>

                </div>

                <footer className="footer animate__animated animate__fadeInUp">
                    <div className='footer'>
                        {movie?.actor1}          |          {movie?.actor2}          |          {movie?.actor3}

                    </div>
                </footer>


            </div>

                {/* <TrailerComponent
                              trailer={ movie?.trailer }
                              id={ movie?.id }
                /> */}


            <Link href={`/search`}>
                <div className='search-icon'>
                    <i className='bx bx-search-alt-2' ></i>
                </div>
            </Link>

        </div>
    </>
  );
}