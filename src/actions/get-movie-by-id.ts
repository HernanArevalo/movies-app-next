'use server';

import { CastMember, Flatrate, Genre, Result } from '@/interfaces';

export const getMovieById = async (id: string) => {
  try {
    const movieUrl = `https://api.themoviedb.org/3/movie/${encodeURI(
      id
    )}?api_key=${process.env.movies_api_key}&language=en-US`;
    const resp = await fetch(movieUrl);
    const movieData = await resp.json();

    const creditsUrl = `https://api.themoviedb.org/3/movie/${encodeURI(
      id
    )}/credits?api_key=${process.env.movies_api_key}&language=en-US`;
    const resp2 = await fetch(creditsUrl);
    const creditsData = await resp2.json();

    const genres: string[] = movieData.genres
      .slice(0, 2)
      .map((gender: Genre) => gender.name);

    let actors = creditsData.cast
      .slice(0, 3)
      .map((actor: CastMember) => actor.name);

    const director =
      creditsData.crew.filter(
        (member: CastMember) => member.job == 'Director'
      )[0].name ?? '-';

    const providersUrl = `https://api.themoviedb.org/3/movie/${encodeURI(
      id
    )}/watch/providers?api_key=${process.env.movies_api_key}`;
    const providersFetch = await fetch(providersUrl);
    const providersList = await providersFetch
      .json()
      .then((r) => r.results.AR?.flatrate);

    let providers;
    if (providersList == undefined) {
      providers = [];
    } else {
      providers =
        providersList.filter(
          (provider: Flatrate) => provider.provider_name !== 'HBO Max'
        ) ?? [];
      providers.forEach((provider: Flatrate) => {
        provider.url =
          'https://image.tmdb.org/t/p/original' + provider.logo_path;
      });
    }

    const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0b8f2d2a77497c17a0f15b1d4edfa0f8&language=en-US`;
    const resp3 = await fetch(trailerUrl);
    const { results: movieVideos } = await resp3.json();

    const movieTrailerId = movieVideos.find(
      (movie: Result) => movie.type === 'Trailer'
    )?.key;

    const videoUrl = `https://www.youtube.com/embed/${movieTrailerId}`;

    const movie = {
      id: movieData.id,
      backdrop: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
      poster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
      genres: genres,
      title: movieData.title,
      story: movieData.overview,
      tagline: movieData.tagline,
      year: movieData.release_date?.slice(0, 4),
      actor1: actors[0] || '',
      actor2: actors[1] || '',
      actor3: actors[2] || '',
      director: director || '',
      trailer: videoUrl,
      vote: Number(movieData.vote_average.toFixed(1)),
      providers: providers,
    };

    return {
      ok: true,
      movie: movie,
    };
  } catch (e) {
    console.log(e);

    return {
      ok: false,
      message: 'Error loading movie',
    };
  }
};
