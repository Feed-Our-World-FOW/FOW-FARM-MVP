/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/navBar/Navbar'
import { getSingleProduct } from '../../components/marketplace/API'
import { RouterQueryInterface, ItemInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Img/ImageCard'
import { getReviewOfAProduct, createReviewOfAProduct, addItemToCart } from '../../components/marketplace/API'
import { fetchToken } from '../../components/marketplace/token'
import { Box } from '@mui/material'
import Alert, { AlertColor } from '@mui/material/Alert'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import BottomNav from '../../components/marketplace/navBar/BottomNav'
import Swal from 'sweetalert2'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


function ProductPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface
  const [productDetails, setProductDetails] = useState<ItemInterface>({
    _id: '',
    amount: 0,
    available: false,
    description: '',
    farm: {
      id: '',
      name: ''
    },
    image: [''],
    listedAt: '',
    name: '',
    price: 0,
    productReviews: [{}],
    ratingsAverage: 0,
    ratingsQuantity: 0,
    summery: '',
    weight: ''
  })
  const [Token, setToken] = useState('')
  const [value, setValue] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [alertData, setAlertData] = useState<string>('')
  const [alertType, setalertType] = useState<AlertColor>("success" || "warning" || "info" || "error")

  const [index, setIndex] = useState(0)
  const [reloadComponent, setReloadComponent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)


  const handleReload = () => {
    setReloadComponent(prevState => !prevState);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }



  const handleAddItemsToCart = async () => {
    try {
      const token = fetchToken()
      const res = await addItemToCart(token, id.data)
      handleReload()
      setOpen(true)
    } catch (error: any) {
      console.log(error)
      setOpen(true)
      setAlertData(error.response.data.message)
    }
  }

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };


  const fetch = async () => {
    try {
      const token = fetchToken()
      setToken(token)
      const ID = id.data
      const x = await getSingleProduct(ID, token)
      const data = x.data.data.data
      
      setProductDetails(data)

      const y = await getReviewOfAProduct(data._id, token)
      const commentData = y.data.data.data
      // console.log(data)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      // setAllert("warning", )
    }
  }

  const commentFunction = async () => {
    try {
      // console.log(value, title, review)
      const response = await createReviewOfAProduct(productDetails._id, Token, {
        title: title,
        review: review,
        rating: value
      })
      setOpen(true)
      setalertType("success")
      setAlertData("Successfully submit your comment")
      fetch()
      handleReload()
      setValue(0)
      setTitle('')
      setReview('')
      // window.location.reload()
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.data])

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    about: `w-10/12 flex flex-col items-center mb-5`,
    imgBox: `w-11/12 rounded-md h-72 mt-40 flex justify-center items-center `,
    bottomBox: `w-full flex justify-center items-center mt-10`,
    prodTypeSmSubBox: `w-16 h-10 flex flex-col justify-between items-center`,
    btn: `h-full w-20 rounded-3xl border-2 border-dark-gray text-dark-gray text-3sm font-bold focus:bg-dark-gray focus:text-white`,
    smNavBox: `w-11/12 flex justify-between items-center h-8 mt-20`,
    rightSmNavBox: `border-1 border-light-gray rounded-3xl w-9/12 h-full flex justify-between items-center`,
    roundedSmImgBox: `h-7 w-7 border-1 rounded-full ml-1`,
    rightSmNav: `h-full w-8/12 rounded-3xl flex justify-start items-center`,
    smRatingBox: `h-full w-3/12 rounded-3xl flex justify-around items-center`,
    bigImgBox: `border-1 border-light-gray w-11/12 h-80 mt-6 rounded-3xl flex flex-col justify-between items-center`,
    bigBtnBox: `border-1 border-light-gray w-11/12 rounded-3xl h-40 mt-5 mb-10 flex flex-col justify-around items-center`,
    cartBtn: `w-11/12 h-9 rounded-3xl mb-10 mt-5 flex justify-center items-between bg-green`,
    amount: `w-4/12 text-3sm font-semibold text-white flex justify-start items-center`,
    txt: `text-3sm font-semibold w-7/12 flex justify-start items-center`,
  }

  return (
    <div className="w-full flex flex-col justify-between items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar
            arrow={true}
            product={true}
            load={handleReload}
          />
        </Box>

        <Box className={styles.smNavBox}>
          <span className='text-2sm font-semibold'>Produced by</span>
          <Box className={styles.rightSmNavBox}>
            <Box className={styles.rightSmNav}>
              <Box className={styles.roundedSmImgBox}>
                <ImageCard 
                  image={productDetails.image[0]} 
                  type="products"
                />
              </Box>
              <span className='text-sm font-semibold ml-1'>{productDetails.farm?.name}</span>
            </Box>

            <Box className={styles.smRatingBox}>
              <span className='text-2sm font-semibold'>{productDetails.ratingsAverage}</span>
              <StarOutlineOutlinedIcon fontSize='small' />
            </Box>
          </Box>
        </Box>

        <Box className={styles.bigImgBox}>
          <Box className="h-8 w-11/12 flex justify-center items-center">
            <span className='text-2sm font-bold'>{productDetails.name}</span>
          </Box>
          <Box className="h-52 w-11/12 flex justify-center items-center">
            <Box className="border-1 w-52 h-52 rounded-full">
              <ImageCard 
                image={productDetails.image[0]} 
                type="products"
              />
            </Box>
          </Box>
          <Box className="h-10 w-11/12 flex justify-around items-center mb-3">
            <Box className={styles.prodTypeSmSubBox}>
              <img src="/images/leaf.png" alt="" />
              <span className='text-sm font-semibold'>Organic</span>
            </Box>
            <Box className={styles.prodTypeSmSubBox}>
              <AccessTimeOutlinedIcon fontSize='small' />
              <span className='text-sm font-semibold'>50 days UL</span>
            </Box>
            <Box className={styles.prodTypeSmSubBox}>
              <LocationOnOutlinedIcon fontSize='medium' />
              <span className='text-sm font-semibold'>100 km</span>
            </Box>
          </Box>
        </Box>

        <Box className={styles.bigBtnBox}>
          <Box className='w-full flex justify-center items-center'>
            <span className='font-semibold text-2sm'>Choose amount and unit</span>
          </Box>
          <Box className="w-11/12 h-10 flex justify-center items-center">
            <Box className="mr-2">
              <RemoveOutlinedIcon />
            </Box>
            <Box className='border-1 rounded-3xl w-20 h-8 border-light-gray flex justify-center items-center'>
              <span className='text-semibold text-3sm'>10</span>
            </Box>
            <Box className="ml-2">
              <AddOutlinedIcon />
            </Box>
          </Box>
          <Box className="w-11/12 h-8 flex justify-around items-center">
            <button className={styles.btn}>
              lb
            </button>
            <button className={styles.btn}>
              kg
            </button>
            <button className={styles.btn}>
              gm
            </button>
          </Box>
        </Box>

        <Box className={styles.cartBtn}>
          <span className={styles.amount}>$ 127.5</span>
          <span className={styles.txt}>Add to cart</span>
        </Box>

        
      </Box>
      <Box className={styles.bottomBox}>
        <BottomNav />
      </Box>
    </div>
  )
}

export default ProductPage