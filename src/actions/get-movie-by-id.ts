'use server'

import { Cast, Result } from "@/interfaces"

export const getMovieById = async(id: string) => {

  try {
    
    const movieUrl = `https://api.themoviedb.org/3/movie/${encodeURI(id)}?api_key=${process.env.movies_api_key}&language=en-US`
    const resp = await fetch(movieUrl)
    const movieData = await resp.json()

    const creditsUrl = `https://api.themoviedb.org/3/movie/${encodeURI(id)}/credits?api_key=${process.env.movies_api_key}&language=en-US`;
    const resp2 = await fetch(creditsUrl);
    const creditsData = await resp2.json();
    
    const actors = [ creditsData.cast[0].name, creditsData.cast[1].name, creditsData.cast[2].name ]
    const director = creditsData.crew.filter( (member:Cast) => member.known_for_department == "Directing")[0].name

    const genres = [ movieData.genres[0].name, movieData.genres[1].name]
        

    const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0b8f2d2a77497c17a0f15b1d4edfa0f8&language=en-US`
    const resp3 = await fetch(trailerUrl);
    const { results:movieVideos } = await resp3.json();

    const { key:movieTrailerId } = movieVideos.find((movie:Result) => movie.type === 'Trailer');


    const videoUrl = `https://www.youtube.com/embed/${ movieTrailerId }`



    const movie = { id: movieData.id,
                    backdrop: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
                    poster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
                    genre1: genres[0],
                    genre2: genres[1],
                    title: movieData.title,
                    story: movieData.overview,
                    tagline: movieData.tagline,
                    year: (movieData.release_date)?.slice(0,4),
                    actor1: actors[0],
                    actor2: actors[1],
                    actor3: actors[2],
                    director: director,
                    trailer: videoUrl,
                    vote: movieData.vote_average
                }

    return{
      ok: true,
      movie: movie
    }
  } catch (e) {
    console.log(e)

    return {
      ok: false,
      message: 'Error loading movie'
    }
  }
}
