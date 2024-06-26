import React, { useState } from 'react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});


function Navbar() {

    return (
        <>
            <div class="w-screen py-6 px-10 flex justify-between items-center">
                <Link href="/" class={`${poppins.className} text-lg font-medium cursor-pointer`}>SIES Graduate School of Technology</Link>
                <div class="flex justify-center items-center space-x-10">
                    <Link href="/admin-panel" class={`${poppins.className} text-sm font-medium cursor-pointer  hover:text-gray-400`}>Inventory</Link>
                    <Link href="/auditorium-booking" class={`${poppins.className} text-sm font-medium cursor-pointer   hover:text-gray-400`}>Auditorium Booking</Link>
                    <Link href="/view-requests" class={`${poppins.className} text-sm font-medium cursor-pointer   hover:text-gray-400`}>View Requests</Link>
                    <Link href="/departments" class={`${poppins.className} text-sm font-medium cursor-pointer  hover:text-gray-400`}>Departments</Link>
                    <Link href="/profile" class={`${poppins.className} text-sm font-medium cursor-pointer  hover:text-gray-400`}>Profile</Link>
                </div>
            </div>
            <div className='bg-gray-300 h-[1px] ' />


        </>

    )
}

export default Navbar