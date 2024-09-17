"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

function LabMiddle() {
  const router = useRouter();
  const [department, setDepartment] = useState("CE");
  const [inventoryObj, setInventoryObj] = useState([]);
  const [allocationObj, setAllocationObj] = useState([]);
  const [deptObj, setDeptObj] = useState([]);
  const [requestsObj, setRequestsObj] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [item, setItem] = useState("N/A");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedDept = localStorage.getItem("department");
    if (storedDept) {
      setSelectedDept(storedDept);
    } else {
      router.push("lab-login");
    }
  }, [router]);

  useEffect(() => {
    // Fetch inventory data
    const fetchInventoryObj = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const fetchedInventory = [{ id: "0", item: "N/A", stock: -1 }];

      querySnapshot.forEach((doc) => {
        fetchedInventory.push({
          id: doc.id,
          item: doc.data().item,
          stock: doc.data().stock,
        });
      });

      setInventoryObj(fetchedInventory);
    };

    fetchInventoryObj();
  }, []);

  useEffect(() => {
    // Fetch allocation data
    const fetchAllocationObj = async () => {
      const querySnapshot = await getDocs(collection(db, "allocations"));
      const fetchedAllocations = [];

      querySnapshot.forEach((doc) => {
        fetchedAllocations.push({
          id: doc.id,
          dept: doc.data().dept,
          quantity: doc.data().quantity,
          item: doc.data().item,
          date: doc.data().date,
        });
      });

      setAllocationObj(fetchedAllocations);
    };

    fetchAllocationObj();
  }, []);

  useEffect(() => {
    // Fetch department data
    const fetchDeptObj = async () => {
      const querySnapshot = await getDocs(collection(db, "departments"));
      const fetchedDept = [];

      querySnapshot.forEach((doc) => {
        fetchedDept.push({ id: doc.id, name: doc.data().name });
      });

      setDeptObj(fetchedDept);
    };

    fetchDeptObj();
  }, []);

  useEffect(() => {
    // Fetch pending requests
    const fetchRequestsObj = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const fetchedRequests = [];

      querySnapshot.forEach((doc) => {
        fetchedRequests.push({
          id: doc.id,
          department: doc.data().department,
          item: doc.data().item,
          quantity: doc.data().quantity,
        });
      });

      setRequestsObj(fetchedRequests);
    };

    fetchRequestsObj();
  }, []);

  async function requestAdmin() {
    if (item && quantity) {
      try {
        await addDoc(collection(db, "requests"), {
          item: item,
          quantity: quantity,
          department: selectedDept,
        });
        alert("Submitted Successfully");
        window.location.reload();
      } catch (error) {
        alert("Something went wrong");
      }
    }
  }

  async function deleteReq(request) {
    try {
      await deleteDoc(doc(db, "requests", request.id));
      alert("Rejected Request Successfully");
      window.location.reload();
    } catch (error) {
      alert("Error deleting request");
    }
  }

  return (
    <>
      <div className="w-screen px-44 py-28 flex flex-col ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className={`${poppins.className} text-4xl font-bold `}>
            Request Admin
          </h1>

          <div className="flex flex-col justify-start items-start my-14 ">
            {/* <h1 className={`${poppins.className} text-lg font-bold my-5`}>
              Select Item
            </h1>

            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
            >
              {inventoryObj.map((invItem) => (
                <option key={invItem.id} value={invItem.item}>
                  {invItem.item}
                </option>
              ))}
            </select> */}

            <h1 className={`${poppins.className} text-lg font-bold my-5`}>
              Select Item
            </h1>

            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="block w-96 py-2 px-5 leading-tight border border-gray-700 focus:outline-none cursor-pointer"
            >
              {inventoryObj
                .slice() // Create a shallow copy of the array to avoid mutating the original
                .sort((a, b) => a.item.localeCompare(b.item)) // Sort alphabetically
                .map((invItem) => (
                  <option key={invItem.id} value={invItem.item}>
                    {invItem.item}
                  </option>
                ))}
            </select>

            <h1 className={`${poppins.className} text-lg font-bold my-5`}>
              Enter Quantity
            </h1>

            <input
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              type="number"
              className="placeholder:text-gray-500 px-5 py-2 outline-none border border-gray-800 w-96"
            />

            <div
              type="submit"
              onClick={requestAdmin}
              className="my-10 cursor-pointer w-96 relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-600"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative">Request Admin</span>
            </div>
          </div>
        </div>

        <div className="w-screen py-10 flex flex-col ">
          <div className="flex justify-between items-center ">
            <h1 className={`${poppins.className} text-4xl font-bold `}>
              Pending Requests
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-10 py-14">
            {requestsObj.filter(
              (request) => request.department === selectedDept
            ).length === 0 ? (
              <div className="">
                <h1
                  className={`${poppins.className} text-md font-medium text-gray-600`}
                >
                  Not Found Pending Requests
                </h1>
              </div>
            ) : (
              requestsObj
                .filter((request) => request.department === selectedDept)
                .map((request) => (
                  <div
                    className="flex flex-col justify-center border border-gray-300 shadow-md min-w-[250px] h-[180px] px-5 rounded-lg"
                    key={request.id}
                  >
                    <h1
                      className={`${poppins.className} text-xl font-bold cursor-pointer`}
                    >
                      {request.department}
                    </h1>
                    <h1
                      className={`${poppins.className} text-md font-medium cursor-pointer`}
                    >
                      {request.item}
                    </h1>
                    <h1
                      className={`${poppins.className} text-md font-medium cursor-pointer`}
                    >
                      {request.quantity}
                    </h1>
                    <div className="flex justify-end items-end space-x-2">
                      <div
                        className="mt-10 cursor-pointer"
                        onClick={() => deleteReq(request)}
                      >
                        <img
                          src="/delete.png"
                          alt="delete"
                          className="w-7 h-7"
                        />
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <h1 className={`${poppins.className} text-4xl font-bold `}>
            Approved Allocations
          </h1>
        </div>

        <div className={`${poppins.className} relative overflow-x-auto mt-10`}>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-md text-gray-700 bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Allocation
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Stock Allocated
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
              </tr>
            </thead>
            <tbody>
              {allocationObj
                .filter((stock) => stock.dept === selectedDept)
                .map((stock, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="w-24 px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      <h1>{index + 1}</h1>
                    </th>
                    <td className="px-6 py-4">
                      <h1 className="truncate w-56">{stock.item}</h1>
                    </td>
                    <td className="px-6 py-4">
                      <h1 className="truncate w-56">{stock.date}</h1>
                    </td>
                    <td className="px-6 py-4">
                      <h1 className="truncate w-56">{stock.quantity}</h1>
                    </td>
                    <td className="px-6 py-4">
                      <h1 className="truncate w-56">{stock.dept}</h1>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default LabMiddle;
