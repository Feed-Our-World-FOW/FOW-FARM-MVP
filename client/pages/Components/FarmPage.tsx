import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/navBar/Navbar'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TimerIcon from '@mui/icons-material/Timer'
import ProductCard from '../../components/marketplace/product/ProductCard'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/comment/CommentCard'
import Link from 'next/link'
import { getSingleFarm } from '../../components/marketplace/API'
import { AllFarmsInterface, RouterQueryInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Img/ImageCard'
import WriteCommentCard from '../../components/marketplace/comment/WriteCommentCard'
import CommentIcon from '@mui/icons-material/Comment'
import { createReviewOfAFarm } from '../../components/marketplace/API'
import Swal from 'sweetalert2'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { getMyCart } from '../../components/marketplace/API'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeItemsFromCart, addItemToCart } from '../../components/marketplace/API'
import 'animate.css'
import { red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { fetchToken } from '../../components/marketplace/token'
import Skeleton from '@mui/material/Skeleton';
import { Alert, AlertColor, Box, Container, Paper, Snackbar } from '@mui/material'
import BottomNav from '../../components/marketplace/navBar/BottomNav'



function FarmPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface
  let array = [1, 2]
  const [farmDetails, setFarmDetails] = useState<any>({
    _id: '',
    name: '',
    location: {
      address: ''
    },
    ratingsAverage: 0,
    ratingsQuantity: 0,
    allProduct: [
      {
        name: '',
        ratingsAverage: 0,
        ratingsQuantity: 0,
        weight: '',
        price: ''
      }
    ],
    reviews: [
      {
        createdAt: '',
        rating: 0,
        review: '',
        user: {
          name: '',
          photo: ''
        }
      }

    ]
  })

  const [value, setValue] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [review, setReview] = useState<string>('')
  const [Token, setToken] = useState<string>('')
  const [comment, setComment] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState([])
  const [reloadComponent, setReloadComponent] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [alertData, setAlertData] = useState<string>('')
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
      setToken(token)
      const x: AllFarmsInterface = await getSingleFarm(id.data)
      const data = x.data.data.data

      const response = await getMyCart(token)
      if(response.data.data.data.length > 0) {
        const cartData = response.data.data.data[0].items
        setCartItems(cartData)
      }
      // console.log("cartData",response.data.data.data[0].items)

      setFarmDetails(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const itemExists = (_id: string): boolean => {
    const cartData: any = cartItems
    
    for(let i = 0; i < cartData.length; i++) {
      if(cartData[i].product.id === _id) {
        return true
      }
    }

    return false
  }

  const handleDeleteFromCart = async (_id: string) => {
    try {
      const token = fetchToken()
      const response = await removeItemsFromCart(token, _id)
      fetch()
      handleReload()
      setOpen(true)
      setalertType("success")
      setAlertData("Your Item got deleted from cart")
      
    } catch (error) {
      console.log(error)
    }
  }


  const handleAddToCart = async (_id: string) => {
    try {
      const token = fetchToken()
      const response = await addItemToCart(token, _id)
      fetch()
      handleReload()
      setOpen(true)
      setalertType("success")
      setAlertData("Your Item has been added to cart")

    } catch (error: any) {
      if(error.response.data.message == "You can only add items from a single farm") {
        setOpen(true)
        setalertType("warning")
        setAlertData("You can only add items from a single farm")
      }else {
        setOpen(true)
        setalertType("error")
        setAlertData(`${error.response.data.message}`)
      }
      console.log(error)
    }
  }

  const commentFunction = async () => {
    try {
      console.log(value, title, review, farmDetails._id)
      const response = await createReviewOfAFarm(Token, {
        title: title,
        review: review,
        rating: value,
        farm: farmDetails._id
      })
      setOpen(true)
      setalertType("success")
      setAlertData("Successfully submit your comment")
      handleReload()
      fetch()
      setValue(0)
      setTitle('')
      setReview('')
      // window.location.reload()
    } catch (error: any) {
      setOpen(true)
      setalertType("error")
      setAlertData(`${error.response.data.message}`)
      if(error.response.data.error.code === 11000) {
        console.log(error.response.data.error.code)
        setAlertData(`You can't comment twice`)
      }
      
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
    bannerImg: `w-full h-44 mt-20 border-1 bg-light-white max-w-md`,
    shopDescBox: `w-full h-20 flex mt-2 pl-2`,
    shopImg: `w-20 h-20`,
    shopDesc: `ml-3 flex flex-col justify-center items-start`,
    bigText: `font-bold text-2sm`,
    smallText: `font-bold text-xs`,
    smallBoldText: `text-2sm font-bold`,
    iconBox: `flex flex-col`,
    statBox: `w-full h-12 mt-4 flex justify-around items-start`,
    productsBox: `w-full mt-20 mb-10 flex flex-col justify-center items-center`,
    btnBox: `w-full h-10 flex justify-center items-center mt-5`,
    upperBtnSubBox: `w-5/12 h-8 rounded-2xl flex justify-between items-center bg-light-gray`,
    lowerBtnSubBox: `w-full h-8 rounded-2xl flex justify-between items-center bg-light-gray overflow-x-auto scrollbar-hide`,
    btn: `h-full w-20 rounded-2xl p-2 capitalize text-2sm bg-transparent outline-none text-black focus:border-b-2`,
    commentBox: `w-full flex flex-col justify-centar items-center mt-3`,
    itemcard: `w-11/12 flex jusity-between items-center mb-5 rounded-md bg-white`,
    linkCard: `w-full text-black flex justify-center items-center p-3 no-underline`,
    bottomBox: `w-full flex justify-center items-center mt-10`
  }

  return (
    <Box className="w-screen flex flex-col justify-between items-center">

      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar load={reloadComponent} />
        </Box>
        <Box className={styles.bannerImg}>
          {
            loading ?
            <Stack className='w-full flex'>
              <Box className='w-full flex justify-between'>
                <Skeleton 
                  animation="wave" 
                  variant="rectangular" 
                  width="100%"
                  height={174} 
                  className='rounded-md w-full h-full'
                />
              </Box>
            </Stack>
            :
            <ImageCard 
              image={farmDetails.imageCover}
              type='farms'
            />
          }
          
        </Box>
        <Container className={styles.shopDescBox}>
          <Box className={styles.shopImg}>
            
            {
              loading ?
              <Stack className='w-full flex'>
                <Box className='w-full flex justify-between'>
                  <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="100%"
                    height={80} 
                    className='rounded-md w-full'
                  />
                </Box>
              </Stack>
            :
              <ImageCard 
                image={farmDetails.images}
                type={"farms"}
              />
            }
          </Box>
          <Box className={styles.shopDesc}>
            <p className={styles.bigText}>{farmDetails.name}</p>
            {/* <br /> */}
            <p className={styles.smallText}>{farmDetails?.location?.address}</p>
          </Box>
        </Container>
        <Box className={styles.statBox}>
          <Box className={styles.iconBox}>
            <Box className="flex">
              <StarIcon fontSize='small' />
              <span className={styles.smallBoldText}>({farmDetails.ratingsAverage})</span>
            </Box>
            <span className="text-2sm font-bold mt-1">{farmDetails.ratingsQuantity} ratings</span>
          </Box>
          <Box className={styles.iconBox}>
            <Box className="flex">
              <LocationOnIcon fontSize='small' />
            </Box>
            <span className="text-2sm font-bold mt-1.5">Location</span>
          </Box>
          <Box className="">
            <Box className="flex">
              <TimerIcon fontSize='small' />
              <span className={styles.smallBoldText}>02-03 hours</span>
            </Box>
            <span className={styles.smallBoldText}>Delivery Time</span>
          </Box>
        </Box>

        {/* <div className={styles.btnBox}>
          <div className={styles.upperBtnSubBox}>
            <button className={styles.btn}>Meat</button>
            <button className={styles.btn}>Grocery</button>
          </div>
        </div>

        <div className={styles.btnBox}>
          <div className={styles.lowerBtnSubBox}>
            <button className={styles.btn}>All</button>
            <button className={styles.btn}>Flour</button>
            <button className={styles.btn}>Rice</button>
            <button className={styles.btn}>Dal</button>
          </div>
        </div> */}

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
            farmDetails.allProduct.map((product: any, index: any) => {
              const sendData = {
                data: product._id
              }
              return (
                <Paper elevation={4} className={styles.itemcard} key={product._id}>
                  <Link key={product._id} 
                    href={{
                      pathname: '/Components/ProductPage',
                      query: sendData
                    }} 
                    className={styles.linkCard}
                  >
                    
                    <ProductCard 
                      key={product._id} 
                      name={product.name}
                      weight={product.weight}
                      price={product.price}
                      ratingsAverage={product.ratingsAverage}
                      ratingsQuantity={product.ratingsQuantity}
                      image={product.image && product.image[(product.image).length - 1]}
                    />
                  </Link>
                  {
                    itemExists(product.id) 
                    ? 
                    <IconButton 
                      aria-label="delete" 
                      onClick={() => handleDeleteFromCart(product._id)}
                    >
                      <DeleteIcon 
                        // color='primary' 
                        sx={{ color: red[500] }}
                        className='mr-1'
                      />

                    </IconButton>
                    : 
                    <IconButton 
                      color="primary" 
                      aria-label="add to shopping cart" 
                      onClick={() => handleAddToCart(product._id)}
                    >
                      <AddShoppingCartIcon 
                        color='primary' 
                        className='mr-1'
                      />
                    </IconButton>
                  }
                </Paper>
              )
            })
          }

        </Box>

        <Box>
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
        </Box>

        <Box className='border-b-2 w-11/12 mb-3'></Box>

        <Box className="w-full flex flex-col p-5">
          <span className="font-bold text-2sm">{`Customer reviews`}</span>
          <Box className="flex">
          <Stack spacing={1}>
            <Rating 
              name="read-only" 
              value={3.3}
              size='small' 
              />
          </Stack>
          <span className='text-2sm ml-3 font-semibold'>{farmDetails.ratingsAverage} out of 5</span>
          </Box>
          <span className="text-sm font-semibold">{`${farmDetails.ratingsQuantity} total ratings`}</span>
        </Box>

        <Box className="border-b-2 w-11/12 mt-3 mb-5"></Box>

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

        <Box className="w-full mb-5 p-3">

          {
            farmDetails.reviews.map((farm: any) => {
              return (
                <CommentCard 
                  key={farm.id}
                  createdAt={farm.createdAt}
                  title={farm.title}
                  rating={farm.rating}
                  review={farm.review}
                  userName={farm?.user?.name}
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

export default FarmPage