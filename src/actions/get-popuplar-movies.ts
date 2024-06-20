"use server"

import { Movie, MovieResume } from "@/interfaces"

interface Response {
  ok: boolean,
  popularMovies: MovieResume[],
  message?: string
}

export const getPopularMovies = async(): Promise<Response> => {

  try {
    
    const movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.movies_api_key}&language=en-US&page=1&region=ARG`
    const resp = await fetch(movies_url).then()
    const { results:data } = await resp.json();

    // const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(100000000)

    const movies = data.map( (movie:Movie) => {
      return { poster_path: movie.poster_path,
               image_path: movie.backdrop_path,
               poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
               image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
               id: movie.id,
               title: movie.original_title,
               year: movie.release_date?.slice(0,4)
      }
    })

    return{
      ok: true,
      popularMovies: movies
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error loading movies.',
      popularMovies: []
    }
  }
}
