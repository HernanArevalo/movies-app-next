"use client"

import { getMovies } from "@/actions";
import { MovieItem } from "@/components";
import { MovieResume } from "@/interfaces";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";


export default function SearchPage() {

  const [input, setInput] = useState("")
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
      <div className="p-10 flex flex-col gap-2 md:gap-4 justify-center w-full z-10 search-content">
        <h1 className="text-2xl md:text-5xl animate__animated animate__fadeInLeft">Search a Movie</h1>
        <div className="flex flex-row gap-4 items-center animate__animated animate__fadeInLeft">
          <input value={input}  onChange={onInputChange} type="text" className="py-2 px-4 rounded-3xl bg-white w-96 text-black"/>
          <IoCloseCircleSharp size={44} onClick={onInputDelete} className="cursor-pointer"/>
        </div>
        <div className="flex-row flex flex-wrap gap-4 justify-center">
          { movies.map((movie, idx) =>(
            <MovieItem key={`${idx}${movie.id}${movie.title}`} 
                       movie={movie}
            />
          ))

          }
        </div>
      </div>
    </>
  );
}