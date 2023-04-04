import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/marketplace/Navbar'
import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import TimerIcon from '@mui/icons-material/Timer'
import ProductCard from '../../components/marketplace/Farm/ProductCard'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/Farm/CommentCard'
import Link from 'next/link'
import { getSingleFarm } from '../../components/marketplace/API'
import { AllFarmsInterface, FarmDetailsInterface, RouterQueryInterface } from '../../interface/AllFarmsInterface'


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

  const fetch = async () => {
    try {
      const x: AllFarmsInterface = await getSingleFarm(id.data)
      const data = x.data.data.data
      console.log(data)
      setFarmDetails(data)
    } catch (error) {
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
    shopImg: `border-2 w-20 h-20`,
    shopDesc: `ml-3 flex flex-col justify-center items-start`,
    bigText: `font-bold text-2sm`,
    smallText: `font-bold text-xs`,
    smallBoldText: `text-2sm font-bold`,
    iconBox: `flex flex-col`,
    statBox: `w-full h-12 mt-4 flex justify-around items-start`,
    productsBox: `w-full mt-5 flex flex-col justify-between items-center`,
    btnBox: `w-full h-10 flex justify-center items-center mt-5`,
    upperBtnSubBox: `w-5/12 h-8 rounded-2xl flex justify-between items-center bg-light-gray`,
    lowerBtnSubBox: `w-full h-8 rounded-2xl flex justify-between items-center bg-light-gray overflow-x-auto scrollbar-hide`,
    btn: `h-full w-20 rounded-2xl p-2 capitalize text-2sm bg-transparent outline-none text-black focus:border-b-2`
  }

  return (
    <div className="w-screen flex justify-center items-center">

      <div className={styles.page}>
        <div className={styles.navBox}>
          <Navbar />
        </div>
        <div className={styles.bannerImg}>

        </div>
        <div className={styles.shopDescBox}>
          <div className={styles.shopImg} onClick={() => fetch()}>

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

        <div className={styles.btnBox}>
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
        </div>

        <div className={styles.productsBox}>
          {
            farmDetails.allProduct.map((product: any, index: any) => {
              const sendData = {
                data: product._id
              }
              return (
                <Link key={product._id} 
                  href={{
                    pathname: '/Components/ProductPage',
                    query: sendData
                  }} 
                  className='w-11/12'
                >
                  <ProductCard 
                    key={product._id} 
                    name={product.name}
                    weight={product.weight}
                    price={product.price}
                    ratingsAverage={product.ratingsAverage}
                    ratingsQuantity={product.ratingsQuantity}
                  />
                  <div key={index+2} className="w-11/12 border-b-2 mb-3 ml-3"></div>
                </Link>
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
          <span className='text-2sm ml-3 font-semibold'>3.3 out of 5</span>
          </div>
          <span className="text-sm font-semibold">{`1,167 total ratings`}</span>
        </div>

        <div className="border-b-2 w-11/12 mt-3 mb-5"></div>

        <div className="w-full mb-5 p-3">

          {
            farmDetails.reviews.map((farm: any) => {
              return (
                <CommentCard 
                  key={farm.id}
                  createdAt={farm.createdAt}
                  rating={farm.rating}
                  review={farm.review}
                  userName={farmDetails?.user?.name}
                />
              )
            })
          }

          
          {/* <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard /> */}
        </div>
      </div>
    </div>
  )
}

export default FarmPage