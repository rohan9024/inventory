import React, { useState } from 'react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});


function LabNavbar() {

    return (
        <>
            <div class="w-screen py-6 px-10 flex justify-between items-center">
                <Link href="/" class={`${poppins.className} text-lg font-medium cursor-pointer`}>SIES Graduate School of Technology</Link>
                <div class="flex justify-center items-center space-x-10">
                    <Link href="/lab-panel" class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition  hover:text-gray-400`}>Lab Panel</Link>
                </div>
            </div>
            <div className='bg-gray-300 h-[1px] ' />


        </>

    )
}

export default LabNavbar