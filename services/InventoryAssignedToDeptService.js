import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8090/api/departmentallocatedinventory";



 export const getAllocatedInventoryService = async(dept)=>await axios.get(REST_API_BASE_URL + "/" +dept);
 
 // Not working 
 export const getAllocatedNotInventoryService = async(deptId)=>await axios.get(REST_API_BASE_URL + "/not/" + deptId);
 

 //after using create also called update in inventory quantity 
 //from InventoryService.js to subtract from original quantity
 export const createAllocatedInventoryService = (inventory) => axios.post(REST_API_BASE_URL , inventory);
 export const deleteAllocatedNotInventoryService = async(deptId)=>await axios.delete(REST_API_BASE_URL + "/" + deptId);
 export const updateAllocatedNotInventoryService = async(iatdId , inventory)=>await axios.put(REST_API_BASE_URL + "/" + iatdId);
