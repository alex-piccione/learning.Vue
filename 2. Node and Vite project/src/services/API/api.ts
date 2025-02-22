import axios from 'axios'
import Configuration from '@/configuration'
import { addAxiosDateTransformer } from 'axios-date-transformer';
import { failed } from '../Result';
import CookieService from '../Cookies.service';
import { redirectToHome } from '@/router';
import AuthService from '../Auth.service';

let api = axios.create({
  baseURL: Configuration.apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// AXIOS does not return Date type (it uses string type)
api = addAxiosDateTransformer(api);

export const manageError = (err:Error) => {
  if (axios.isAxiosError(err) && err.response) {
    // Extract error message from API JSON esponse
    const { error } = err.response.data;  // "error" and "code" are fields of the API JSON response

    if (err.response.status === 401)
    {
      console.error('Auth token is expired');
      redirectToHome()
      return failed(err.message)
    }

    if (error === undefined) {
      console.error('Failed to parse API Error:', err.response);
      return failed(err.message)
    }
    else
    {
      console.error('API Error:', error);
      return failed(error)
    }
  } else {
    // Handle other types of errors
    console.error('Error:', err.message);
    return failed(err.message)
  }
}

export function extendApi() {
  // add the Authentication token to the request
  api.interceptors.request.use(
    request => {
      // login request does not need authentication
      if (request.url?.startsWith("/user/login") || request.url?.startsWith("/info")) return request

      const authToken = CookieService.readCookie("AuthToken", `api.interceptors.request (${request.url})`)
      if (authToken == null) {
        console.error('AuthToken cookie is null. Redirect Home')
        // TODO: show message to the user
        // TODO: request login?
        new AuthService().logout()
        redirectToHome()
        return Promise.reject("Auth token is missed")
      }
      else
      {
        authToken && (request.headers["X-Auth-Token"] = authToken)
        return request
      }
    }
  )
/*
  api.interceptors.response.use(
    response => response,
    error => {
      if (axios.isAxiosError(error)) {
      }
      else {
        console.log(`API response error. ${error}`)
      }
      return error
    }
    //error => Promise.reject(manageError(error))
  )
  */
}


export interface InfoResponse {
    version:string
}

export const getInfo = async () => (await api.get<InfoResponse>("/info")).data

export default api
