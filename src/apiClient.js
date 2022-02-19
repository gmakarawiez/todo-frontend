import axios, {AxiosRequestConfig, AxiosError} from "axios";
import UsersService from  './services/users.services'
import {Cookies} from './cookies';


//const BACKEND_BASE_URL="http://127.0.0.1:8000"
const BACKEND_BASE_URL="https://gmakarawiez.pythonanywhere.com"

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.url !== '/users/dj-rest-auth/login/'){
        const access_token = Cookies.get("access_token")
        if (access_token) {
            config.headers["Authorization"] = `Token ${access_token}`;
        }
    }
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {

        // unauthorized user
        if (error.response.status === 401){
            console.log("401 status")
            // refresh token failed => error
            if (error.config.url === "/users/dj-rest-auth/token/refresh/"){
                console.log("refresh token did not work...")
                return Promise.reject(error);
            }
            else {
                console.log("try to refresh token...")
                const refresh_token = Cookies.get("refresh_token");
                UsersService.refresh_token(refresh_token)
                .then((response) => {
                    const access_token = response.data.access_token;
                    const refresh_token = response.data.refresh_token;
                    Cookies.set("access_token", access_token);
                    Cookies.set("refresh_token", refresh_token);
                })
                .catch((err) => {
                    return Promise.reject(err);
                })
            }
        } else {
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
};


const apiClient = () => {

	const axiosInstance = axios.create({
		baseURL: BACKEND_BASE_URL,
		timeout: 5000,
		headers:{
            'Content-Type': 'application/json',
		}
	});

	axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
    return axiosInstance;

};



export default apiClient;
