import axios from 'axios'
import Configuration from '@/configuration'
import { addAxiosDateTransformer } from 'axios-date-transformer';

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
    const { error } = err.response.data;  // error is a field in API JSON response
    if (error === undefined) {
      console.error('failed to parse API Error:', err.response);
      return err.message
    }
    else
    {
      console.error('API Error:', error);
      return error
    }
  } else {
    // Handle other types of errors
    console.error('Error:', err.message);
    return err.message
  }
}


export interface InfoResponse {
    version:string
}

export const getInfo = async () => (await api.get<InfoResponse>("/info")).data

export default api
