import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { getMySelf, getMyCart } from '../API'
import { fetchToken } from '../token'
import { Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';


function Navbar(props: any) {

  const [token, setToken] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const fetch = async () => {
    try {
      const tokenObj = localStorage.getItem('Token') || null

      let Token = fetchToken()
      setToken(Token)
      const response = await getMyCart(Token)
      if(response.data.data.data.length > 0) {

        const cartData = response.data.data.data[0].items
  
        setCartItems(cartData)
        let total = 0
  
        cartData.forEach((i: any) => total += i.quantity)
        setTotalAmount(total)
  
        console.log(cartData)
        console.log(cartData.length)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid red`,
      backgroundColor: 'red',
      padding: '0 4px',
    },
  }))

  useEffect(() => {
    fetch()
  }, [props.load])

  const styles = {
    fullPage: `w-screen flex flex-col justify-between items-center fixed top-0 left-0`,
    upperNav: `flex w-full h-20 justify-around items-center bg-white max-w-screen-sm`,
    bar: `flex justify-between items-center w-full h-3/6`,
    searchBar: `flex justify-around items-center w-7/12 h-4/6 bg-white rounded-md p-2`,
    input: `w-11/12 h-full flex justify-center items-center focus:outline-none placeholder:text-2sm p-2 rounded-md`,
    imgCover: `h-10 w-10 rounded-full`,
    linkStyle: `flex flex-col justify-center items-center h-20 w-20 text-black no-underline`,
    headTxt: `text-3sm font-bold`,
  }
  return (
    <Box className="w-full justify-center items-center">

      <Box className={styles.fullPage}>
        <Box className={styles.upperNav}>
      
          <Box className={styles.bar}>
            <Box className="ml-5">
              {
                props.arrow ?
                <KeyboardBackspaceOutlinedIcon 
                  fontSize='large' 
                  onClick={() => history.back()}
                />
                :
                <MenuIcon />
              }
            </Box>
          
            {
              props.farm ? 
              <span className={styles.headTxt}>Farm</span> : 
              props.product ?
              <span className={styles.headTxt}>Product</span> : 
              props.order ?
              <span className={styles.headTxt}>Order</span> : 
              <span className={styles.headTxt}>Discover</span>
            }
            
            <Box className="mr-5">
              {/* <ShoppingCartOutlinedIcon /> */}
              <Link href={'/Components/CartPage'} className="mr-2">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={totalAmount} sx={{color: 'white'}}>
                    <ShoppingCartOutlinedIcon sx={{color: 'black'}} />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar