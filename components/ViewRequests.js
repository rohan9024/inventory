import React, { useState } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function ViewRequests() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            timestamp: '07/08/2023',
            items: [{ 'Marker': 100 }, { 'Chalk': 200 }],
            dept: 'CE'
        }
    ]);


    
    async function accept(itemName, quantity, dept) {
        console.log(itemName, quantity, dept);
    }

    function reject(itemId) {
        setRequests(prevRequests => {
            const updatedRequests = prevRequests.map(item => {
                if (item.id === itemId) {
                    const filteredItems = item.items.filter(it => Object.keys(it)[0] !== itemName);
                    return { ...item, items: filteredItems };
                }
                return item;
            });
            return updatedRequests.filter(item => item.items.length > 0); // Remove items with empty list
        });
    }


    return (
        <div className='my-28 flex justify-center items-center'>
            {requests.map((item) => (
                <div key={item.id} className='flex flex-col space-y-4 justify-start items-start border border-gray-200 shadow-lg rounded-lg px-5 py-3'>
                    <h1 className={`${inter.className} text-md font-bold`}>Department {item.dept}</h1>
                    {item.items.map((it, index) => (
                        Object.entries(it).map(([itemName, quantity]) => (
                            <div key={index} className='flex justify-evenly items-center space-x-10'>
                                <h2>{itemName}: {quantity}</h2>
                                <div className='flex justify-around items-center space-x-4'>
                                    <div onClick={() => accept(itemName, quantity, item.dept)} className='p-4 rounded-full hover:bg-green-400 flex justify-around items-center cursor-pointer'>
                                        <img src='/accept.png' alt="accept" className='w-5 h-5' />
                                    </div>
                                    <div onClick={() => reject(item.id)} className='p-4 rounded-full hover:bg-red-400 flex justify-around items-center cursor-pointer'>
                                        <img src="/reject.png" alt="reject" className='w-5 h-5' />
                                    </div>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ViewRequests;
