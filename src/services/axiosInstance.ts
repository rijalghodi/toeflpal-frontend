import axios from 'axios';
import Cookies from 'js-cookie';

// import { refreshToken } from "./auth";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

// let isRefreshing = false;
// let refreshSubscribers = [];

// Add an interceptor to include JWT token from cookie in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from cookie
    const token = Cookies.get('accessToken');

    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// // Add an interceptor to handle token refreshing
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 (unauthorized) and not already refreshing the token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // If token is already refreshing, queue the original request
//         return new Promise(function (resolve) {
//           refreshSubscribers.push(function () {
//             resolve(api(originalRequest));
//           });
//         });
//       }

//       // Set flag to indicate token is refreshing
//       isRefreshing = true;

//       // Send request to refresh token
//       return new Promise(function (resolve, reject) {
//         refreshToken()
//           .then((response) => {
//             const newToken = response.data.access_token;

//             // Update token in the cookie
//             Cookies.set("access_token", newToken); // Assuming the token is stored in a cookie named 'access_token'

//             // Update original request header with new token
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;

//             // Retry the original request
//             resolve(api(originalRequest));
//           })
//           .catch((err) => {
//             reject(err);
//           })
//           .finally(() => {
//             // Reset refreshing flag and clear subscribers
//             isRefreshing = false;
//             refreshSubscribers = [];
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
