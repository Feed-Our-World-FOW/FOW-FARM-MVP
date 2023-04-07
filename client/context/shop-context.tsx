import React, { createContext, useState } from 'react'
import { Prev } from 'react-bootstrap/esm/PageItem'

export const ShopContext = createContext(null)

// const getDefaultCarts = () => {
//   let cart = {}
//   for
// }

export const ShopContextProvider = (props: any) => {
  const [cartItems, setCartItems] = useState({
    itemId: '',
    amount: 0
  })

  const addToCart = (itemId: string) => {
    // setCartItems((prev) => { ...Prev, [itemId]})
  }

  const removeFromCart = (itemId: string) => {
    // setCartItems((prev) => { ...Prev, [itemId]})
  }

  const contextValue: any = { cartItems, addToCart, removeFromCart}

  return (
    <ShopContext.Provider value={contextValue}>
      Shop Context
    </ShopContext.Provider>  
  ) 
}