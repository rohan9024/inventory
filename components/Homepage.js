import React, { useState } from 'react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});


function Homepage() {

    return (
        <>
            <div class="w-screen py-6 px-10 flex justify-between items-center">
                <Link href="/" class={`${poppins.className} text-lg font-medium cursor-pointer`}>SIES Graduate School of Technology</Link>

                <div class="flex justify-center items-center space-x-10">
                    <Link href="/" class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition duration-150 hover:text-gray-400`}>Inventory</Link>
                    <Link href="/departments" class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition duration-150 hover:text-gray-400`}>Departments</Link>
                    <Link href="/profile" class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition duration-150 hover:text-gray-400`}>Profile</Link>
                </div>

            </div>
            <div className='bg-gray-300 h-[1px] ' />

            <div class="flex justify-center items-center">
                <h1 class={`${poppins.className} text-3xl font-bold `}>Select one to proceed</h1>
                <div className='flex justify-center items-center space-x-10'>
                    <div className='border border-gray-900 shadow-lg px-10 py-2 '>
                        <h1 class={`${poppins.className} text-lg font-medium cursor-pointer rounded-2xl`}>Admin Login</h1>
                    </div>
                    <div className='border border-gray-900 shadow-lg '>
                        <h1 class={`${poppins.className} text-lg font-medium cursor-pointer  rounded-2xl
                        `}>Lab Login</h1>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Homepage