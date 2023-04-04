import axios from "axios"
import { SignupFormInterface } from "../../../interface/AllFarmsInterface"

const FARM_URL = `http://localhost:5000/api/v1/farm/`
const PRODUCT_URL = `http://localhost:5000/api/v1/addProduct/`
const USER_URL = `http://localhost:5000/api/v1/user/`

const FARM_API = axios.create({ baseURL: FARM_URL })
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL })
const USER_API = axios.create({ baseURL: USER_URL })


export const getAllFarms = () => FARM_API.get('/')
export const filterAllFarms = (item: string) => FARM_API.get(`/?${item}=true`)
export const getSingleFarm = (_id: string) => FARM_API.get(`/${_id}`)
export const getSingleProduct = (_id: string) => PRODUCT_API.get(`/${_id}`)
export const signupMethod = (signupDetails: SignupFormInterface) => USER_API.post(`/signup`, signupDetails)
