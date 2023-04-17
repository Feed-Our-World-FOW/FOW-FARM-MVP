import axios from "axios"
import { LoginFormInterface, SignupFormInterface } from "../../../interface/AllFarmsInterface"

const URL = `http://localhost:5000`

const FARM_URL = `${URL}/api/v1/farm`
const PRODUCT_URL = `${URL}/api/v1/addProduct`
const USER_URL = `${URL}/api/v1/user`
const COMMENT_FARM_URL = `${URL}/api/v1/reviews`
const CART_URL = `${URL}/api/v1/cart`
const ADDRESS_URL = `${URL}/api/v1/address`

const FARM_API = axios.create({ baseURL: FARM_URL })
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL })
const USER_API = axios.create({ baseURL: USER_URL })
const COMMENT_FARM_API = axios.create({ baseURL: COMMENT_FARM_URL })
const CART_API = axios.create({ baseURL: CART_URL })
const ADDRESS_API = axios.create({ baseURL: ADDRESS_URL })


export const getAllFarms = () => FARM_API.get('/')
export const getAllProducts = (_token: string) => PRODUCT_API.get('/', { headers: { Authorization: `Bearer ${_token}`}})
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

export const getMySelf = (_token: string) => USER_API.get(`/me`, { headers: { Authorization: `Bearer ${_token}`}})

export const getMyAddress = (_token: string) => ADDRESS_API.get('/myAddress', { headers: { Authorization: `Bearer ${_token}`}})

export const setMyAddress = 
  (
    _token: string,
    details: {
      country: string,
      mobileNumber: number,
      pincode: number,
      flatDetails: string,
      landMark: string,
      town: string
    }
  ) => ADDRESS_API.post(`/`, details, { headers: { Authorization: `Bearer ${_token}`}})

export const updateMyAddress = 
  (
    _token: string,
    details: {
      country: string,
      mobileNumber: number,
      pincode: number,
      flatDetails: string,
      landMark: string,
      town: string
    }
  ) => ADDRESS_API.patch(`/myAddress`, details, { headers: { Authorization: `Bearer ${_token}`}})
