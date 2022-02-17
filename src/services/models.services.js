import apiClient from "../apiClient";


class ModelsService {

    createModel = (data) =>  {
	    return apiClient().post("todos/",data, [])
	};

	editModel = (id, data) =>  {
	    return apiClient().put(`todos/${id}/`,data, [])
	};

    getAllModels = () =>  {
	    return apiClient().get("todos/",[])
	};

	getOneModel = (id) =>  {
	    return apiClient().get(`todos/${id}/`,[])
	};

	deleteModel = (id) =>  {
	    return  apiClient().delete(`todos/${id}/`,[])
	};
}

export default new ModelsService();

