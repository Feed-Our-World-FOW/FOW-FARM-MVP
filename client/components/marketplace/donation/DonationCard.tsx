import { Box } from '@mui/material'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import { transaction } from '../../crypto/Transaction'
import { createBuy } from '../API'
import { fetchToken } from '../token'
import Router from 'next/router'
import 'animate.css'

function DonationCard(props: any) {
  const router = Router.query
  const [selectedValue, setSelectedValue] = useState('')
  const [donationAmount, setDonationAmount] = useState(0)
  const [buydetails, setBuydetails] = useState({
    paymentOption: "",
    deliveryType: ""
  })
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(event.target.value as unknown as number);
    console.log(event.target.value)
  };

  const fetch = async () => {
    try {
      const token = fetchToken()
      if(router.ondemand) {
        console.log("buydetails: ", buydetails)
      }else if(router.stock) {
        if(props.standard) {
          setBuydetails({
            paymentOption: "Crypto",
            deliveryType: "standard"
          })
        }else if(props.express) {
          console.log("express is true")
          setBuydetails({
            paymentOption: "Crypto",
            deliveryType: "express"
          })
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  const buy = async () => {
    try {
      const token = fetchToken()
      // const res = await createBuy(token, buydetails)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancell = async () => {
    try {

      const res = await transaction("kjf", 2)
      
      const buyF = await buy()
      console.log(buyF)
      

      // props.setShowDonation(false)
      props.setDonation(false)
      props.setOrderSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleContinue = async() => {
    try {
      const res = await transaction("kjf", 2)
      const res2 = await transaction("kjf", 2)
      

      const buyF = await buy()
      console.log(buyF)

      // props.setShowDonation(false)
      props.setDonation(false)
      props.setOrderSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = {
    container: `w-11/12 h-full rounded-2xl flex flex-col justify-center items-center border-1 mb-5 bg-white animate__animated animate__zoomIn`,
    boldTxt: `font-bold mt-7`,
    txtBox: `w-11/12 flex flex-col justify-center items-center mt-7`,
    semiboldTxt: `text-2sm font-semibold`,
    inputBox: `mt-5 w-11/12 h-9 rounded-xl border-1 border-light-gray`,
    input: `w-full h-full rounded-xl px-5 text-2sm font-semibold`,
    donationBox: `w-11/12 h-24 rounded-2xl border-1 mt-5 border-green bg-blue-white flex justify-between items-center`,
    btnBox: `w-11/12 h-10 mt-10 mb-5 flex justify-between items-center`,
    btn: `text-2sm font-semibold w-32 border-2 rounded-3xl h-10 bg-green border-green px-3`,
    btn2: `text-2sm font-semibold w-32 border-2 rounded-3xl h-10 px-3`,
  }

  return (
    <Box className={styles.container}>
      <span className={styles.boldTxt}>Donation</span>

      <Box className={styles.txtBox}>
        <span className={styles.semiboldTxt}>Would you like to take a few seconds to </span>
        <span className={styles.semiboldTxt}>donate and benefit organizations?</span>
        <span className={styles.semiboldTxt}>Your donation will be distributed among the</span>
        <span className={styles.semiboldTxt}>organizations you select.</span>
      </Box>


      <TextField
        id="outlined-number"
        label="Donation Amount"
        type="number"
        className="w-10/12 mt-5"
        value={donationAmount}
        onChange={handleChangeAmount}
      />

      <Box className="w-11/12 flex justify-start items-center mt-5">
        <span className='font-semibold text-2sm text-dark-gray'>1 selected organization</span>
      </Box>

      <Box className={styles.donationBox}>
        <Box className="h-full w-3/12 flex justify-center items-center">
          <Image 
            alt="#"
            src="/images/fow.png"
            height={100}
            width={100}
            onClick={() => console.log(buydetails)}
          />
        </Box>
        <Box className="h-full w-8/12 flex flex-col justify-center items-center">
          <span className='text-2sm font-bold mr-auto'>Feed Our World</span>
          <span className='text-sm font-semibold mt-1'>It helps those who have difficulties buying enough food and avoiding hunger.</span>
        </Box>
        <Radio
          checked={selectedValue === 'fow'}
          onChange={handleChange}
          value="fow"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'FOW' }}
        />
      </Box>

      <Box className={styles.btnBox}>
        <button className={styles.btn2} onClick={handleCancell}>{`No, thanks`}</button>
        <button className={styles.btn} onClick={handleContinue}>{`Yes, please`}</button>
      </Box>
    </Box>
  )
}

export default DonationCard