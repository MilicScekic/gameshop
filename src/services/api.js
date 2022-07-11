import axios from "axios";

//? Matijin host
const apiUrl = "http://localhost:1337/api"; // primjer

export const apiCall = axios.create({
  baseURL: apiUrl,
});

apiCall.interceptors.response.use(
  function (response) {
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
