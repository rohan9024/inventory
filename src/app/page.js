"use client"

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Middle from "../../components/Middle";
import { InventoryContext } from '../../contexts/InventoryProvider'

export default function Home() {
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
    </InventoryContext.Provider>

  );
}
