import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth/";

    
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {email, password},
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        throw new Error("Login failed!");
    }
}
    

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}logout/`, null,
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        throw new Error("Logout failed!");
    }
    
}


export const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_URL}refresh/`, null,
            {withCredentials: true}
        )
        return response.data;
    }
    catch (e) {
        throw new Error("Refreshing token failed!");
    }
    
}