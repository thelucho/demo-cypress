import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

export { API }