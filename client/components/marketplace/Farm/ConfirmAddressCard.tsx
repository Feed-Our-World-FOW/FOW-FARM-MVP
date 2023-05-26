import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Container } from '@mui/material';
import { getMyConsumerProfile } from '../API';
import { fetchToken } from '../token';
import LocationCard from '../location/LocationCard';

function ConfirmAddressCard(props: any) {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  })
  const [data, setData] = useState<any>({})

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyConsumerProfile(token)
      const data = res.data.data.data[0]
      // console.log(data)
      setLocation({
        lat: data.location.coordinates[1],
        lng: data.location.coordinates[0]
      })
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleContinue = () => {
    props.setConfirm({
      address: true,
      payment: false,
      debitCard: false,
      order: false,
      value: 1
    })
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-sm`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mb-5 mt-5`,
    aboutCard: `w-11/12 h-60 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-center items-start`,
    smallTxt: `font-semibold text-2sm`,
    upbtn: `text-2sm w-10/12 border-2 rounded-lg bg-pearl h-8 mt-5 ml-auto mr-auto p-1`,
    lowbtn: `text-2sm w-10/12 border-2 rounded-lg bg-white h-8 mt-5 mb-5 ml-auto mr-auto p-1 flex justify-center items-center`,
    btn1: `w-32 border-1 rounded-2xl h-8 text-2sm font-semibold`,
    btn2: `w-32 bg-green border-1 border-green rounded-2xl h-8 text-2sm font-semibold`,
  }

  return (
    <Box className={styles.card}>
      <span className={styles.bigTxt}>Address</span>
      <Container className={styles.aboutCard}>
        <LocationCard 
          lat={location.lat}
          lng={location.lng}
        />
      </Container>
      <Box className="mt-5 w-11/12 leading-tight">
        <span className='text-2sm font-bold mr-3'>Description:</span>
        <span className='text-sm font-semibold'>{data?.location?.description}</span>
      </Box>
      <Box className="w-11/12 flex justify-around items-center mt-20 mb-3">
        <button className={styles.btn1}>
          <Link href={"/consumer/location/ShowMap"}>Update Address</Link>
        </button>
        <button className={styles.btn2} onClick={handleContinue}>Continue</button>
      </Box>
    </Box>
  )
}

export default ConfirmAddressCard