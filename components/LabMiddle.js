"use client"
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Select from 'react-select'

const poppins = Poppins({
  weight: ['100', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});


function LabMiddle() {
  const router = useRouter();
  const [fetch, setFetch] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)
  const [department, setDepartment] = useState("CE")
  const [fetchDept, setFetchDept] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState(1);


  // useEffect(() => {
  //   listDepartments().then((response) => {
  //     setFetchDept(response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   }
  //   )
  // }, [])

  // const departmentList = fetchDept;


  const handleDepartmentDropdown = (event) => {
    setDepartment(event.target.value);
  };
  const handleItemDropdown = (event) => {
    setItem(event.target.value);
  };


  const temp = [
    {
      dept_name: 'CE',
      inv_id: 1,
      iat_id: 1,
      quantity: 100,
      inventoryName: 'Marker',
      assignedBy: '29/06/2023',
    },
    {
      dept_name: 'CE',
      inv_id: 2,
      iat_id: 2,
      quantity: 50,
      inventoryName: 'Laptop',
      assignedBy: '12/07/2023',
    },
    {
      dept_name: 'CE',
      inv_id: 3,
      iat_id: 3,
      quantity: 200,
      inventoryName: 'Notebook',
      assignedBy: '05/08/2023',
    },
    {
      dept_name: 'CE',
      inv_id: 4,
      iat_id: 4,
      quantity: 20,
      inventoryName: 'Projector',
      assignedBy: '20/09/2023',
    },
  ];



  const itemsList = temp.map(elem => ({ value: elem.inventoryName, label: elem.inventoryName }));


  const departmentList = ['PPT', 'CE', 'IT', 'ECS', 'EXTC', 'AIDS', 'AIML', 'MECH', 'IOT', 'FE', 'PG'];


  async function requestAdmin() {
    alert("Submitted Successfully")
    window.location.reload();

    console.log(quantities, department)
  }



  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" }
  ];


  function handleSelect(data) {
    setSelectedOptions(data);
  }


  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemVal, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemVal]: quantity
    }));
  };

  return (
    <>
      <div class="w-screen px-44 py-10 flex flex-col ">
        <div class="flex flex-col justify-center items-center ">

          <h1 class={`${poppins.className} text-4xl font-bold `}>Request Admin</h1>


          <div className='flex flex-col justify-start items-start my-14 '>

            <h1 className={`${poppins.className} text-lg font-bold my-5`}>Select Department</h1>

            <select
              value={department}
              onChange={handleDepartmentDropdown}
              className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
            >
              {departmentList.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>


            <h1 className={`${poppins.className} text-lg font-bold my-5`}>Select Item</h1>


            <Select
              options={itemsList}
              placeholder="Select items"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />

            {selectedOptions.map((item) =>

            (
              <div key={item} className='flex justify-center items-center space-x-5 my-5'>
                <h1>{item.value}</h1>

                <input
                  onChange={(e) => handleQuantityChange(item.value, e.target.value)}
                  value={quantities[item.value] || ''}
                  type="number"
                  className='outline-none border border-gray-500 bg-transparent w-14 px-2 py-2 rounded-lg placeholder:Select-Quantity'
                />
              </div>
            )

            )}


            <div type="submit" onClick={requestAdmin} class="my-10 cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600">
              <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative">Request Admin</span>
            </div>


          </div>

        </div>




      </div>
    </>

  )
}

export default LabMiddle