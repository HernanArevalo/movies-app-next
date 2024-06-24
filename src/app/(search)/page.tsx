import { PageIntro } from '@/components';

import { Input, MoviesGrid } from './components';
import { Metadata } from 'next';

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
