"use client"
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { addInventory, listInventories } from '../services/InventoryService';

const poppins = Poppins({
  weight: ['100', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});


function Middle() {
  const [active, setActive] = useState("Overview")
  const [itemModal, setItemModal] = useState(false)
  const [itemName, setItemName] = useState("")
  const [editModal, setEditModal] = useState(null)
  const [inventoryName, setInventoryName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [departmentModal, setDepartmentModal] = useState(false)
  const [departmentName, setDepartmentName] = useState("")
  const createInventory = { inventoryName, quantity };

  const [inventories, setInventories] = useState([])
  useEffect(() => {
    listInventories().then((response) => {
      setInventories(response.data);
    }).catch(error => {
      console.error(error);
    }
    )
  }, [])


  function createItem() {
    alert(inventoryName + quantity)
    setItemModal(false);
    setInventoryName("");
    setQuantity("");
    addInventory(createInventory).then(response => {
      console.log(response.data);
      //navigator('/admin-panel');
    });
   //  console.log(createInventory);
  }

  function createDepartment() {
    alert(departmentName)
    setDepartmentModal(false);
    setDepartmentName("");
  }

  const items = inventories;
  // function createItem() {
  //   alert(itemName)
  //   setItemModal(false);
  //   setItemName("");
  // }

  function createDepartment() {
    alert(departmentName)
    setDepartmentModal(false);
    setDepartmentName("");
  }

  // const items = [
  //   { name: "Chalk", quantity: 100 },
  //   { name: "Duster", quantity: 200 },
  //   { name: "Markers", quantity: 1000 },
  //   { name: "Whiteboard", quantity: 200 },
  //   { name: "Papers", quantity: 3546 },
  //   { name: "Ink", quantity: 34 },
  //   { name: "Others", quantity: 96 },
  //   { name: "Total", quantity: 4596 }
  // ];

  return (
    <>
      {
        itemModal && (
          <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
              <div class="relative bg-white rounded-lg shadow ">
                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 class="text-xl font-semibold text-gray-900 ">
                    Create New Item
                  </h3>
                  <button onClick={() => setItemModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>

                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Item Name</h1>

                  <input
                    onChange={(e) => setInventoryName(e.target.value)}
                    value={inventoryName}
                    type="text"
                    placeholder="Marker"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />

<h1 className={`${poppins.className} text-lg font-medium`}>Enter quantity </h1>

<input
  onChange={(e) => setQuantity(e.target.value)}
  value={quantity}
  type="text"
  placeholder="Quantity"
  className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
/>

                  <div type="submit" onClick={() => createItem()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
        departmentModal && (
          <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
              <div class="relative bg-white rounded-lg shadow ">
                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 class="text-xl font-semibold text-gray-900 ">
                    Create New Department
                  </h3>
                  <button onClick={() => setDepartmentModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>

                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Department Name</h1>

                  <input
                    onChange={(e) => setDepartmentName(e.target.value)}
                    value={departmentName}
                    type="text"
                    placeholder="Computer Science"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />

                  <div type="submit" onClick={() => createDepartment()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
                    Edit Modal
                  </h3>
                  <button onClick={() => setDepartmentModal(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>
                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Department Name</h1>
                  <input
                    onChange={(e) => setDepartmentName(e.target.value)}
                    value={departmentName}
                    type="text"
                    placeholder="Computer Science"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />
                  <div type="submit" onClick={() => createDepartment()} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
      <div class="w-screen px-44 py-10 flex flex-col ">
        <div class="flex justify-between items-center ">

          <h1 class={`${poppins.className} text-4xl font-bold `}>Summary</h1>


          <div class="flex justify-center items-center space-x-5">
            <div onClick={() => { setItemModal(true); setDepartmentModal(false) }} className='flex justify-center items-center px-5 py-2 bg-black rounded-lg text-white cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Item</h1>
            </div>
            <div onClick={() => { setDepartmentModal(true); setItemModal(false) }} className='flex justify-center items-center px-5 py-2 bg-black rounded-lg text-white cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Department</h1>
            </div>
          </div>

        </div>


        {/* <div className='bg-gray-200 shadow-lg h-[1px]  my-10' /> */}

        {/* List of boxes */}
        <div class="grid grid-cols-4 gap-10 py-14 ">
          {items.map((item) => (
            <div class="flex flex-col justify-center  shadow-lg min-w-[250px] h-[150px] px-5 rounded-lg ">
              <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>{item.inventoryName}</h1>
              <h1 class={`${poppins.className} text-md font-medium  cursor-pointer text-gray-400`}>{item.quantity}</h1>
              <div class="w-full flex justify-end mt-10 cursor-pointer ">
                <img src="/edit.png" alt="edit" className='w-7 h-7' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default Middle