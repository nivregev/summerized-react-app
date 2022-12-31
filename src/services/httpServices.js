import axios from "axios";
import config from "../config.json";

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
  // console.log(axios.defaults.headers.common);
}

axios.defaults.baseURL = config.apiUrl;

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.patch,
  delete: axios.delete,
};

export default httpService;
