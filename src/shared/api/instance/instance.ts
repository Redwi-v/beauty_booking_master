import axios, { AxiosError } from 'axios'
import { error } from 'console'
import { Cookies } from 'react-cookie'

export const cookies = new Cookies()


export const apiInstance = axios.create({
  
  baseURL: 'https://mybeautybooking.ru:8080/api/v1',
  timeout: 10000,
  
})

apiInstance.interceptors.response.use(( response ) => {

  return response

}, ( error: AxiosError ) => {

  return Promise.reject( error.response?.data );

})