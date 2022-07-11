import { createContext, useEffect, useState } from "react";
import { apiCall } from "../services/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const accessTokens = localStorage.getItem("accessToken");
  const [authTokens, setAuthTokens] = useState(accessTokens);

  //? Ovo istovremeno provjerava da li ima tokena u local storage i pri svakoj promjeni dodjeljuje token
  useEffect(() => {
    apiCall.defaults.headers.common["Authorization"] = `Bearer ${authTokens}`;
  }, [authTokens]);

  const setTokens = (token) => {
    localStorage.setItem("accessToken", token);

    setAuthTokens(token);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
