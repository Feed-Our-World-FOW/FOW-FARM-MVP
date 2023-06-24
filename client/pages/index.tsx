import type { NextPage } from 'next'
import AllFarms from './consumer/AllFarms'
import AllProductPage from './producer/AllProductPage'
import { fetchToken } from '../components/marketplace/token'
import React, { useState, useEffect } from 'react'
import { getMe } from '../components/marketplace/API'

const Home: NextPage = () => {
  const [consumer, setConsumer] = useState(true)


  const fetch = async() => {
    try {
      const token = fetchToken()
      let me
      if(token) {
        me = await getMe(token)
      }else if (typeof token === "undefined") {
        setConsumer(true)
        return
      }
      const data = me?.data.data.data
      if(data?.role === "user") {
        setConsumer(true)
      } else if(data?.role === "business") {
        setConsumer(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      {
        consumer ?
        <AllFarms /> :
        <AllProductPage />
      }
    </div>
  )
}

export default Home
