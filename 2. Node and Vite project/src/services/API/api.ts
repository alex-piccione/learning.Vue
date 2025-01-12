import axios from 'axios'
import Configuration from '@/configuration'

const api = axios.create({
  baseURL: Configuration.apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const manageError = (err:any) => {
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