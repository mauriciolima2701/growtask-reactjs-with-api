// import axios from "axios";
import { Axios } from "axios";

const ApiRequest = new Axios({
	baseURL: "http://localhost:3030",
	headers: {
		"Content-Type": "application/json",
	},
	responseType: "json",
});

export { ApiRequest };

// const ApiRequest = axios.create({
// 	baseURL: "http://localhost:3030",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	responseType: "json",
// });

// export { ApiRequest };
