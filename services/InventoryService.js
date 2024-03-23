import axios from "axios";


const REST_API_BASE_URL = "http://localhost:8090/api/inventory";

 export const listInventories = async () =>await axios.get(REST_API_BASE_URL);  
 
 export const addInventory = (inventory) => axios.post(REST_API_BASE_URL , inventory);
