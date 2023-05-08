import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Link from 'next/link';
import { fetchToken } from '../token';

function BottomNav() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [url, setUrl] = useState('')

  const fetch = async () => {
    try {
      const token = fetchToken()
      if(token) {
        setLoggedIn(true)
      }
      console.log(window.location)
      setUrl(window.location.pathname)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    focus: `flex justify-center items-center`,
    focus2: `flex justify-center items-center border-1 w-full h-full rounded-3xl focus:bg-green active:bg-green`,
    box: `flex flex-col justify-center items-center h-12 w-20 rounded-3xl focus:bg-green active:bg-green`,
    Urlbox: `flex flex-col justify-center items-center h-12 w-20 rounded-3xl bg-green `,
    txt: `text-2sm font-semibold`
  }

  return (
    
    <Box className="w-full fixed bottom-0 max-w-md flex justify-around items-center min-h-20 bg-light-white">
      <Link href={'/'} className={url === '/' ? styles.Urlbox : styles.box}>
        <Box  className={styles.focus}>
          <ShoppingBagOutlinedIcon fontSize='medium' />
        </Box>
        <span className={styles.txt}>Consume</span>
      </Link>

      <button  className={styles.box}>
        {
          loggedIn ?

          <Link href={'/Auth/UserProfile'} className={url === '/Auth/UserProfile' ? styles.Urlbox : styles.focus2}>
            <Box className='w-full h-full rounded-3xl flex flex-col justify-center items-center'>
              <PermIdentityIcon fontSize='medium' />
              <span className={styles.txt}>Profile</span>
            </Box>
          </Link> :

          <Link href={'/Auth/LoginPage'} className={styles.focus2}>
            <Box className='w-full h-full rounded-3xl flex flex-col justify-center items-center'>
              <PermIdentityIcon fontSize='medium' />
              <span className={styles.txt}>Login</span>
            </Box>
          </Link> 
        }
      </button>
    </Box>
  );
}

export default BottomNav