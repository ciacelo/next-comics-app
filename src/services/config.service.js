import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
/*eslint-disable*/
const http = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem("token"),
  },
});

export default http;

/*
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    window.location = '#/home'
  }

  return Promise.reject(error)
})
*/
