import axios from "axios";
import { dataHeader } from "./helper";

// START OF USER API
export const register = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/register`, data, dataHeader())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const login = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/login`, data, dataHeader())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};

export const getUsers = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`, 
        {
          params: data,
          ...dataHeader()
        })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// END OF USER API
