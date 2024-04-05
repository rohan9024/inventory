import axios from "axios";


const REST_API_BASE_URL = "http://localhost:8090/api/lab";

 export const listILogins = async () =>await axios.get(REST_API_BASE_URL);  
 
 export const addLogin = (login) => axios.post(REST_API_BASE_URL , login);

 export const updateLogin = (loginId , login) => axios.put(REST_API_BASE_URL +"/"+loginId , login)
 
 export const deleteLogin = async(loginId)=>await axios.delete(REST_API_BASE_URL + "/" + loginId);
