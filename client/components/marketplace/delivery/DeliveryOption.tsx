import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getSingleStockProduct, getSingleOndemandProduct } from '../API';
import { fetchToken } from '../token';
import router from 'next/router';

function DeliveryOption(props: any) {
  const data = router.query

  const [businessProfile, setBusinessProfile] = useState<any>({})

  const handleContinue = () => {
    props.setConfirm({
      address: true,
      payment: true,
      debitCard: false,
      order: false,
      value: 2
    })
  }

  const fetch = async () => {
    try {
      const token = fetchToken()
      let product
      if(data.ondemand) {
        product = await getSingleOndemandProduct(data.ondemand as string, token, "lb")
      } else if(data.stock) {
        product = await getSingleStockProduct(data.stock as string, token, "lb")
      }
      const business = product?.data.data.data.businessProfile
      setBusinessProfile(business)
      console.log(business)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    page: `w-full h-full flex flex-col justify-center items-center`,
    btn: `mr-auto w-36 border-1 border-light-gray h-8 rounded-3xl text-2sm font-semibold focus:bg-dark-gray focus:text-white`,
    bigBtn: `w-11/12 bg-green rounded-3xl text-2sm font-semibold h-8 mb-5`,
    container: `w-11/12 h-52 border-1 border-light-gray rounded-3xl flex flex-col justify-around items-center mb-5`,
  }

  return (
    <Box className={styles.page}>
      <Box className="w-full flex justify-center items-center mb-5">
        <span className='text-2sm font-semibold'>Shipping</span>
      </Box>

      <Box className={styles.container}>
        <Box className="w-full flex justify-center items-center">
          <span className='text-2sm font-semibold'>Stock</span>
        </Box>

        <Box className="w-10/12 flex flex-col justify-between items-center">
          <button className={styles.btn}>Standard</button>
          <Box className="w-full flex justify-between items-center mt-2 ml-2">
            <span className='text-2sm font-normal'>{businessProfile.shippingTimeStandard}</span>
            <span className='text-2sm font-normal'>$ {businessProfile.shippingCostStandard}</span>
          </Box>
        </Box>

        <Box className="w-10/12 flex flex-col justify-between items-center mb-3">
          <button className={styles.btn}>Express</button>
          <Box className="w-full flex justify-between items-center mt-2 ml-2">
            <span className='text-2sm font-normal'>{businessProfile.shippingTimeExpress}</span>
            <span className='text-2sm font-normal'>$ {businessProfile.shippingCostExpress}</span>
          </Box>
        </Box>
      </Box>


      <Box className={styles.container}>
        <Box className="w-full flex justify-center items-center">
          <span className='text-2sm font-semibold'>On demand</span>
        </Box>

        <Box className="w-10/12 flex flex-col justify-between items-center">
          <Box className="w-full flex justify-between items-center mt-2 ml-2">
            <span className='text-2sm font-normal'>30 - 40 business days</span>
            <span className='text-2sm font-normal'>$ 0.00</span>
          </Box>
        </Box>

        <Box className="w-11/12 flex flex-col justify-between items-center mb-3">
          <Box className="w-full h-8 border-1 rounded-3xl border-light-gray flex justify-between items-center">
            <span className='text-2sm ml-7'>Expected delivery date</span>
            <CalendarMonthOutlinedIcon fontSize='small' className='mr-3' />
          </Box>
        </Box>
      </Box>

      <button className={styles.bigBtn} onClick={handleContinue}>
        continue
      </button>
    </Box>
  )
}

export default DeliveryOption