import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/Navbar'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TimerIcon from '@mui/icons-material/Timer'
import ProductCard from '../../components/marketplace/Farm/ProductCard'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/Farm/comment/CommentCard'
import Link from 'next/link'
import { getSingleFarm } from '../../components/marketplace/API'
import { AllFarmsInterface, FarmDetailsInterface, RouterQueryInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Farm/ImageCard'
import WriteCommentCard from '../../components/marketplace/Farm/comment/WriteCommentCard'
import CommentIcon from '@mui/icons-material/Comment'
import { createReviewOfAFarm } from '../../components/marketplace/API'
import Swal from 'sweetalert2'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'



function FarmPage() {
  const router = useRouter()
  const id = router.query as RouterQueryInterface

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
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [Token, setToken] = useState('')
  const [comment, setComment] = useState(false)

  const fetch = async () => {
    try {
      const tokenObj = localStorage.getItem('Token') || null
      let token
      if(tokenObj) {
        token = JSON.parse(tokenObj).value
        setToken(token)
      }
      const x: AllFarmsInterface = await getSingleFarm(id.data)
      const data = x.data.data.data
      setFarmDetails(data)
    } catch (error) {
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully submit your comment',
        showConfirmButton: false,
        timer: 1500
      })
      setValue(0)
      setTitle('')
      setReview('')
      window.location.reload()
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
    bannerImg: `w-full h-44 mt-36 bg-light-white max-w-md`,
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
    itemcard: `w-11/12 flex jusity-between items-center mb-5 rounded-md border-1 bg-white drop-shadow-lg`,
    linkCard: `w-full text-black flex justify-center items-center p-3 no-underline`
  }

  return (
    <div className="w-screen flex justify-center items-center">

      <div className={styles.page}>
        <div className={styles.navBox}>
          <Navbar />
        </div>
        <div className={styles.bannerImg}>
          <ImageCard 
            image={farmDetails.imageCover}
            type='farms'
          />
        </div>
        <div className={styles.shopDescBox}>
          <div className={styles.shopImg} onClick={() => fetch()}>
            <ImageCard 
              image={farmDetails.images}
              type={"farms"}
            />
          </div>
          <div className={styles.shopDesc}>
            <p className={styles.bigText}>{farmDetails.name}</p>
            {/* <br /> */}
            <p className={styles.smallText}>{farmDetails?.location?.address}</p>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.iconBox}>
            <div className="flex">
              <StarIcon fontSize='small' />
              <span className={styles.smallBoldText}>({farmDetails.ratingsAverage})</span>
            </div>
            <span className="text-2sm font-bold mt-1">{farmDetails.ratingsQuantity} ratings</span>
          </div>
          <div className={styles.iconBox}>
            <div className="flex">
              <LocationOnIcon fontSize='small' />
            </div>
            <span className="text-2sm font-bold mt-1.5">Location</span>
          </div>
          <div className="">
            <div className="flex">
              <TimerIcon fontSize='small' />
              <span className={styles.smallBoldText}>02-03 hours</span>
            </div>
            <span className={styles.smallBoldText}>Delivery Time</span>
          </div>
        </div>

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

        <div className={styles.productsBox}>
          {
            farmDetails.allProduct.map((product: any, index: any) => {
              const sendData = {
                data: product._id
              }
              return (
                <div className={styles.itemcard} key={product._id}>
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
                        {/* <div key={index+2} className="w-11/12 border-b-2 mb-3 ml-3"></div> */}
                  </Link>
                  <AddShoppingCartIcon 
                    color='primary' 
                    className='mr-1'
                    onClick={() => console.log(product._id)}
                  />
                </div>
              )
            })
          }

        </div>

        <div className='border-b-2 w-11/12 mb-3'></div>

        <div className="w-full flex flex-col p-5">
          <span className="font-bold text-2sm">{`Customer reviews`}</span>
          <div className="flex">
          <Stack spacing={1}>
            <Rating 
              name="read-only" 
              value={3.3}
              size='small' 
              />
          </Stack>
          <span className='text-2sm ml-3 font-semibold'>{farmDetails.ratingsAverage} out of 5</span>
          </div>
          <span className="text-sm font-semibold">{`${farmDetails.ratingsQuantity} total ratings`}</span>
        </div>

        <div className="border-b-2 w-11/12 mt-3 mb-5"></div>

        <div className={styles.commentBox}>
          {
            comment ?
            <div className={styles.commentBox}>
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
            </div>
            :
            <div className="w-11/12 flex justify-end">
              <span className='w-full font-semibold mr-auto ml-2 '>Add a Comment</span>
              <CommentIcon
                color='primary'
                onClick={() => setComment(true)}
              />
            </div>
          }
        </div>

        <div className="w-full mb-5 p-3">

          {
            farmDetails.reviews.map((farm: any) => {
              return (
                <CommentCard 
                  key={farm.id}
                  createdAt={farm.createdAt}
                  title={farm.title}
                  rating={farm.rating}
                  review={farm.review}
                  userName={farmDetails?.user?.name}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default FarmPage