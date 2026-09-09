import axios from "axios";

const apiClient = axios.create({
    baseURL:`http://localhost:4000/api`,
    headers: {
        "Content-Type":"application/json",
    },
});

apiClient.interceptors.request.use(
    (config)=>{
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);
export default apiClient;