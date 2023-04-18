import React, { useState, useEffect } from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'
import CartProductCard from '../../components/marketplace/shoppingCart/CartProductCard'
import Image from 'next/image'
import { getMyCart } from '../../components/marketplace/API'
import { fetchToken } from '../../components/marketplace/token'
import { Box } from '@mui/material'
import Link from 'next/link'
import CartProductCardComponent from '../../components/marketplace/shoppingCart/CartProductCardComponent'

function CartPage() {

  const [empty, setEmpty] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [reloadComponent, setReloadComponent] = useState(false)

  const handleReload = () => {
    setReloadComponent(prevState => !prevState);
  }

  const totalItems = (): number => {
    try {
      let total = 0
      cartItems.map((item: any) => {
        total += item.quantity
      })
      return total
    } catch (error) {
      console.log(error)
      return 0
    }
  }


  const fetch = async () => {
    try {
      const Token = fetchToken()
      const response = await getMyCart(Token)
      // console.log(response)
      setSubTotal(response.data.data.data[0].subTotal)
      setCartItems(response.data.data.data[0].items)
      if(response.data.data.data[0].items.length > 0) {
        setEmpty(false)
      }else {
        setEmpty(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [reloadComponent])

  const styles = {
    page: `w-screen flex flex-col justify-center items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    totalBox: `mt-36 flex pt-5 pb-5 pl-3 w-11/12`,
    btnBox: `w-full flex justify-center items-center mt-20`,
    // btn: `w-10/12 rounded-md p-1 bg-pearl font-semibold`,
    cartProductBox: `flex flex-col justify-center items-center w-screen max-w-md mb-10`,
    bottomBox: `w-11/12 max-w-md flex justify-around items-center h-16`,
    btn: `w-5/12 h-8 rounded-3xl border-2 border-green text-black text-3sm font-bold focus:bg-green focus:text-white`
  }

  return (
    <div className="w-screen min-h-screen flex flex-col justify-between items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar 
            load={handleReload} 
            order={true}
            arrow={true}
          />
        </Box>
        {
          empty ?
          <Box className='mt-44 flex flex-col justify-center items-center'>
            <Image 
              alt="#"
              src={`/images/emptycart.png`}
              width={200}
              height={200}
              className='w-full h-full'
            />
            <span className='font-semibold text-lg'>Oops...</span>
            <span className='font-semibold text-lg'>Your FOW Cart is empty</span>
            <span className='font-semibold text-2sm'>Pick up where you left off</span>
          </Box>
          :
          <>
            {/* <Box className={styles.totalBox}>
              <span className='mr-1 text-3sm'>Subtotal: </span> 
              <span className='font-bold'>$ {subTotal}</span>
            </Box> */}
            {/* <Box className={styles.btnBox}>
              <Link
                href={'/Components/DeliverySteps'} 
                className={styles.btn} 
                onClick={fetch}
              >
                {`Proceed to Buy ( ${totalItems()} items)`}
              </Link>
            </Box> */}
            <Box className="w-full flex justify-center items-center mt-24">
              <span className='text-2sm font-semibold mr-1'>{totalItems()}</span> 
              {
                totalItems() > 1 ? 
                <span className='text-2sm font-semibold'>Products</span> : 
                <span className='text-2sm font-semibold'>Product</span>
              }
            </Box>
            <Box className={styles.cartProductBox}>
              {
                cartItems.map((item: any) => {
                  return (
                    <Box className="w-full h-full flex flex-col justify-center items-center mt-10" key={item._id}>
                      <CartProductCardComponent
                        key={item._id}
                        quantity={item.quantity}
                        id={item.product._id}
                        price={item.product.price}
                        name={item.product.name}
                        summary={item.product.summary}
                        weight={item.product.weight}
                        image={item.product.image[0]}
                        loadFunc={handleReload}
                      />
                      {/* <Box className="border-b-2 w-10/12 mt-10 mb-2 max-w-md"></Box> */}
                    </Box>
                  )
                })
              }
            <Box className='w-7/12 h-10 mt-10 flex justify-end items-center'>
              <span className='text-2sm font-bold mr-5'>Total</span>
              <span className='text-2sm font-bold ml-5'>$172.45</span>
            </Box>
            </Box>
          </>
        }
      </Box>
      <Box className={styles.bottomBox}>
        <button className={styles.btn}>Add Produce</button>
        <button className={styles.btn}>Checkout</button>
      </Box>
    </div>
  )
}

export default CartPage