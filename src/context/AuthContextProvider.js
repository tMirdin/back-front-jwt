import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

const API = "https://backend-for-fs-makers.herokuapp.com/api/v1/account";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (email, password, passwordConfirm) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirm", passwordConfirm);
    console.log(...formData);

    try {
      await axios.post(`${API}/register/`, formData, config);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError("error occured");
    }
  };

  async function login(username, password) {
    // console.log(username, password);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    let formData = new FormData();
    formData.append("email", username);
    formData.append("password", password);

    try {
      const res = await axios.post(`${API}/login/`, formData, config);
      console.log(res);
      const { access, refresh } = res.data;
      // console.log(access, refresh);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("username", username);
      setUser(username);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function checkAuth() {
    const refreshToken = JSON.parse(localStorage.getItem("refresh"));
    const accessToken = JSON.parse(localStorage.getItem("access"));
    console.log(accessToken);

    try {
      const Authorization = `Bearer ${accessToken}`;

      let res = await axios.post(
        `${API}/account/token/refresh/`,
        {
          refresh: refreshToken,
        },
        {
          headers: { Authorization },
        }
      );
      const newAccess = res.data.access;
      localStorage.setItem("access", newAccess);

      let userName = localStorage.getItem("username");
      setUser(userName);
    } catch (error) {
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setUser("");
  }
  return (
    <authContext.Provider
      value={{ register, login, user, error, checkAuth, logout }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
