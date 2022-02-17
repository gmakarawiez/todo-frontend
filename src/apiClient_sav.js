import axios from "axios";
import userServices from  './services/users.services'
import {Cookies} from './cookies';


const BACKEND_BASE_URL="http://127.0.0.1:8000"


const apiClient = () => {

	const axiosInstance = axios.create({
		baseURL: BACKEND_BASE_URL,
		timeout: 5000,
		headers:{
            'Content-Type': 'application/json',
		}
	});

	axiosInstance.interceptors.request.use(
        (config) => {
            console.log("config: ", config)
            if (config.url !== '/users/dj-rest-auth/login/'){
                const access_token = Cookies.get("access_token")
                if (access_token) {
                    config.headers["Authorization"] = 'Token ' + access_token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
            //return error
        }
    );

    {/*
    axiosInstance.interceptors.response.use(
        (response) => {return response},  // Return a successful response back to the calling service
        async (error) => {

            // save original config
            const original_config = error.config;

            //
            if (original_config.url !== '/users/tokens/get' && error.response) {


                return new Promise((resolve, reject) => {
                //reject(error);
                resolve(error)
                });
            }


            // Logout user if token refresh didn't work or user is disabled
            if (error.config.url == '/users/tokens/refresh' || error.response.message == 'Account is disabled.') {
                // access token has expired
                if (error.response.status === 401 && !original_config._retry) {
                    original_config._retry = true;

                    try {
                        const data = {"refresh": Cookies.get("refresh_token")};
                        const rs = await axiosInstance.post("/users/tokens/refresh", data);
                        const access_token = rs.data.access;
                        const refresh_token = rs.data.refresh;
                        Cookies.set("access_token", access_token)
                        Cookies.set("refresh_token", refresh_token)
                        return axiosInstance(original_config);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
                return Promise.reject(error);
            }
        }
    )
    */}

    return axiosInstance;
};



export default apiClient;
