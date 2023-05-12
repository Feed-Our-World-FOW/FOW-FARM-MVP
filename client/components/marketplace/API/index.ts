import axios from "axios"
import { LoginFormInterface, SignupFormInterface } from "../../../interface/AllFarmsInterface"

const URL = `http://localhost:5000`

const FARM_URL = `${URL}/api/v1/farm`
const PRODUCT_URL = `${URL}/api/v1/addProduct`
const COMMENT_FARM_URL = `${URL}/api/v1/reviews`
// const CART_URL = `${URL}/api/v1/cart`
const ADDRESS_URL = `${URL}/api/v1/address`

const FARM_API = axios.create({ baseURL: FARM_URL })
const PRODUCT_API = axios.create({ baseURL: PRODUCT_URL })
const COMMENT_FARM_API = axios.create({ baseURL: COMMENT_FARM_URL })
// const CART_API = axios.create({ baseURL: CART_URL })
const ADDRESS_API = axios.create({ baseURL: ADDRESS_URL })


// export const getAllFarms = () => FARM_API.get('/')
export const getAllProducts = (_token: string) => PRODUCT_API.get('/', { headers: { Authorization: `Bearer ${_token}`}})
export const filterAllFarms = (item: string) => FARM_API.get(`/?${item}=true`)
export const getSingleFarm = (_id: string) => FARM_API.get(`/${_id}`)

export const getSingleProduct = (_id: string, _token: string) => 
  PRODUCT_API.get(`/${_id}`, { headers: { Authorization: `Bearer ${_token}` } })
  
// export const signupMethod = (signupDetails: SignupFormInterface) => USER_API.post(`/signup`, signupDetails)
// export const loginMethod = (loginDetails: LoginFormInterface) => USER_API.post('/login', loginDetails)

export const getReviewOfAProduct = (productId: string, _token: string) => 
  PRODUCT_API.get(`/${productId}/reviewProduct`, { headers: { Authorization: `Bearer ${_token}` } })

export const createReviewOfAProduct = (productId: string, _token: string, comment: { title: string, review: string, rating: number }) => 
  PRODUCT_API.post(`/${productId}/reviewProduct`, comment, { headers: { Authorization: `Bearer ${_token}` } })

export const createReviewOfAFarm = (_token: string, comment: { title: string, review: string, rating: number, farm: string }) => 
  COMMENT_FARM_API.post(`/`, comment, { headers: { Authorization: `Bearer ${_token}` } })

// export const getMyCart = (_token: string) => CART_API.get(`/mycart`, { headers: { Authorization: `Bearer ${_token}` } })

// export const removeItemsFromCart = (_token: string, _id: string) => 
//   CART_API.delete(`/${_id}/remove`, { headers: { Authorization: `Bearer ${_token}` } })

// export const addItemToCart = (_token: string, _id: string) => 
//   CART_API.post(`/${_id}/add`, {}, { headers: { Authorization: `Bearer ${_token}` } })

// export const decreaseItemFromCart = (_token: string, _id: string) =>
//   CART_API.patch(`/${_id}/decrease`, {}, { headers: { Authorization: `Bearer ${_token}` } })

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





const BUSINESS_URL = `${URL}/api/v1/business`
const USER_URL = `${URL}/api/v1/user`
const STOCK_URL = `${URL}/api/v1/stockProduct`
const ONDEMAND_URL = `${URL}/api/v1/ondemandProduct`
const CART_URL = `${URL}/api/v1/cart`
const CONSUMER_URL = `${URL}/api/v1/consumer`


const BUSINESS_API = axios.create({ baseURL: BUSINESS_URL })
const USER_API = axios.create({ baseURL: USER_URL })
const STOCK_API = axios.create({ baseURL: STOCK_URL })
const ONDEMAND_API = axios.create({ baseURL: ONDEMAND_URL })
const CART_API = axios.create({ baseURL: CART_URL })
const CONSUMER_API = axios.create({ baseURL: CONSUMER_URL })


export const signupMethod = (signupDetails: SignupFormInterface) => USER_API.post(`/signup`, signupDetails)
export const loginMethod = (loginDetails: LoginFormInterface) => USER_API.post('/login', loginDetails)

export const updateMe = (
  _token: string,
  formData: FormData
) => {
  USER_API.patch(`/updateMe`, formData, { headers: { Authorization: `Bearer ${_token}`}})
}

export const getAllBusiness = () => BUSINESS_API.get('/')
export const getSingleBusiness = (_id: string, _token: string) => BUSINESS_API.get(`/${_id}`, { headers: { Authorization: `Bearer ${_token}`}})

export const getAllStockProduct = () => STOCK_API.get('/')
export const getSingleStockProduct = (_id: string, _token: string, _unit: string) => STOCK_API.get(`/${_id}?unit=${_unit}`, { headers: { Authorization: `Bearer ${_token}`}})

export const getAllOndemandProduct = () => ONDEMAND_API.get('/')
export const getSingleOndemandProduct = (_id: string, _token: string, _unit: string) => ONDEMAND_API.get(`/${_id}?unit=${_unit}`, { headers: { Authorization: `Bearer ${_token}`}})

export const addProductToCart = (
  _itemId: string, 
  _token: string,
  _details: {
    orderQuantity: number,
    orderUnit: string
  }
) => CART_API.post(`/${_itemId}/add`, _details, { headers: { Authorization: `Bearer ${_token}`}})

export const getMyCart = (_token: string) => CART_API.get(`/myCart`, { headers: { Authorization: `Bearer ${_token}`}})
export const removeItemFromCart = (_token: string, _itemId: string) => CART_API.delete(`/${_itemId}/remove`, { headers: { Authorization: `Bearer ${_token}`}})

export const getMyConsumerProfile = (_token: string) => CONSUMER_API.get(`/myProfile`, { headers: { Authorization: `Bearer ${_token}`}})

export const updateMyConsumerProfileLocation = (
  _token: string, 
  _details: {
    location: {
      type: string,
      coordinates: Array<number>,
      description: string
    }
  }
) => CONSUMER_API.patch(`/myProfile`, _details, { headers: { Authorization: `Bearer ${_token}`}})