import axios from "axios"
import { LoginFormInterface, SignupFormInterface } from "../../../interface/AllFarmsInterface"

const FARM_URL = `http://localhost:5000/api/v1/farm/`
const PRODUCT_URL = `http://localhost:5000/api/v1/addProduct/`
const USER_URL = `http://localhost:5000/api/v1/user/`
const COMMENT_FARM_URL = `http://localhost:5000/api/v1/reviews`
const CART_URL = `http://localhost:5000/api/v1/cart`

const FARM_API = axios.create({ baseURL: FARM_URL })
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL })
const USER_API = axios.create({ baseURL: USER_URL })
const COMMENT_FARM_API = axios.create({ baseURL: COMMENT_FARM_URL })
const CART_API = axios.create({ baseURL: CART_URL })

USER_API.interceptors.request.use((req) => {
  const token = localStorage.getItem('Token')
  if(token) {
    req.headers.Authorization = `Bearer ${JSON.parse(token).token}`
  }

  return req
})


export const getAllFarms = () => FARM_API.get('/')
export const filterAllFarms = (item: string) => FARM_API.get(`/?${item}=true`)
export const getSingleFarm = (_id: string) => FARM_API.get(`/${_id}`)

export const getSingleProduct = (_id: string, _token: string) => 
  PRODUCT_API.get(`/${_id}`, { headers: { Authorization: `Bearer ${_token}` } })
  
export const signupMethod = (signupDetails: SignupFormInterface) => USER_API.post(`/signup`, signupDetails)
export const loginMethod = (loginDetails: LoginFormInterface) => USER_API.post('/login', loginDetails)

export const getReviewOfAProduct = (productId: string, _token: string) => 
  PRODUCT_API.get(`/${productId}/reviewProduct`, { headers: { Authorization: `Bearer ${_token}` } })

export const createReviewOfAProduct = (productId: string, _token: string, comment: { title: string, review: string, rating: number }) => 
  PRODUCT_API.post(`/${productId}/reviewProduct`, comment, { headers: { Authorization: `Bearer ${_token}` } })

export const createReviewOfAFarm = (_token: string, comment: { title: string, review: string, rating: number, farm: string }) => 
  COMMENT_FARM_API.post(`/`, comment, { headers: { Authorization: `Bearer ${_token}` } })

export const getMyCart = (_token: string) => CART_API.get(`/mycart`, { headers: { Authorization: `Bearer ${_token}` } })

export const removeItemsFromCart = (_token: string, _id: string) => 
  CART_API.delete(`/${_id}/remove`, { headers: { Authorization: `Bearer ${_token}` } })

export const addItemToCart = (_token: string, _id: string) => 
  CART_API.post(`/${_id}/add`, {}, { headers: { Authorization: `Bearer ${_token}` } })

export const decreaseItemFromCart = (_token: string, _id: string) =>
  CART_API.patch(`/${_id}/decrease`, {}, { headers: { Authorization: `Bearer ${_token}` } })
