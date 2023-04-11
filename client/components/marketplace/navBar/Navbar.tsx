import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import UserProfile from '../../../pages/Auth/UserProfile'
import { getMyCart } from '../API'

function Navbar(props: any) {

  // const [signup, setSignup] = useState(true)
  const [token, setToken] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const fetch = async () => {
    try {
      const tokenObj = localStorage.getItem('Token') || null
      let Token
      if(tokenObj) {
        Token = JSON.parse(tokenObj).value
      }
      setToken(Token)
      const response = await getMyCart(Token)
      const cartData = response.data.data.data[0].items

      setCartItems(cartData)

      let total = 0

      cartData.forEach((i: any) => total += i.quantity)
      setTotalAmount(total)

      console.log(cartData)
      console.log(cartData.length)
    } catch (error) {
      console.log(error)
    }
  }

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))

  useEffect(() => {
    fetch()
  }, [props.load])

  const styles = {
    fullPage: `w-screen h-36 flex flex-col justify-between items-center fixed top-0 left-0`,
    upperNav: `flex w-full h-28 justify-around items-center bg-pearl max-w-screen-sm`,
    bar: `flex justify-around items-center w-full h-3/6`,
    searchBar: `flex justify-around items-center w-7/12 h-4/6 bg-white rounded-md p-2`,
    input: `w-11/12 h-full flex justify-center items-center focus:outline-none placeholder:text-2sm p-2 rounded-md`,
    imgCover: `h-10 w-10 rounded-full`,
    lowerNav: `flex w-full h-11 justify-between items-center bg-light-pearl max-w-screen-sm `,
  }
  return (
    <div className="w-full justify-center items-center">

      <div className={styles.fullPage}>
        <div className={styles.upperNav}>
          <div className={styles.bar}>
            <div className={styles.searchBar}>
              <SearchIcon fontSize='medium' />
              <input type="text" placeholder='Joe Doe Farm' className={styles.input} />
            </div>

            {
              token ?
              <Link href={'/Auth/UserProfile'} className="flex flex-col justify-center items-center h-20 w-20">
                <div className={styles.imgCover}>
                  <AccountCircleIcon className='w-full h-full' color='primary' />
                </div>
                <span className='font-semi-bold text-2sm'>Profile</span>
              </Link>
              :
              <Link href={'/Auth/LoginPage'} className="flex flex-col justify-center items-center h-20 w-20">
                <div className={styles.imgCover}>
                  <AccountCircleIcon className='w-full h-full' color='primary' />
                </div>
                <span className='font-semi-bold text-2sm'>Login</span>
              </Link>
            }


          </div>
        </div>
        <div className={styles.lowerNav} onClick={() => console.log(cartItems)}>
          <div className="">
            <LocationOnIcon color='primary' className='' />
            <span className='text-2sm ml-2'>KL Ranch, Park street, Townswap, USA</span>
          </div>

          <Link href={'/Components/CartPage'} className="mr-2">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={totalAmount} color="secondary">
                <ShoppingCartIcon color='primary' />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar