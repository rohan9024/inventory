"use client"

import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Navbar';
import { Inter, Raleway } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../../contexts/AuthContext"
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { Poppins } from 'next/font/google';


import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

function page() {
    const router = useRouter();
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [period, setPeriod] = useState('AM');

    const [fetch, setFetch] = useState(false)

    const [bookingObj, setBookingObj] = useState([])
  
    useEffect(() => {
      if (!fetch) {
        const fetchBookingObj = async () => {
          const querySnapshot = await getDocs(collection(db, "auditorium-bookings"));
          const fetchedBookings = [];
  
          querySnapshot.forEach((doc) => {
            fetchedBookings.push({ id: doc.id, date: doc.data().date, eventName: doc.data().eventName,time: doc.data().time, });
          });
  
          setBookingObj(fetchedBookings);
          setFetch(true);
        }
  
        fetchBookingObj();
      }
    }, [fetch]);


    const handleHoursChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0 && value <= 12) {
            setHours(value);
        }
    };

    const handleMinutesChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0 && value < 60) {
            setMinutes(value);
        }
    };



    const { admin, setAdmin } = useContext(AuthContext);

    const notifySuccess = () => toast.success('Logged in successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyError = () => toast.error('Invalid username or password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyMissingCredentials = () => toast.error('Missing Credentials', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyMissingUsername = () => toast.error('Please Enter Username', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyMissingPassword = () => toast.error('Please Enter Password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('12:00');

    const handlePeriodDropdown = (period) => {
        setPeriod(period);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
    };
    const minDate = new Date("11/22/2019 12:00 PM");
    const maxDate = new Date("11/25/2019 5:00 PM");

    const periodList = [
        "AM",
        "PM"

    ]



    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='w-screen flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center p-20  my-28 rounded-lg space-y-5 border border-gray-200 shadow-lg '>
                    <h1 className={`${raleway.className} text-4xl font-bold mb-10`}>Auditorium Booking </h1>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-10 '>

                        <div className="mb-4 flex justify-center items-center ">
                            <h1 className={`${inter.className} text-md font-bold mr-5`}>Select Date</h1>

                            <DatePicker dateFormat="dd/MM/yyyy" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                        </div>

                        <div className='flex justify-center items-center space-x-10'>
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <h1 className="font-bold text-md">Hours</h1>
                                <input
                                    type="number"
                                    value={hours}
                                    onChange={handleHoursChange}
                                    className='outline-none border border-gray-500 bg-transparent w-14 px-2 py-2 rounded-lg'
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <h1 className="font-bold text-md">Minutes</h1>
                                <input
                                    type="number"
                                    value={minutes}
                                    onChange={handleMinutesChange}
                                    className='outline-none border border-gray-500 bg-transparent w-14 px-2 py-2 rounded-lg'
                                />
                            </div>
                            <div className="flex flex-col justify-start items-center space-y-4">
                                <h1 className="text-md font-bold">Period</h1>
                                <select
                                    value={period}
                                    onChange={handlePeriodDropdown}
                                    className="block w-20 px-2 py-2 rounded-lg leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                >
                                    {periodList.map((period, index) => (
                                        <option key={index} value={period}>
                                            {period}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div onClick={handleSubmit} type="submit" class="cursor-pointer relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-50 w-72 mx-auto">
                            <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="relative text-center text-md">Book Now</span>
                        </div>

                    </form>
                </div>

                <div class="w-screen px-44 py-10 flex flex-col ">
                    <div class="flex justify-between items-center ">
                        <h1 class={`${poppins.className} text-4xl font-bold `}>Existing Bookings</h1>
             
                    </div>
                </div>


                {/* List of boxes */}
                <div class="grid grid-cols-4 gap-10 py-14 ">
                    {bookingObj.map((booking) => (
                        <div class="flex flex-col justify-center border border-gray-300 shadow-md min-w-[250px] h-[180px] px-5 rounded-lg ">
                            <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>{booking.date}</h1>
                            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer `}>{booking.time}</h1>
                            <h1 class={`${poppins.className} text-md font-medium  cursor-pointer `}>{booking.eventName}</h1>

                            <div className='flex justify-end items-end space-x-2 '>

                                <div class="mt-10 cursor-pointer " onClick={() => setEditItem(item)} >
                                    <img src="/edit.png" alt="edit" className='w-7 h-7' />
                                </div>
                                <div class="mt-10 cursor-pointer " onClick={() => deleteItem(item)} >
                                    <img src="/delete.png" alt="delete" className='w-7 h-7' />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>


            </div>
        </>

    )
}

export default page