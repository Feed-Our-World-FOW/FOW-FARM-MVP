/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/navBar/Navbar'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/comment/CommentCard'
import Link from 'next/link'
import PeopleIcon from '@mui/icons-material/People';
import { getSingleProduct } from '../../components/marketplace/API'
import { RouterQueryInterface, ItemInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Img/ImageCard'
import { getReviewOfAProduct, createReviewOfAProduct, addItemToCart } from '../../components/marketplace/API'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import WriteCommentCard from '../../components/marketplace/comment/WriteCommentCard'
import CommentIcon from '@mui/icons-material/Comment';
import Swal from 'sweetalert2'
import { fetchToken } from '../../components/marketplace/token'
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material'
import Alert, { AlertColor } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import BottomNav from '../../components/marketplace/navBar/BottomNav'


function ProductPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface
  const [productDetails, setProductDetails] = useState<ItemInterface>({
    _id: '',
    amount: 0,
    available: false,
    description: '',
    farm: '',
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

  const [comment, setComment] = useState(false)
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





  // const [itemId, setItemId] = useState([''])

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
      // console.log(commentData)
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
    commentBox: `w-full flex flex-col justify-centar items-center mt-3`,
    btnBox: `w-full flex justify-center items-center`,
    btn: `border-1 bg-pearl drop-shadow-lg active:drop-shadow-0.5lg w-28 h-10 rounded-md ml-auto flex justify-center items-center mt-5`,
    add_cart_btn: `w-8/12 h-8 rounded-md mb-3 bg-light-pearl text-2sm p-1 drop-shadow-lg active:drop-shadow-0.5lg font-semibold`,
    buy_now_btn: `w-8/12 h-8 rounded-md mb-3 bg-pearl text-2sm p-1 drop-shadow-lg active:drop-shadow-0.5lg font-semibold`,
    bottomBox: `w-full flex justify-center items-center mt-10`
  }

  return (
    <Box className="w-full flex flex-col justify-between items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar
            // itemId={itemId}
            load={handleReload}
          />
        </Box>
        <Box className={styles.imgBox}>
          {
            loading ?
            <Stack className='w-full h-full flex'>
              <Box className='w-full h-full flex'>
                <Skeleton 
                  animation="wave" 
                  variant="rectangular" 
                  width="100%"
                  height="100%" 
                  className='rounded-md w-full h-full'
                />
              </Box>
            </Stack>
            :
            <Carousel activeIndex={index} onSelect={handleSelect} className='w-full h-full'>
                {
                  productDetails.image.map((img, index) => {
                    return (
                      <Carousel.Item key={index} className='w-full h-full'>
                        <ImageCard 
                          key={img}
                          image={img} 
                          type="products"
                        />
                      </Carousel.Item>
                    )
                  })
                }
            </Carousel>
          }
        </Box>

        <Box className="border-b-2 w-11/12 mt-5 mb-5"></Box>

        <Box className={styles.about}>
          <Box className="flex w-full justify-between items-center">
            <span className='font-semibold text-lg'>${productDetails.price}</span>
            <Box className="flex justify-center items-center">
              <Stack spacing={1}>
                <Rating 
                  name="read-only" 
                  value={productDetails.ratingsAverage}
                  size='small' 
                />
              </Stack>
              <PeopleIcon 
                fontSize='small'
                color='primary'
                className='ml-2'
              />
              <span className='font-bold'>({productDetails.ratingsQuantity})</span>
            </Box>

          </Box>

          <span className='text-3sm mb-5 font-semibold'>{productDetails.description}</span>
          <button 
            className={styles.add_cart_btn} 
            onClick={handleAddItemsToCart}
          >Add To Cart</button>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert 
              onClose={handleClose} 
              variant="filled" 
              // severity={alertData.length > 1 ? "warning" : "success"} 
              severity={alertType}
              sx={{ width: '100%' }}
            >
              {/* {alertData.length > 1 ? alertData : "Your Item added successfully to the cart"} */}
              {alertData}
            </Alert>
          </Snackbar>
          <Link href={'/Components/DeliverySteps'} className='w-full flex justify-center items-center'>
            <button className={styles.buy_now_btn}>Buy Now</button>
          </Link>
        </Box>

        <Box className="border-b-2 w-11/12 mt-3"></Box>

        <Box className={styles.commentBox}>
          {
            comment ?
            <Box className={styles.commentBox}>
              <WriteCommentCard
                comment={comment}
                setComment={setComment}
                value={value}
                setValue={setValue}
                title={title}
                setTitle={setTitle}
                review={review}
                setReview={setReview}
                commentFunction={commentFunction}
              />
            </Box>
            :
            <Box className="w-11/12 flex justify-end">
              <span className='w-full font-semibold mr-auto ml-2 '>Add a Comment</span>
              <CommentIcon
                color='primary'
                onClick={() => setComment(true)}
              />
            </Box>
          }
        </Box> 
        <Box className="w-full mb-5 p-3 mt-10">
          {
            productDetails.productReviews.map((review: any) => {
              // console.log(review)
              return (
                <CommentCard
                  key={review.id}
                  userName={review?.user?.name}
                  rating={review.rating}
                  review={review.review}
                  title={review.title}
                  createdAt={review.createdAt}
                />
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

export default ProductPage