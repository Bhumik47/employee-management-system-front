import axios from "axios";
import { BASE_URL } from "../common/constant";

const API_URL = BASE_URL + "departments/";

const addDepartment = async (body) => {
    const response = await axios.post(`${API_URL}create`, body,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
}

const getDepartments = async () => {
    const response = await axios.get(`${API_URL}get`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
}


const UpdateDepartment = async (body) => {
    const response = await axios.put(`${API_URL}update`, body,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
}

const deleteDepartment = async (id) => {
    const response = await axios.delete(`${API_URL}delete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
}


const DepartmentService = {
    addDepartment,
    getDepartments,
    UpdateDepartment,
    deleteDepartment
}

export default DepartmentService;