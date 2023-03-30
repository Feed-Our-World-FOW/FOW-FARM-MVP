import axios from "axios";

const FARM_URL = `http://localhost:5000/api/v1/farm/`

const FARM_API = axios.create({ baseURL: FARM_URL })

export const getAllFarms = () => FARM_API.get('/')
