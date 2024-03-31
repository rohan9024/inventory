import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8090/api/department";

 export const listDepartments = async () =>await axios.get(REST_API_BASE_URL);  

