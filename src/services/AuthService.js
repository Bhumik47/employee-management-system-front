import { BASE_URL } from "../common/constant";
import axios from "axios";

const API_URL = BASE_URL + "users/";

const registerUser = async (body) => {
    const response = await axios.post(`${API_URL}new`, body,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response;
}

const login = async (body) => {
    const response = await axios.post(`${API_URL}login`, body, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response;
}

const logout = async () => {
    const response = await axios.get(`${API_URL}logout`, {
        withCredentials: true,
    });
    localStorage.removeItem("user");
    return response;
}

const getProfile = async () => {
    const response = await axios.get(`${API_URL}me`, {
        withCredentials: true,
    });
    return response;
}
const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}all`, {
        withCredentials: true,
    });
    return response;
}

const addEmployee = async (body) => {
    const response = await axios.post(`${API_URL}create`, body, {
        withCredentials: true,
    });
    return response;
}

const editEmployee = async (body) => {
    const response = await axios.put(`${API_URL}update`, body, {
        withCredentials: true,
    });
    return response;
}

const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_URL}delete/${id}`, {
        withCredentials: true,
    });
    return response;
}

const filterEmployees = async (body) => {
    const response = await axios.post(`${API_URL}filter`,body, {
        withCredentials: true,
    });
    return response;
}
const AuthService = {
    registerUser,
    login,
    addEmployee,
    editEmployee,
    deleteEmployee,
    getProfile,
    getAllUsers,
    filterEmployees,
    logout
}

export default AuthService;