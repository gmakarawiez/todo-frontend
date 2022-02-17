import apiClient from "../apiClient";



class UsersService {

    getAllUsers = () =>  {
	    return apiClient().get("/users/",[])
	};
	login = (credentials) =>{
	    console.log("login: ", credentials)
	    return apiClient().post("/users/dj-rest-auth/login/", credentials)
	}
	refresh_token = (refresh_token) =>{
	    const data = {refresh: refresh_token};
	    return apiClient().post("/users/dj-rest-auth/token/refresh/", data)
	}
	signup = (data) =>{
	    console.log("signup: ", data)
	    const password = data.password;
	    delete data.password;
	    data.password1 = password;
	    data.password2 = password;
	    console.log("signup: ", data)
	    return apiClient().post("/users/dj-rest-auth/registration/", data)
	}

	//logout = () => apiClient().get("users/dj-rest-auth/logout/");
}

export default new UsersService();