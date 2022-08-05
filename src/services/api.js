import axios from "axios";

//? Matijin host
const apiUrl = "https://gameshop-g5.com";

export const apiCall = axios.create({
  baseURL: apiUrl,
});

apiCall.interceptors.response.use(
  function (response) {
    response.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    response.headers.withCredentials = true;

    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      console.log(error);
      console.log("Greska!");
    } else {
      return Promise.reject(error);
    }
  }
);
