import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAllFarms, filterAllFarms } from '../../components/marketplace/API'
import Navbar from '../../components/marketplace/navBar/Navbar'
import FarmCard from '../../components/marketplace/Farm/FarmCard'
import Image from 'next/image'
import Link from 'next/link'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import TopFarms from '../../components/marketplace/Farm/TopFarms'
import { AllFarmsInterface, FarmDetailsInterface, FarmCardInterface } from '../../interface/AllFarmsInterface'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography'
import Stack from '@mui/material/Stack'


function AllFarms() {

  const [allFarms, setAllFarms] = useState([{}])
  const [loading, setLoading] = useState(true)
  let array = [1, 2, 3, 4, 5]

  const fetchAllFarms = async () => {
    try {
      const x: AllFarmsInterface = await getAllFarms()
      const data = x.data.data.data
      setAllFarms(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeatFarm = async () => {
    try {
      const x: AllFarmsInterface = await filterAllFarms("meat")
      const data = x.data.data.data
      setAllFarms(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProduceFarm = async () => {
    try {
      const x: AllFarmsInterface = await filterAllFarms("produce")
      const data = x.data.data.data
      setAllFarms(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllFarms()
  }, [])

  const styles = {
    page: `w-screen flex flex-col justify-around items-center mb-10 max-w-md`,
    navBox: `w-full px-4 z-50`,

    bannerBox: `w-full h-full border-1 w-11/12 h-44 rounded-xl drop-shadow-lg bg-white flex justify-center items-center`,
    catagorieBox: `w-full h-20 drop-shadow-lg bg-white flex items-center`,
    top5: `rounded-xl bg-white ml-5 w-full h-70`,
    catagorieSubImg: `w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg active:drop-shadow-0.5lg`,
    allFarms: `w-full grid grid-cols-2 gap-y-3 gap-x-2 mobile:ml-2 mobileL:ml-4 z-0`,
    filterBox: `border-2 w-full h-20 mb-2 flex justify-start items-center`,
    scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-44`,
    farmCardBox: `w-11/12 flex justify-center items-center relative z-0 mt-5`,
    filter: `w-20 h-20 rounded-full border-2`
  }

  return (
    <div className={styles.page}>
      <div className={styles.navBox}>
        <Navbar />
      </div>
      <div className={styles.scrollingBox}>

        <div className={styles.bannerBox} onClick={fetchAllFarms}>
          <Image
            alt=''
            width={100}
            height={100}
            src={'/images/fow.png'}
            className='w-9/12 h-full'
          />
        </div>

        <span className='text-3sm font-bold w-11/12 mt-5 mb-3'>Catagories</span>

        <div className={styles.catagorieBox}>
          <div className={styles.catagorieSubImg}>
            <Image
              alt=''
              width={50}
              height={50}
              src={'/images/grocery.png'}
              onClick={fetchProduceFarm}
            />
          </div>
          <div className={styles.catagorieSubImg}>
            <Image
              alt=''
              width={100}
              height={100}
              src={'/images/meatlogo.png'}
              className='w-full h-full'
              onClick={fetchMeatFarm}
            />
          </div>
        </div>

        <span className='text-3sm font-bold w-11/12 mt-5 mb-3'>Popular Store</span>

        <div className="w-full mb-5 flex justify-center items-center">

          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={2500}
            centerMode={true}
            showThumbs={false}
            className=' w-screen max-w-md'
          >
            <div className={styles.top5}>
              <TopFarms />
            </div>
            <div className={styles.top5}>
              <TopFarms />
            </div>
            <div className={styles.top5}>
              <TopFarms />
            </div>
            <div className={styles.top5}>
              <TopFarms />
            </div>
            <div className={styles.top5}>
              <TopFarms />
            </div>
          </Carousel>

        </div>


        <div className={styles.farmCardBox}>
          <div className={styles.allFarms}>
            {
              loading ?
              array.map(i => {
                return (
                  <Stack className='mb-3' key={i}>

                    <Skeleton animation="wave" variant="rectangular" height={70} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" variant="rectangular" height={40} />

                  </Stack>
                )
              })
              :
              allFarms.map((farm: any) => {
                const sendData = {
                  data: farm._id
                }
                return (
                  <Link
                    href={{
                      pathname: '/Components/FarmPage',
                      query: sendData
                    }}
                    className='text-black no-underline'
                    key={farm._id}
                  >
                    <FarmCard
                      key={farm._id}
                      name={farm.name}
                      images={farm.images}
                      location={farm.location}
                      meat={farm.meat}
                      produce={farm.produce}
                      ratingsAverage={farm.ratingsAverage}
                    />
                  </Link>
                )
              })
            }     
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllFarms

function showSlides(): () => void {
  throw new Error('Function not implemented.')
}
