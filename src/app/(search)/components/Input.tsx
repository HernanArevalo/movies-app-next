"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import {  useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'



export const Input = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(searchParams.get('q') || '')
  }, [searchParams])
  

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    router.push(`?q=${query}`);
    setInput(query);
  };

  const onInputDelete = () => {
    router.push('/');
  };

  return (
    <div className="w-72 max-w-full md:w-96 py-1 px-2 flex flex-row gap-0 items-center animate__animated animate__fadeInLeft rounded-3xl overflow-hidden bg-white  justify-between">
          <input
            value={input}
            onChange={onInputChange}
            type="text"
            className="w-full text-black  bg-opacity-75 focus:outline-none pl-2"
            
          />
          <div className="">
            <IoCloseSharp
              size={32}
              color='black'
              onClick={onInputDelete}
              className="cursor-pointer rounded-r-3xl rounded-l-none"
            />
            
          </div>
        </div>
  )
}
