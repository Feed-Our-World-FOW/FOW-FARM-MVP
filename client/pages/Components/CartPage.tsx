import React, { useState, useEffect } from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'
import CartProductCard from '../../components/marketplace/shoppingCart/CartProductCard'
import Image from 'next/image'
import { getMyCart } from '../../components/marketplace/API'
import { fetchToken } from '../../components/marketplace/token'
import { Box } from '@mui/material'
import Link from 'next/link'

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
    btnBox: `w-full flex justify-center items-center`,
    btn: `w-10/12 rounded-md p-1 bg-pearl font-semibold`,
    cartProductBox: `flex flex-col justify-center items-center w-screen mb-10 mt-10`
  }

  return (
    <Box className="w-screen flex justify-center items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar load={handleReload} />
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
            <Box className={styles.totalBox}>
              <span className='mr-1 text-3sm'>Subtotal: </span> 
              <span className='font-bold'>$ {subTotal}</span>
            </Box>
            <Box className={styles.btnBox}>
              <Link
                href={'/Components/DeliverySteps'} 
                className={styles.btn} 
                onClick={fetch}
              >
                {`Proceed to Buy ( ${totalItems()} items)`}
              </Link>
            </Box>
            <Box className={styles.cartProductBox}>
              {
                cartItems.map((item: any) => {
                  return (
                    <Box className="w-full h-full flex flex-col justify-center items-center" key={item._id}>
                      <CartProductCard 
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
                      <Box className="border-b-2 w-10/12 mt-10 mb-2 max-w-md"></Box>
                    </Box>
                  )
                })
              }
            </Box>
          </>
        }
      </Box>
    </Box>
  )
}

export default CartPage