import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getMyOrdersProducer } from '../../../components/marketplace/API'
import { fetchToken } from '../../../components/marketplace/token'
import OrderCardComponentBusiness from '../../../components/business/order/OrderCardComponentBusiness'
import Navbar from '../../../components/marketplace/navBar/Navbar'

function AllMyOrders() {
  const [myBuy, setMyBuy] = useState<any>([])

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyOrdersProducer(token)
      const data = res.data.data.data
      setMyBuy(data)
      console.log("data: ", data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const styles = {
    page: `w-screen max-w-md flex flex-col justify-center items-center`,
    navBox: `w-full px-4 z-50`,
    container: `w-full flex flex-col justify-center items-center mt-24`,
  }

  return (
    <Box className="w-screen flex justify-center items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar 
            arrow={true} 
            myOrder={true}
            noCart={true}
          />
        </Box>

        <Box className={styles.container}>
          <Box className="w-11/12 flex justify-start items-center">
            <span className='text-2sm font-bold'>New</span>
          </Box>

          <Box className="mt-5 w-11/12">
            {
              myBuy.map((i: any) => {
                if(!i.delivered) {
                  return (
                    <OrderCardComponentBusiness 
                      key={i._id} 
                      id={i._id}
                      createdAt={i.createdAt}
                    />
                  )
                }
              })
            }
          </Box>

          <Box className="w-11/12 flex justify-start items-center mt-5">
            <span className='text-2sm font-bold'>Delivered</span>
          </Box>

          <Box className="mt-5 w-11/12">
            {
              myBuy.map((i: any) => {
                if(i.delivered) {
                  return (
                    <OrderCardComponentBusiness 
                      key={i._id} 
                      id={i._id}
                      createdAt={i.createdAt}
                    />
                  )
                }
              })
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AllMyOrders