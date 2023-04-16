import React, { useEffect, useState } from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import Link from 'next/link'
import { Box, Container } from '@mui/material';
import { getMyAddress } from '../API';
import { fetchToken } from '../token';

function ConfirmAddressCard(props: any) {

  const [data, setdata] = useState({
    name: '',
    country: '',
    flatDetails: '',
    landmark: '',
    mobileNo: 0,
    pinCode: 0,
    city: ''
  })

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyAddress(token)
      const resData = res.data.data.data[0]
      setdata({
        name: resData.user.name,
        country: resData.country,
        flatDetails: resData.flatDetails,
        landmark: resData.landMark,
        mobileNo: resData.mobileNumber,
        pinCode: resData.pincode,
        city: resData.town
      })
      console.log(res.data.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeliver = () => {
    try {
      props.setConfirm({
        address: true,
        payment: false,
        debitCard: false,
        order: false,
        value: 1
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-sm`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mb-5 mt-5`,
    aboutCard: `w-10/12 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-center items-start`,
    smallTxt: `font-semibold text-2sm`,
    upbtn: `text-2sm w-10/12 border-2 rounded-lg bg-pearl h-8 mt-5 ml-auto mr-auto p-1`,
    lowbtn: `text-2sm w-10/12 border-2 rounded-lg bg-white h-8 mt-5 mb-5 ml-auto mr-auto p-1 flex justify-center items-center`
  }

  return (
    <Box className={styles.card}>
      <span className={styles.bigTxt}>Delivery Address</span>
      <Container className={styles.aboutCard}>
        <Box className="flex w-full justify-around items-center">
          <RadioButtonCheckedIcon fontSize='small' />
          <Box className="flex flex-col mt-5 ml-5">

            <span className='font-bold text-2sm'>RECENTLY USED</span>
            <span className='font-bold text-sm'>{data.name}</span>
            <span className={styles.smallTxt}>{data.flatDetails}</span>
            <span className={styles.smallTxt}>{data.city}, {data.pinCode}</span>
            <span className={styles.smallTxt}>{data.country}</span>
            <span className={styles.smallTxt}>Phone number: {data.mobileNo}</span>
          </Box>
        </Box>
        <button className={styles.upbtn} onClick={handleDeliver}>{`Deliver to this address`}</button>
        {/* <Link href={'/Auth/AddLocation'}> */}
          <Link href={'/Auth/AddLocation'} className={styles.lowbtn}>{`Edit Address`}</Link>
        {/* </Link> */}
      </Container>
    </Box>
  )
}

export default ConfirmAddressCard