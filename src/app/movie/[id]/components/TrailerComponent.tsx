"use client"
import { MoviesStore } from '@/app/store';
import './TrailerComponent.css';
import clsx from 'clsx';

interface Params{
  trailer: string,
  id: string,
}

export const TrailerComponent = ( {trailer, id }: Params ) => {

  const trailerOpened = MoviesStore(state => state.trailerOpened)
  const closeTrailer = MoviesStore(state => state.closeTrailer)

  return (
      <section  onClick={ ()=>closeTrailer() }
                className={clsx('fixed top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center',
                                'animate__animated animate__fadeInRight transition-all tran',
                                'fixed translate-x-1/2 duration-500',
                                trailerOpened? '' : 'hidden'
                  
                )} >
                  
        <iframe 
                className='animate__animated animate__fadeInRight'
                src={ trailer }
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
                
        </iframe>
      </section>
  )
}
