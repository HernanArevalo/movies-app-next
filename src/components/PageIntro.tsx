"use client"
import { MoviesStore } from '@/app/store';
import { useEffect, useState } from 'react'

export const PageIntro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { firstTime, cancelFirstTime } = MoviesStore()
  

  useEffect(() => {
    if (firstTime) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        cancelFirstTime(); // Cancelar después de que la pantalla de carga haya terminado
      }, 3000); // Cambia el tiempo según sea necesario

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [firstTime, cancelFirstTime]);

  return (
    <div>
      {isLoading && firstTime && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-20  animate__animated animate__fadeOut animate__delay-3s">
          <h1 className="text-white text-4xl animate__animated animate__fadeIn animate__delay-1s">Movies App</h1>
        </div>
      )}
    </div>
  );
}