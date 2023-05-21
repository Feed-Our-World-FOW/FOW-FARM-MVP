import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSingleBuy } from '../../../components/marketplace/API'
import { fetchToken } from '../../../components/marketplace/token'

function OrderDetailsPage() {
  const router = useRouter()
  const data = router.query

  const [orderDetails, setOrderDetails] = useState<any>({})

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getSingleBuy(token, data.id as string)
      const details = res.data.data.data
      setOrderDetails(details)
      console.log(details)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const styles = {
    page: `w-screen flex flex-col justify-center items-center`,
    container: `w-screen max-w-md flex flex-col justify-center items-center`,
  }
  return (
    <Box className={styles.page}>
      <Box className={styles.container}>

      </Box>
    </Box>
  )
}

export default OrderDetailsPage