"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import Navbar from '../../../../components/Navbar';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { createAllocatedInventoryService, getAllocatedInventoryService, getAllocatedNotInventoryService } from '../../../../services/DepartmentService';
import { getInventoryById, updateInventoryService } from '../../../../services/InventoryService';
import { deleteAllocatedNotInventoryService, updateAllocatedNotInventoryService } from '../../../../services/InventoryAssignedToDeptService';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';

const poppins = Poppins({
    weight: ['100', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
});


function DepartmentProps({ params }) {
    const [timetableObj, setTimetableObj] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [tabTimetable, setTabTimetable] = useState([]);
    const [fetch, setFetch] = useState(true);
    const [allocationModal, setAllocationModal] = useState(false);
    const [inventoryName, setInventoryName] = useState("")
    //const [deptId , setDeptId] = useState("")
    const [allocatedQuantity, setAllocatedQuantity] = useState("")

    // hithe tujhe items ghaal
    const itemList = [
        "Marker",
        "Chalk",
    ]
    const [item, setItem] = useState(itemList[0]);
    const [quantity, setQuantity] = useState(1);
    const searchParams = useSearchParams()

    const tabName = searchParams.get('tabName')
    const router = useRouter();

    const departmentDictionary = {
        'PPT': 'Printing & Packaging Technology',
        'CE': 'Computer Engineering',
        'IT': 'Information Technology',
        'ECS': 'Electronics & Computer Science',
        'EXTC': 'Electronics & Telecommunication',
        'AIDS': 'Artificial Intelligence and Data science',
        'AIML': 'Artificial Intelligence and Machine Learning',
        'MECH': 'Mechanical Engineering',
        'IOT': 'IOT',
    };



    const [inventoriesList, setInventoriesList] = useState([
        {
            inventoryId: 1,
            inventoryName: "Marker",
            quantity: 300,
        },
        {
            inventoryId: 1,
            inventoryName: "Chalk",
            quantity: 300,
        },
        {
            inventoryId: 1,
            inventoryName: "Duster",
            quantity: 300,
        },

    ])
    // useEffect(() => {
    //     getAllocatedNotInventoryService(params.dept).then((response) => {
    //         setInventoriesList(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     }
    //     )
    // }, [])



    const temp = [{
        dept_name: 'CE',
        inv_id: 1,
        iat_id: 1,
        quantity: 100,
        inventoryName: 'Marker',
        assignedBy: '29/06/2023',
    }]


    // const temp = inventories;
    const deptId = 1;
    const inventoryId = 3;
    const [dropDownQuantity, setDropdownQuantity] = useState()

    let count = 1;
    const handleItemDropdown = (event) => {
        setInventoryName(event.target.value);
        // setDropdownQuantity(event.target.quantity);
    };

    const createAllocatedInventory = { deptId, inventoryId, quantity };
    async function itemAllocation() {
        // console.log(params.dept, inventoryName, inventoryId, quantity)
        // console.log(dropDownQuantity, quantity)
        // alert(dropDownQuantity)
        // alert(quantity)

        if (quantity > dropDownQuantity) {
            alert("Quantity Exceeded");
        } else {
            let quan = dropDownQuantity - parseInt(quantity);
            alert(quan)
            // createAllocatedInventoryService(createAllocatedInventory).then(response => {
            //     console.log(response.data)
            // });
            // const updateInventory = { inventoryId, inventoryName, quantity };
            // updateInventoryService(inventoryId, updateInventory).then(response => {
            //     console.log(response.data)
            // });
        }
        setInventoryName("");
        setQuantity("");
        window.location.reload();

    }

    function showError(error) {
        // Create a new div element
        var errorDiv = document.createElement('div');

        // Set the error message content
        errorDiv.textContent = error;

        // Style the error message
        errorDiv.style.color = 'red';
        errorDiv.style.fontWeight = 'bold';

        // Append the error message to the body or any other desired container
        document.body.appendChild(errorDiv);

        // Optionally, remove the error message after a certain time
        setTimeout(function () {
            document.body.removeChild(errorDiv);
        }, 3000); // Remove after 3 seconds (adjust as needed)
    }

    const [newQuantity, setNewQuantity] = useState()
    async function updateAllocation(quantity, existingQuantity, editModal) {

        getInventoryById(editModal.inv_id).then(response => {
            setNewQuantity(response.data.quantity);
        });

        if (quantity >= newQuantity) {
            alert("Quantity Exceeding")
        }
        else {

            let ans = parseInt(quantity) + existingQuantity;

            updateAllocatedNotInventoryService(editModal.iat_id, { iat_id, ans })
            let finalAns = newQuantity - parseInt(quantity)
            updateInventory(editModal.inv_id, { inventoryId, finalAns })
        }
    }


    async function deleteAllocation(stock) {
        deleteAllocatedNotInventoryService(stock.iat_id)

    }




    const [allocationObj, setAllocationObj] = useState([])

    // useEffect(() => {
    //     if (!fetch) {
    //         const fetchAllocationObj = async () => {
    //             const querySnapshot = await getDocs(collection(db, "allocations"));
    //             const fetchedAllocations = [];

    //             querySnapshot.forEach((doc) => {
    //                 fetchedAllocations.push({ id: doc.id, dept: doc.data().dept, quantity: doc.data().quantity, item: doc.data().item });
    //             });

    //             setAllocationObj(fetchedAllocations);
    //             setFetch(true);
    //         }

    //         fetchAllocationObj();
    //     }
    // }, [fetch]);

    useEffect(() => {
        if (!fetch) {
            async function findAllocations() {
                const q = query(
                    collection(db, "allocations"),
                    where("dept", "==", params.dept),
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    alert("Not found");
                } else {
                    const fetchedAllocations = [];

                    querySnapshot.forEach((doc) => {
                        fetchedAllocations.push({ id: doc.id, dept: doc.data().dept, quantity: doc.data().quantity, item: doc.data().item });
                    });

                    setAllocationObj(fetchedAllocations);
                    setFetch(true);
                }
            }

            findAllocations()
        }
    }, [fetch])


    return (
        <>
            <Navbar />

            {
                allocationModal && (
                    <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
                            <div class="relative bg-white rounded-lg shadow ">
                                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                                    <h3 class="text-xl font-semibold text-gray-900 ">
                                        Create New Allocation
                                    </h3>
                                    <button onClick={() => setAllocationModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>

                                    <h1 className={`${poppins.className} text-lg font-medium`}>Select Item</h1>

                                    <select
                                        value={inventoryName}
                                        onChange={(event) => {
                                            handleItemDropdown(event);
                                            const selectedInventory = inventoriesList.find(inventory => inventory.inventoryName === event.target.value);
                                            setDropdownQuantity(selectedInventory.quantity);
                                        }}
                                        className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
                                    >
                                        {inventoriesList.map((inventory) => (
                                            <option key={inventory.inventoryId} value={inventory.inventoryName}>
                                                {inventory.inventoryName} - {inventory.quantity}
                                            </option>
                                        ))}
                                    </select>

                                    <h1 className={`${poppins.className} text-lg font-medium`}>Enter Quantity</h1>

                                    <input
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                        type="number"
                                        className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                    />
                                    <div type="submit" onClick={() => itemAllocation()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span class="relative">Submit</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                editModal && (
                    <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
                            <div class="relative bg-white rounded-lg shadow ">
                                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                                    <h3 class="text-xl font-semibold text-gray-900 ">
                                        Edit Allocation
                                    </h3>
                                    <button onClick={() => setEditModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>
                                    <h1 className={`${poppins.className} text-lg font-medium`}>Enter Quantity for {editModal.inventoryName} ({editModal.quantity})</h1>

                                    <input
                                        onChange={(e) => setQuantity(e.target.value)}
                                        value={quantity}
                                        type="number"
                                        className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                                    />
                                    <div type="submit" onClick={() => updateAllocation(quantity, editModal.quantity, editModal)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
                                        <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                        <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span class="relative">Submit</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                deleteModal && (
                    <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
                        <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
                            <div class="relative bg-white rounded-lg ">
                                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                                    <h3 class="text-xl font-semibold text-gray-900 ">
                                        Delete Allocation
                                    </h3>
                                    <button onClick={() => setDeleteModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className='flex flex-col justify-center items-center  space-y-5 mb-20  mx-12 my-10'>
                                    <h1 className={`${poppins.className} text-lg font-medium`}>Are you sure?</h1>

                                    <div className='flex justify-start items-center space-x-10'>
                                        <h1 onClick={() => deleteAllocation()} className='px-5 py-2 border bg-red-700 text-white cursor-pointer'>Yes</h1>
                                        <h1 className='px-5 py-2 border bg-gray-700 text-white cursor-pointer'>No</h1>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className='mx-10 md:mx-28 mt-10'>
                <div className={`${poppins.className} flex justify-start items-center space-x-2 pb-10 `}>
                    <img src='/back.png' alt="back" className='w-5 h-5 ' />
                    <Link href="/departments" className='text-lg text-black cursor-pointer hover:ease-in transition  hover:text-gray-400'>Back</Link>
                </div>
                <div className={`${poppins.className} flex justify-between items-center`}>
                    <h1 className='text-2xl lg:text-4xl font-semibold tracking-wide '>{params.dept}</h1>


                    <div class="flex justify-center items-center space-x-5">
                        <div className='flex justify-center items-center px-5 py-2 bg-black rounded-lg text-white cursor-pointer' onClick={() => setAllocationModal(true)}>
                            <h1 class={`${poppins.className} text-md  `}>Create New Allocation</h1>
                        </div>
                    </div>
                </div>
                <div class={`${poppins.className} relative overflow-x-auto mt-10`}>
                    <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-md text-gray-700  bg-gray-50 border-b  ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Sr. No.
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Stock Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Last Allocation
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total Stock Allocated
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        {
                            temp.map((stock) => (

                                <tbody>
                                    <tr class="bg-white border-b ">
                                        <th scope="row" class="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap ">
                                            <h1>{count++}</h1>
                                        </th>
                                        <td class="px-6 py-4">
                                            <h1 className='truncate w-56'>{stock.inventoryName}</h1>
                                        </td>
                                        <td class="px-6 py-4">
                                            <h1 className='truncate w-56'>{stock.assignedBy}</h1>
                                        </td>
                                        <td class="px-6 py-4">
                                            <h1 className='truncate w-56'>{stock.quantity}</h1>
                                        </td>

                                        <td class="px-6 py-4">
                                            <div className='flex justify-around items-center w-[250px] space-x-4'>
                                                <div onClick={() => setDeleteModal(stock)} className=' w-32 flex justify-around items-center cursor-pointer' >
                                                    <img src='/delete.png' alt="remove" className='w-5 h-5 ' />
                                                    <h1>Delete Record</h1>
                                                </div>
                                                <div onClick={() => setEditModal(stock)} className=' w-28 flex justify-around items-center cursor-pointer' >
                                                    <img src="/edit.png" alt="edit" className='w-5 h-5' />
                                                    <h1>Edit Record</h1>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>


            </motion.div>
        </>
    );
}

export default DepartmentProps;
