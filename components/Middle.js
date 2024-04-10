"use client"
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { addInventory, listInventories } from '../services/InventoryService';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const poppins = Poppins({
  weight: ['100', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});


function Middle() {
  const [active, setActive] = useState("Overview")
  const [itemModal, setItemModal] = useState(false)
  const [itemName, setItemName] = useState("")
  const [editModal, setEditModal] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [editDept, setEditDept] = useState(null)
  const [item, setItem] = useState("")
  const [stock, setStock] = useState(0)
  const [inventoryName, setInventoryName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [departmentModal, setDepartmentModal] = useState(false)
  const [departmentName, setDepartmentName] = useState("")
  const [fetch, setFetch] = useState(false)


  const [inventoryObj, setInventoryObj] = useState([])

  useEffect(() => {
    if (!fetch) {
      const fetchInventoryObj = async () => {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const fetchedInventory = [];

        querySnapshot.forEach((doc) => {
          fetchedInventory.push({ id: doc.id, item: doc.data().item, stock: doc.data().stock });
        });

        setInventoryObj(fetchedInventory);
        setFetch(true);
      }

      fetchInventoryObj();
    }
  }, [fetch]);

  
  const [deptObj, setDeptObj] = useState([])

  useEffect(() => {
    if (!fetch) {
      const fetchDeptObj = async () => {
        const querySnapshot = await getDocs(collection(db, "departments"));
        const fetchedDept = [];

        querySnapshot.forEach((doc) => {
          fetchedDept.push({ id: doc.id, name: doc.data().name });
        });

        setDeptObj(fetchedDept);
        setFetch(true);
      }

      fetchDeptObj();
    }
  }, [fetch]);





  const createItem = async () => {
    if (item && stock) {
      try {
        await addDoc(collection(db, 'inventory'), {
          item: item,
          stock: stock
        });
        alert('Created Item successfully');
        window.location.reload();
      } catch (error) {
        alert('Something went wrong');
      }
    }
  };
  const createDepartment = async () => {
      if (departmentName) {
      try {
        await addDoc(collection(db, 'departments'), {
          name: departmentName,
        });
        alert('Created Department Successfully');
        window.location.reload();
      } catch (error) {
        alert('Something went wrong');
      }
    }
  };





  async function editItemSubmit(editItem) {
    const docRef = doc(db, "inventory", editItem.id);

    try {
      await updateDoc(docRef, {
        item: item ? item : editItem.item,
        stock: stock ? stock : editItem.stock,
      });

      alert('Updated the Item successfully');
      window.location.reload();
    } catch (error) {
      alert(error)
      alert('Unable to update');
    }
  }

  async function updateDept(editDept) {
    const docRef = doc(db, "departments", editDept.id);

    try {
      await updateDoc(docRef, {
        name: departmentName,
      });

      alert('Updated the Department Successfully');
      window.location.reload();
    } catch (error) {
      alert('Unable to update');
    }
  }


  async function deleteItem(item) {
    var answer = window.confirm("Delete Item?");
    if (answer) {
      await deleteDoc(doc(db, "inventory", item.id));
      window.location.reload();
    }
    else {
      return;
    }
  }
  async function deleteDept(dept) {
    var answer = window.confirm("Delete Department?");
    if (answer) {
      await deleteDoc(doc(db, "departments", dept.id));
      window.location.reload();
    }
    else {
      return;
    }
  }


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
                    onChange={(e) => setItem(e.target.value)}
                    value={item}
                    type="text"
                    placeholder="Marker"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />
                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Stock</h1>
                  <input
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="number"
                    placeholder="200"
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
                    placeholder="CE"
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
      {
        editItem && (
          <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
              <div class="relative bg-white rounded-lg shadow ">
                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 class="text-xl font-semibold text-gray-900 ">
                    Edit Item
                  </h3>
                  <button onClick={() => setEditItem(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className='flex flex-col space-y-5 mb-20  mx-12 my-5'>
                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Item Name</h1>
                  <input
                    onChange={(e) => setItem(e.target.value)}
                    value={item}
                    type="text"
                    placeholder="Marker"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />
                  <h1 className={`${poppins.className} text-lg font-medium`}>Enter Stock</h1>
                  <input
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="number"
                    placeholder="200"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />
                  <div type="submit" onClick={() => editItemSubmit(editItem)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
        editDept && (
          <div className={`${poppins.className} fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80 `}>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow ">
              <div class="relative bg-white rounded-lg shadow ">
                <div class="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 class="text-xl font-semibold text-gray-900 ">
                    Edit Department
                  </h3>
                  <button onClick={() => setEditDept(null)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
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
                    placeholder="CE"
                    className="placeholder:text-gray-500  px-5 py-2 outline-none border border-gray-800 w-96"
                  />
              
                  <div type="submit" onClick={() => updateDept(editDept)} class=" cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
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
          <h1 class={`${poppins.className} text-4xl font-bold `}>Inventory</h1>
          <div class="flex justify-center items-center space-x-5">
            <div onClick={() => { setItemModal(true); setDepartmentModal(false) }} className='flex justify-center items-center px-5 py-2 border border-gray-300 transition hover:ease-in hover:bg-gray-100  shadow-md rounded-lg cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Item</h1>
            </div>
          </div>
        </div>



        {/* List of boxes */}
        <div class="grid grid-cols-4 gap-10 py-14 ">
          {inventoryObj.map((item) => (
            <div class="flex flex-col justify-center border border-gray-300 shadow-md min-w-[250px] h-[150px] px-5 rounded-lg ">
              <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>{item.item}</h1>
              <h1 class={`${poppins.className} text-md font-medium  cursor-pointer `}>{item.stock}</h1>

              <div className='flex justify-end items-end space-x-2'>

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
      <div class="w-screen px-44 py-10 flex flex-col ">
        <div class="flex justify-between items-center ">
          <h1 class={`${poppins.className} text-4xl font-bold `}>Existing Department</h1>
          <div class="flex justify-center items-center space-x-5">
            <div onClick={() => { setDepartmentModal(true); setItemModal(false) }} className='flex justify-center items-center px-5 py-2 border border-gray-300 transition hover:ease-in hover:bg-gray-100  shadow-md rounded-lg  cursor-pointer'>
              <h1 class={`${poppins.className} text-md  `}>Create New Department</h1>
            </div>
          </div>
        </div>



        {/* List of boxes */}
        <div class="grid grid-cols-4 gap-10 py-14 ">
          {deptObj.map((dept) => (
            <div class="flex flex-col justify-center border border-gray-300 shadow-md min-w-[250px] h-[150px] px-5 rounded-lg ">
              <h1 class={`${poppins.className} text-xl font-bold cursor-pointer`}>{dept.name}</h1>

              <div className='flex justify-end items-end space-x-2'>

                <div class="mt-10 cursor-pointer " onClick={() => setEditDept(dept)} >
                  <img src="/edit.png" alt="edit" className='w-7 h-7' />
                </div>
                <div class="mt-10 cursor-pointer " onClick={() => deleteDept(dept)} >
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

export default Middle