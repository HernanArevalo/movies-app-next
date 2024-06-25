import { PageIntro } from '@/components';

import { Input, MoviesGrid } from './components';

export default function SearchPage() {

  return (
    <>
      <PageIntro />
      <div className="search-background" />

      <div className="pt-8 px-2 md:p-10 md:pt-20 flex flex-col  gap-4 md:gap-24 w-full z-10 search-content justify-start items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold animate__animated animate__fadeInLeft w-fit text-white">
            Search a movie:
          </h1>
          <Input />  
        </div>

        <MoviesGrid />
      </div>
    </>
  );
}
