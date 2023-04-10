// import React, { createContext, useState } from 'react'

// export const ShopContext = createContext(null)

// // const getDefaultCarts = () => {
// //   let cart = {}
// //   for
// // }

// export const ShopContextProvider = (props: any) => {
//   const [cartItems, setCartItems] = useState([{
//     farmId: '',
//     itemId: '',
//     amount: 0
//   }])

//   const addToCart = (farmId: string, itemId: string) => {
//     // if(farmId !== null && farmId)
//     for(let i = 0; i < cartItems.length; i++) {
//       if(cartItems.length > 1) {
//         // if(cartItems)
//       } else {
//         setCartItems((prevItems: any) => {...prevItems, {farmId}})
//       }
//     }
//   }

//   const removeFromCart = (itemId: string) => {
//     // setCartItems((prev) => { ...Prev, [itemId]})
//   }

//   const contextValue: any = { cartItems, addToCart, removeFromCart}

//   return (
//     <ShopContext.Provider value={contextValue}>
//       Shop Context
//     </ShopContext.Provider>  
//   ) 
// }