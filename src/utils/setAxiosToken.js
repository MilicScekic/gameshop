import axios from "axios";

export const setAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    // axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    // delete axios.defaults.headers.common["x-auth-token"];
  }
};
