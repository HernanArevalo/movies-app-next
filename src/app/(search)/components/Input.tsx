"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import {  useEffect, useState } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'



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
    <div className="flex flex-row gap-4 items-center animate__animated animate__fadeInLeft">
          <input
            value={input}
            onChange={onInputChange}
            type="text"
            className="py-2 px-4 rounded-3xl bg-white w-96 text-black"
          />
          <IoCloseCircleSharp
            size={44}
            onClick={onInputDelete}
            className="cursor-pointer"
          />
        </div>
  )
}
