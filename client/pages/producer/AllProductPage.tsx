import { Box } from '@mui/material'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'
import SearchBar from '../../components/marketplace/navBar/SearchBar'
import BottomNav from '../../components/marketplace/navBar/BottomNav'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ProductFilterNav from '../../components/marketplace/navBar/ProductFilterNav'
import { getMyStockProducts, getMyOndemandProduct, getMyBusinessProfile } from '../../components/marketplace/API'
import { fetchToken } from '../../components/marketplace/token'
import ProductCardComponent from '../../components/marketplace/product/ProductCardComponent'


function AllProductPage() {
  const [stockProduct, setStockProduct] = useState(false)
  const [myStockProducts, setMyStockProducts] = useState<any>([{}])
  const [myOndemandProducts, setMyOndemandProducts] = useState<any>([{}])
  const [myProfile, setMyProfile] = useState<any>({})

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyBusinessProfile(token)
      const res1 = await getMyStockProducts(token)
      const res2 = await getMyOndemandProduct(token)
      const data = res.data.data.data[0]
      const stock = res1.data.data.data
      const ondemand = res2.data.data.data
      setMyStockProducts(stock)
      setMyOndemandProducts(ondemand)
      setStockProduct(true)
      setMyProfile(data)
      // console.log(stock)
      // console.log(ondemand)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    fetch()
  }, [])

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    navBox2: `w-full z-50 top-0 mt-20 bg-white fixed`,
    navBox3: `w-full z-50 top-0 bg-white fixed`,
    navBox4: `w-10/12 z-50 top-0 bg-white fixed flex justify-between items-center`,
    scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-56`,
  }
  return (
    <Box className={styles.page}>
      <Box className={styles.navBox}>
        <Navbar 
          arrow={false} 
          produce={true}
          noCart={true}
        />
      </Box>
      <Box className={styles.navBox2}>
        <ProductFilterNav 
          produce={true} 
          setStockProduct={setStockProduct}
        />
        {/* <FilterNav setShowFarm={setShowFarm} /> */}
      </Box>
      <Box className={styles.navBox3} sx={{marginTop: '124px'}}>
        <SearchBar />
      </Box>
      <Box className={styles.navBox4} sx={{marginTop: '180px'}}>
        {
          stockProduct ?
          <span className='text-2sm'>{myStockProducts.length} products</span> :
          <span className='text-2sm'>{myOndemandProducts.length} products</span>
        }
        {
          stockProduct ?
          <Link href={{
              pathname: `/producer/AddStockProduct`,
              query: {data: "post"}
            }} 
            className='text-black'
          >
            <AddCircleOutlineOutlinedIcon fontSize='small' />
          </Link> :
          <Link href={{
            pathname: `/producer/AddOndemandProduct`,
            query: {data: "post"}
          }} 
          className='text-black'
          >
            <AddCircleOutlineOutlinedIcon fontSize='small' />
          </Link> 
        }
      </Box>

      <Box className={styles.scrollingBox}>
        {
          stockProduct ?
          myStockProducts.map((product: any) => {
            return (
              <Box 
              className='text-black no-underline w-11/12 cursor-pointer'
              key={product._id}
              >
                <ProductCardComponent
                  key={product._id} 
                  id={product._id}
                  stockProduct={true}
                  name={product.name}
                  stock={product.stock}
                  unit={product.unit}
                  price={product.price}
                  images={product.image}
                  producer={true}
                />
              </Box>
            )
          })
           :
           myOndemandProducts.map((product: any) => {
            return (
              <Box 
              className='text-black no-underline w-11/12 cursor-pointer'
              key={product._id}
              >
                <ProductCardComponent
                  key={product._id} 
                  id={product._id} 
                  name={product.name}
                  stockProduct={false}
                  capacity={product.capacity}
                  unit={product.unit}
                  price={product.price}
                  images={product.image}
                  producer={true}
                />
              </Box>
            )
          })
        }
      </Box>

      <Box className="w-full mt-10">
        <BottomNav 
          produce={true}
          warning={(typeof myProfile?.location === "undefined") || (typeof myProfile?.walletAddress === "undefined")}
        />
      </Box>
    </Box>
  )
}

export default AllProductPage