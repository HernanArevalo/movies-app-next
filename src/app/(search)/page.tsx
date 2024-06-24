import { PageIntro } from '@/components';

import { Input, MoviesGrid } from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies App',
  description: 'Find a movie to watch. See the providers,the ratings and other information. An informative movie platform powered by React.js to explore and discover details about your favorite films.',
}

export default function SearchPage() {

  return (
    <>
      <PageIntro />
      <div className="search-background" />

      <div className="p-10 flex flex-col gap-2 md:gap-4 w-full z-10 search-content">
        <h1 className="text-2xl md:text-5xl animate__animated animate__fadeInLeft w-fit">
          Search a Movie
        </h1>
        <Input />  

        <MoviesGrid />
      </div>
    </>
  );
}
