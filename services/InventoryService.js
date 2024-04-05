import axios from "axios";


const REST_API_BASE_URL = "http://localhost:8090/api/inventory";

export const listInventories = async () => await axios.get(REST_API_BASE_URL);

export const addInventory = (inventory) => axios.post(REST_API_BASE_URL, inventory);

export const updateInventory = (inventoryId, inventory) => axios.put(REST_API_BASE_URL + "/" + inventoryId, inventory)

export const getInventoryById = (inventoryId) => axios.get(REST_API_BASE_URL + "/" + inventoryId)

export const deleteInventory = async (inventoryId) => await axios.delete(REST_API_BASE_URL + "/" + inventoryId);

//used this api in dropdown in dept page /create new allocation made
export const getAllocatedNotInventoryService = async (departmentName) => await axios.get(REST_API_BASE_URL + "/not/" + departmentName);

