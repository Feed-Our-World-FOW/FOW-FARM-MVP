/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/Navbar'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/Farm/comment/CommentCard'
import Link from 'next/link'
import PeopleIcon from '@mui/icons-material/People';
import { getSingleProduct } from '../../components/marketplace/API'
import { RouterQueryInterface, ItemInterface } from '../../interface/AllFarmsInterface'
import ImageCard from '../../components/marketplace/Farm/ImageCard'
import { getReviewOfAProduct, createReviewOfAProduct } from '../../components/marketplace/API'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import WriteCommentCard from '../../components/marketplace/Farm/comment/WriteCommentCard'
import CommentIcon from '@mui/icons-material/Comment';
import Swal from 'sweetalert2'


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

  const [comment, setComment] = useState(false)
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };


  const fetch = async () => {
    try {
      const tokenObj = localStorage.getItem('Token') || null
      let token
      if(tokenObj) {
        token = JSON.parse(tokenObj).value
        setToken(token)
      }
      const ID = id.data
      const x = await getSingleProduct(ID, token)
      const data = x.data.data.data
      
      setProductDetails(data)

      const y = await getReviewOfAProduct(data._id, token)
      const commentData = y.data.data.data
      console.log(commentData)
      
    } catch (error) {
      console.log(error)
    }
  }

  const commentFunction = async () => {
    try {
      console.log(value, title, review)
      const response = await createReviewOfAProduct(productDetails._id, Token, {
        title: title,
        review: review,
        rating: value
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
    about: `w-10/12 flex flex-col items-center mb-5`,
    imgBox: `w-11/12 rounded-md h-72 mt-40 flex justify-center items-center `,
    commentBox: `w-full flex flex-col justify-centar items-center mt-3`,
    btnBox: `w-full flex justify-center items-center`,
    btn: `border-1 bg-pearl drop-shadow-lg active:drop-shadow-0.5lg w-28 h-10 rounded-md ml-auto flex justify-center items-center mt-5`,
  }

  return (
    <div className="w-full flex justify-center items-center">

      <div className={styles.page}>
        <div className={styles.navBox}>
          <Navbar />
        </div>
        <div className={styles.imgBox}>
          <Carousel activeIndex={index} onSelect={handleSelect} className='w-full h-full'>
            {/* <Carousel.Item className='border-2 w-full h-56'> */}
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

        </div>

        <div className="border-b-2 w-11/12 mt-5 mb-5"></div>

        <div className={styles.about}>
          <div className="flex w-full justify-between items-center">
            <span className='font-semibold text-lg'>${productDetails.price}</span>
            <div className="flex justify-center items-center">
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
            </div>
          </div>
          
          <span className='text-3sm mb-5 font-semibold'>{productDetails.description}</span>
          <button className='w-7/12 rounded-2xl mb-1 bg-light-pearl text-2sm p-1'>Add To Cart</button>
          <Link href={'/Components/DeliverySteps'} className='w-7/12 rounded-2xl'>
            <button className='w-full rounded-2xl bg-pearl text-2sm p-1'>Buy Now</button>
          </Link>
        </div>

        <div className="border-b-2 w-11/12 mt-3"></div>

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

        <div className="w-full mb-5 p-3 mt-10">
          {
            productDetails.productReviews.map((review: any) => {
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
          
        </div>
      </div>
    </div>
  )
}

export default ProductPage