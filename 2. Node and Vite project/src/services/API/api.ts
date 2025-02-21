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
    const { error, code } = err.response.data;  // "error" and "code" are fields of the API JSON response

    // HACK: API is not returning the correct error code at the moment
    if (code === "EXPIRED_AUTH_TOKEN" || `${error}`.includes("Authentication token is expired"))
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
      const authToken = CookieService.readCookie("AuthToken")
      if (authToken == null) {
        console.error('AuthToken cookie is null. Redirect Home')
        // TODO: show message to the user
        new AuthService().logout()
        redirectToHome()
      }
      else
        console.log(`Set AuthToken in request from cookie: ${authToken}`)

      console.log(`interceptors.request`)
      authToken && (request.headers["X-Auth-Token"] = authToken)
      return request
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
