import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const AxiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {handleSignOut} = useAuth();
    AxiosSecure.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`
        return config;
      },function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    
    )

    AxiosSecure.interceptors.response.use(function(response) {
      return response
    }, async(error) => {
      const status = error.response.status;
      console.log('status error in interceptors: ', status);
      if(status === 401 || status === 403) {
        await handleSignOut();
        navigate('/login')
      }
      return Promise.reject(error)
    })
   return AxiosSecure;
};

export default useAxiosSecure;