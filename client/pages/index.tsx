import type { NextPage } from 'next'
import AllFarms from './consumer/AllFarms'
import AllProductPage from './producer/AllProductPage'
import { fetchToken } from '../components/marketplace/token'
import React, { useState, useEffect } from 'react'
import { getMe } from '../components/marketplace/API'
// import Web3Modal from "web3modal"
// import { ethers } from 'ethers'

const Home: NextPage = () => {
  const [consumer, setConsumer] = useState(true)

  // const providerOptions = {

  // }

  // const connectWallet = async () => {
  //   try {
  //     let web3modal = new Web3Modal({
  //       cacheProvider: false,
  //       providerOptions
  //     })
  //     const web3ModalInstance = await web3modal.connect()
  //     const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
  //     console.log(web3ModalProvider)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetch = async() => {
    try {
      const token = fetchToken()
      let me
      if(token) {
        me = await getMe(token)
      }
      const data = me?.data.data.data
      if(data.role === "user") {
        setConsumer(true)
      } else if(data.role === "business") {
        setConsumer(false)
      }
      console.log(data.role)
      console.log(data.role === "user")
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
