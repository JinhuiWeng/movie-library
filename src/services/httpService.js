import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// intercept responses before they are handled by then or catch.
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpected error occurrred.");
    } else toast.error(`An expected error ${error.response.status} occurrred.`);

    //returns a Promise object that is rejected with a given reason.
    return Promise.reject(error);
});

function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
    // axios.defaults.headers.common["Authorization"] = jwt;
  }
//The header X-Auth-Token is designed to authenticate request that doesn't contain secure cookie


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
  };