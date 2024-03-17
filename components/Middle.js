"use client"
import React, { useState } from 'react'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});


function Middle() {
  const [active, setActive] = useState("Overview")

  return (
    <>
      <div class="w-screen px-44 py-10 flex flex-col ">
        <div class="flex justify-between items-center ">

          <h1 class={`${poppins.className} text-4xl font-bold `}>Summary</h1>


          <div class="flex justify-center items-center space-x-5">
            <div className='flex justify-center items-center px-5 py-2 bg-black rounded-lg text-white cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Item</h1>
            </div>
            <div className='flex justify-center items-center px-5 py-2 bg-black rounded-lg text-white cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Department</h1>
            </div>
          </div>

        </div>


        {/* <div className='bg-gray-200 shadow-lg h-[1px]  my-10' /> */}

        {/* List of boxes */}
        <div class="grid grid-cols-4 gap-10 py-14 ">
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Chalk</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>High Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Duster</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>Low Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Markers</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>High Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Whiteboard</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>High Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Papers</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>Low Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Ink</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>High Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Others</h1>
            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>High Stock</h1>
          </div>
          <div class="flex flex-col justify-center border border-gray-300 shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg cursor-pointer hover:ease-in transition duration-150 hover:bg-gray-100">
            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>Total</h1>
          </div>
        </div>


      </div>


    </>

  )
}

export default Middle