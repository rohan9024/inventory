"use client"

import React from 'react'
import Navbar from "../../../components/Navbar";
import Middle from "../../../components/Middle";
import { InventoryContext } from '../../../contexts/InventoryProvider'

function page() {
    const temp = [
        {
          stockName: "Pen",
          totalStockLeft: 10
        },
        {
          stockName: "Markers",
          totalStockLeft: 110
        },
    
      ]
  return (
    <InventoryContext.Provider value={{ temp }}>
      <div>
        <Navbar />
        <Middle />
      </div>
    </InventoryContext.Provider>  )
}

export default page