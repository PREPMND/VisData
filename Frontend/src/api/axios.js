import axios from "axios";
const BACKEND_URL = "https://visdata.onrender.com" ;
const apiClient = axios.create({
    baseURL: `${BACKEND_URL}/api`,
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


//creating axios instance with base url , headers and both req and response interceptors to handle errors and log them to console. This instance will be used in the services to make API calls.
//useful while working with multiple endpoints such as in cases of microservices , and interceptors are really useful as soon as we add auth service , authorization headers that can be added in request interceptor and error handling/logging can be done in response interceptor.
//axios.create({}), this is axios config file , this creates an axios instance with url andspecified content-type
//and then there are two interceptors i.e request which currently returns the config as it is and similarly response interceptor too.
//Currently the request interceptor doesn't modify the request, but I added it as a centralized extension point. If the application later needs authentication, authorization headers, request IDs, or logging, I can add them here instead of modifying every API request individually.