"use client"

import { getMovies } from "@/actions";
import { MovieResume } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";



export default function SearchPage() {

  const [input, setInput] = useState("harry potter")
  const [movies, setMovies] = useState<MovieResume[]>([])


  const onInputChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    const { movies } = await getMovies(e.target.value)
    setMovies(movies)

  }

  const onInputDelete = () =>{
    setInput('')
  }


  

  return (
    <>
      <div className="search-background">
        
      </div>
      <div className="p-10 flex flex-col gap-4 justify-center w-full z-10 search-content">
        <h1 className="text-5xl">Search a Movie</h1>
        <div className="flex flex-row gap-4 items-center">
          <input value={input}  onChange={onInputChange} type="text" className="py-2 px-4 rounded-3xl bg-white w-96 text-black"/>
          <IoCloseCircleSharp size={44} onClick={onInputDelete} className="cursor-pointer"/>
        </div>
        <div className="flex-row flex flex-wrap gap-4 justify-center">
          { movies.map(movie =>(
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="w-64 h-32 text-white font-normal bg-gray-900 rounded-xl 
                              flex justify-center items-center text-center shadow-sm
                              bg-cover bg-center hover:scale-110 transition-all cursor-pointer" 
                  style= { movie.image_path != null ? 
                    { backgroundImage: `url(${movie.image})` }
                    : (
                      movie.poster_path != null? 
                      { backgroundImage: `url(${movie.poster})`}
                      : 
                      { backgroundImage: `url()`})
                      
                    }
              >
                <div className="bg-black bg-opacity-50 p-2 w-full" style={{boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", }}>
                  {movie.title}
                </div>
              </div>
            </Link>
          ))

          }
        </div>
      </div>
    </>
  );
}