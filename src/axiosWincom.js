import axios from 'axios'

const axiosWincom = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
})

export default axiosWincom
