import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Container, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Button from '@mui/material/Button'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmAddressCard from '../../components/marketplace/Farm/ConfirmAddressCard';
import { getMySelf, getMyAddress } from '../../components/marketplace/API';
import { fetchToken } from '../../components/marketplace/token';

function UserProfile() {

  const [profile, setProfile] = useState({
    email: '',
    myAddress: [],
    myFarm: [],
    name: ''
  })

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ]

  const fetch = async () => {
    try {
      const token = fetchToken()
      // console.log(token)

      const me = await getMySelf(token)
      const address = await getMyAddress(token)
      const data = me.data.data.data
      setProfile({
        email: data.email,
        myAddress: data.myAddress,
        myFarm: data.myFarm,
        name: data.name
      })
      console.log(address.data.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const styles = {
    page: `flex flex-col justify-between items-center`,
    navBox: `w-screen h-20 flex justify-between items-center bg-pearl`,
    profileText: `font-semibold text-3sm ml-auto mr-auto`,
    avaterBox: `mt-10 mb-5 w-11/12 flex justify-between items-center`,
    bigTxt: `w-full font-bold text-lg ml-6`,
    smallTxt: `text-sm ml-6`,
    mediumBoldTxt: `text-3sm font-bold mr-auto ml-auto`,
    walletBox: `w-10/12 h-10 mt-8 flex justify-around items-center`,
    btn: `border-2 bg-pearl capitalize text-black focus:bg-light-pearl drop-shadow-lg focus:drop-shadow-0.5lg`,
    currencyBox: `w-10/12 mt-10 mb-20 h-20 flex justify-center items-center`,
  }

  return (
    <Box className='w-screen flex justify-center items-center'>
      <Container className={styles.page} maxWidth="sm">
        <Paper className={styles.navBox} elevation={2}>
          <Box className="" >
            <ArrowBackIosIcon 
              fontSize='small' 
              className="ml-3"
              onClick={() => history.back()}
            />
          </Box>
          <span className={styles.profileText}>My Profile</span>
        </Paper>

        <Box className={styles.avaterBox}>
          <Box className="flex">
            <Avatar alt="Ankush Banik" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
            <IconButton color="primary" aria-label="upload picture" component="label" className='absolute mt-6 ml-7'>
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>
            <Box className="flex flex-col w-full" onClick={() => fetch()}>
              <span className={styles.bigTxt}>{profile.name}</span>
              <span className={styles.smallTxt}>{profile.email}</span>
            </Box>
        </Box>
        <Box className="w-full h-10 flex justify-center items-center mt-10">
          <Button 
            variant="outlined"
            className={styles.btn}
          >Connect Wallet</Button>
        </Box>
        <Box className={styles.walletBox}>
          <AccountBalanceWalletIcon />
          <span className={styles.mediumBoldTxt}>0x930......3D1f2s49</span>
        </Box>
        <Box className='w-screen max-w-sm mt-5 mb-10'>
          {
            profile.myAddress.length > 0 ?
            <ConfirmAddressCard /> :
            <Box className="w-full flex justify-center items-center">
              <Link href={'/Auth/AddLocation'}> 
                <Button variant='outlined' className={styles.btn}>Add Address</Button>
              </Link>
            </Box>
          }
        </Box>
        <Box className={styles.currencyBox}>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            defaultValue="USD"
            helperText="Please select your currency"
            className='bg-white drop-shadow-lg p-3 rounded-md'
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Container>
    </Box>
  )
}

export default UserProfile