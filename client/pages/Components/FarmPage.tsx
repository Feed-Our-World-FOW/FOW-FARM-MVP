import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/navBar/Navbar'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { getSingleBusiness } from '../../components/marketplace/API'
import { AllFarmsInterface, RouterQueryInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Img/ImageCard'
import { createReviewOfAFarm } from '../../components/marketplace/API'
import { getMyCart } from '../../components/marketplace/API'
import { fetchToken } from '../../components/marketplace/token'
import Skeleton from '@mui/material/Skeleton';
import { Alert, AlertColor, Box, Container, Paper, Snackbar, styled } from '@mui/material'
import BottomNav from '../../components/marketplace/navBar/BottomNav'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ProductCardComponent from '../../components/marketplace/product/ProductCardComponent'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ProductFilterNav from '../../components/marketplace/navBar/ProductFilterNav'


function FarmPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface
  let array = [1, 2]
  const [farmDetails, setFarmDetails] = useState<any>({})
  const [showStockProduct, setShowStockProduct] = useState<boolean>(false)
  const [Token, setToken] = useState<string>('')
  const [cartItems, setCartItems] = useState([])
  const [reloadComponent, setReloadComponent] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [alertType, setalertType] = useState<AlertColor>("success" || "warning" || "info" || "error")

  const handleReload = () => {
    setReloadComponent(prevState => !prevState);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const fetch = async () => {
    try {
      const token = fetchToken()
      console.log(id.data)
      setToken(token)
      const x: AllFarmsInterface = await getSingleBusiness(id.data, token)
      const data = x.data.data.data

      const response = await getMyCart(token)
      if(response.data.data.data.length > 0) {
        const cartData = response.data.data.data[0].items
        setCartItems(cartData)
      }
      
      // console.log("Data",data)
      setShowStockProduct(true)

      setFarmDetails(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.data])


  const styles = {
    page: `w-screen flex flex-col justify-between items-center`,
    container: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    top_container: `w-11/12 h-60 mt-28 border-1 border-light-gray max-w-md rounded-3xl flex flex-col justify-around items-center`,
    productsBox: `w-full mt-10 mb-10 flex flex-col justify-center items-center`,
    top_sub_container: `w-10/12 h-48 flex flex-col justify-around items-center`,
    top_sub_box: `border-b-1 border-light-gray w-11/12 h-10 flex justify-between items-center`,
    commentBox: `w-full flex flex-col justify-centar items-center mt-3`,
    bottomBox: `w-full flex justify-center items-center mt-10`,
    statBox: `w-10 h-10 flex flex-col justify-between items-center`,
    farm_name_txt: `text-2sm font-bold w-full flex justify-center items-center`,
    img_box: `w-20 h-20 rounded-full bg-white mb-10 absolute`,
    low_container: `w-full h-16 flex justify-around items-center`,
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.navBox}>
          <Navbar 
            arrow={true} 
            farm={true}
            load={reloadComponent} 
          />
        </Box>

        <Box className={styles.top_container}>
          <Box className={styles.top_sub_container}>
            <Box className={styles.top_sub_box}>
              <FavoriteBorderOutlinedIcon />
              <MonetizationOnOutlinedIcon />
            </Box>
            <Box className={styles.img_box}>
              <ImageCard 
                image={farmDetails?.user?.photo}
                rounded={true}
              />
            </Box>
            <span className={styles.farm_name_txt}>{farmDetails.name}</span>
          </Box>
          <Box className={styles.low_container}>
            <Box className={styles.statBox}>
              <Link href={'/Components/comment/CommentPage'}>
                <StarOutlineIcon />
              </Link>
              <span className='text-sm font-semibold'>{farmDetails.ratingsAverage}</span>
            </Box>
            <Box className={styles.statBox}>
              <LocalShippingOutlinedIcon />
              <span className='text-sm font-semibold'>{farmDetails.shippingTime}</span>
            </Box>
            <Box className={styles.statBox}>
              <LocationOnOutlinedIcon />
              <span className='text-sm font-semibold'>100 KM</span>
            </Box>
          </Box>
        </Box>

        <Box className="w-full mt-2">
          <ProductFilterNav 
            setShowStockProduct={setShowStockProduct}
          />
        </Box>

        <Box className="w-10/12 mt-3 justify-start items-center">
          <span className='font-semibold text-3sm textdark-gray'>
            {farmDetails.allProduct && farmDetails.allProduct.length} products
          </span>
        </Box>
        

        <Box className={styles.productsBox}>
          {
            loading ?
            array.map(i => {
              return (
                <Stack className='w-11/12 flex p-2' key={i}>
                  <Box className='w-full flex justify-between'>
                    <Skeleton 
                      animation="wave" 
                      variant="rectangular" 
                      width="30%"
                      height={80} 
                      className='rounded-md'
                    />
                    <Skeleton 
                      animation="wave" 
                      variant="rectangular" 
                      width="65%" 
                      height={80} 
                      className='rounded-md'
                    />
                  </Box>
                  <Skeleton animation="wave" />

                </Stack>
              )
            })
            :
            showStockProduct ?

            farmDetails.stockProducts.map((product: any, index: any) => {
              const sendData = {
                data: product._id,
                type: "stock"
              }
              return (
                <Box className="w-11/12" key={product._id}>
                  <Link key={product._id} 
                    href={{
                      pathname: '/Components/ProductPage',
                      query: sendData
                    }} 
                  >
                    
                    <ProductCardComponent
                      key={product._id} 
                      type={"stock"}
                      name={product.name}
                      stock={product.stock}
                      unit={product.unit}
                      price={product.price}
                      images={product.image}
                    />
                  </Link>
                </Box>
              )
            }) :

            farmDetails.ondemandProducts.map((product: any, index: any) => {
              const sendData = {
                data: product._id,
                type: "ondemand"
              }
              return (
                <Box className="w-11/12" key={product._id}>
                  <Link key={product._id} 
                    href={{
                      pathname: '/Components/ProductPage',
                      query: sendData
                    }} 
                  >
                    
                    <ProductCardComponent
                      key={product._id} 
                      type={"ondemand"}
                      name={product.name}
                      unit={product.unit}
                      capacity={product.capacity}
                      price={product.price}
                      images={product.image}
                    />
                  </Link>
                </Box>
              )
            })
          }

        </Box>
      </Box>
      <Box className={styles.bottomBox}>
        <BottomNav />
      </Box>
    </Box>
  )
}

export default FarmPage