import axios from "axios";

const axiosInstance = axios.create({

	baseURL: "https://workout-app-ea497.firebaseio.com/"

});

export default axiosInstance;