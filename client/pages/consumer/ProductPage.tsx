/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/navBar/Navbar'
import { getSingleStockProduct, getSingleOndemandProduct } from '../../components/marketplace/API'
import { RouterQueryInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Img/ImageCard'
import { fetchToken } from '../../components/marketplace/token'
import { Box } from '@mui/material'
import Alert, { AlertColor } from '@mui/material/Alert'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import BottomNav from '../../components/marketplace/navBar/BottomNav'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Image from 'next/image'
import AddProductCart from '../../components/marketplace/product/AddProductCart';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';


function ProductPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface

  const [productDetails, setProductDetails] = useState<any>({})
  const [stock, setStock] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    orderQuantity: 1,
    orderUnit: ''
  })
  const [amount, setAmount] = useState<number>(1)
  const [alertData, setAlertData] = useState<string>('')
  const [alertType, setalertType] = useState<AlertColor>("success" || "warning" || "info" || "error")
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [index, setIndex] = useState(0)
  const [reloadComponent, setReloadComponent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)


  const handleReload = () => {
    setReloadComponent(prevState => !prevState);
  }

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };


  const fetchStock = async () => {
    setOpenBackdrop(true)
    try {
      const token = fetchToken()
      const ID = id.data
      const product = await getSingleStockProduct(ID, token, "")
      const  productData = product.data.data.data
      setStock(true)
      setProductDetails(productData)
      // console.log(productData)
      setOrderDetails({...orderDetails, orderUnit: productData.unit})
      setLoading(false)
      setOpenBackdrop(false)
    } catch (error) {
      console.log(error)
      setOpenBackdrop(false)
      // setAllert("warning", )
    }
  }

  const fetchOndemand = async () => {
    setOpenBackdrop(true)
    try {
      const token = fetchToken()
      const ID = id.data
      const product = await getSingleOndemandProduct(ID, token, "")
      const  productData = product.data.data.data
      setStock(false)
      setProductDetails(productData)
      setOrderDetails({...orderDetails, orderUnit: productData.unit})
      // console.log(productData)
      
      setLoading(false)
      setOpenBackdrop(false)
    } catch (error) {
      console.log(error)
      setOpenBackdrop(false)
    }
  }

 
  useEffect(() => {
    if(id.type === "stock") {
      fetchStock()
    } else if(id.type === "ondemand") {
      fetchOndemand()
    }
    // handleReload()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.data])

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    blur_navBox: `w-full px-4 z-50 blur-sm`,
    bottomBox: `w-full flex justify-center items-center mt-10`,
    blur_bottomBox: `w-full flex justify-center items-center mt-10 blur-sm`,
    prodTypeSmSubBox: `w-16 h-10 flex flex-col justify-between items-center`,
    smNavBox: `w-11/12 flex justify-between items-center h-8 mt-20`,
    blur_smNavBox: `w-11/12 flex justify-between items-center h-8 mt-20 blur-sm`,
    rightSmNavBox: `border-1 border-light-gray rounded-3xl w-9/12 h-full flex justify-between items-center`,
    roundedSmImgBox: `h-7 w-7 rounded-full ml-2 flex`,
    rightSmNav: `h-full w-8/12 rounded-3xl flex justify-start items-center`,
    smRatingBox: `h-full w-3/12 rounded-3xl flex justify-around items-center`,
    bigImgBox: `border-1 border-light-gray w-11/12 h-80 mt-6 rounded-3xl flex flex-col justify-between items-center`,
    blur_bigImgBox: `border-1 border-light-gray w-11/12 h-80 mt-6 rounded-3xl flex flex-col justify-between items-center blur-sm`,
  }

  return (
    <div className="w-full flex flex-col justify-between items-center">

      <Box className={styles.page}>
        <Box className={!open ? styles.navBox : styles.blur_navBox}>
          <Navbar
            arrow={true}
            product={true}
            load={handleReload}
          />
        </Box>

        <Box className={!open ? styles.smNavBox : styles.blur_smNavBox}>
          <span className='text-2sm font-semibold'>Produced by</span>
          <Box className={styles.rightSmNavBox}>
            <Box className={styles.rightSmNav}>
              <Box className={styles.roundedSmImgBox}>
                {
                  productDetails?.businessProfile?.user?.photo ?
                  <ImageCard 
                    image={productDetails?.businessProfile?.user?.photo}
                    rounded={true} 
                  /> :
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={30} height={30} />
                    {/* <CircularProgress size={25} /> */}
                  </Box>
                }
              </Box>
              <span className='text-sm font-semibold ml-2'>{productDetails?.businessProfile?.user?.name}</span>
            </Box>

            <Box className={styles.smRatingBox}>
              <span className='text-2sm font-semibold'>{productDetails.ratingsAverage}</span>
              <StarOutlineOutlinedIcon fontSize='small' />
            </Box>
          </Box>
        </Box>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={() => setOpenBackdrop(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Box className={!open ? styles.bigImgBox : styles.blur_bigImgBox}>
          <Box className="h-8 w-11/12 flex justify-center items-center">
            <span className='text-2sm font-bold'>{productDetails.name}</span>
          </Box>
          <Box className="h-52 w-11/12 flex justify-center items-center">
            <Box className="w-52 h-52">
              {
                productDetails.image ?
                <ImageCard 
                  image={productDetails.image} 
                /> :
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* <CircularProgress size={25} /> */}
                  <Skeleton variant="circular" width={150} height={150} />
                </Box>
              }
            </Box>
          </Box>
          <Box className="h-10 w-11/12 flex justify-around items-center mb-3">
            <Box className={styles.prodTypeSmSubBox}>
              <img src="/images/leaf.png" alt="" />
              <span className='text-sm font-semibold'>Organic</span>
            </Box>
            <Box className={styles.prodTypeSmSubBox}>
              <AccessTimeOutlinedIcon fontSize='small' />
              <span className='text-sm font-semibold'>{productDetails.freshRemain} days UL</span>
            </Box>
            <Box className={styles.prodTypeSmSubBox}>
              <LocationOnOutlinedIcon fontSize='medium' />
              <span className='text-sm font-semibold'>100 km</span>
            </Box>
          </Box>
        </Box>

        <Box className="w-full flex justify-center items-center">
          <AddProductCart 
            productPrice={productDetails.price}
            defaultUnit={productDetails.unit}
            amount={amount}
            setAmount={setAmount}
            load={handleReload}
            stock={stock}
            id={id.data}
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
            open={open}
            setOpen={setOpen}
          />
        </Box>

        

      </Box>
      <Box className={!open ? styles.bottomBox : styles.blur_bottomBox}>
        <BottomNav />
      </Box>
    </div>
  )
}

export default ProductPage