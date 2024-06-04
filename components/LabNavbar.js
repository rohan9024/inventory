import React, { useContext, useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});


function LabNavbar() {

    const { lab, setLab } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {

        const isLab = localStorage.getItem("isLab") === "true" || '';

        if (!isLab) {
            router.push('lab-login');
        }
    }, [])

    return (
        <>
            <div class="w-screen py-6 px-10 flex justify-between items-center">
                <Link href="/" class={`${poppins.className} text-lg font-medium cursor-pointer`}>SIES Graduate School of Technology</Link>
                <div class="flex justify-center items-center space-x-10">
                    <Link href="/lab-panel" class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition  hover:text-gray-400`}>Lab Panel</Link>
                    <div onClick={() => {
                        router.push('/lab-login');
                        if (typeof window !== 'undefined') {
                            localStorage.setItem("isLab", "false") || ''
                        }
                    }}>
                        <div class={`${poppins.className} text-sm font-medium cursor-pointer hover:ease-in transition  hover:text-gray-400`}>
                            <h1>Logout</h1>
                        </div>
                    </div>

                </div>
            </div>
            <div className='bg-gray-300 h-[1px] ' />


        </>

    )
}

export default LabNavbar