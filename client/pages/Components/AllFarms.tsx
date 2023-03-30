import React from 'react'
import { getAllFarms } from '../../components/marketplace/API'
import Navbar from '../../components/marketplace/Navbar'
import FarmCard from '../../components/marketplace/Farm/FarmCard'
import Image from 'next/image'
import Link from 'next/link'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TopFarms from '../../components/marketplace/Farm/TopFarms'


function AllFarms() {

  const handleClick = async () => {
    const farms: any = await getAllFarms()
    console.log(farms)
  }

  const styles = {
    page: `w-screen flex flex-col justify-around items-center mb-10 max-w-md`,
    navBox: `w-full px-4 z-50`,

    bannerBox: `w-full h-full border-1 w-11/12 h-44 rounded-xl drop-shadow-lg bg-white flex justify-center items-center`,
    catagorieBox: `w-full h-20 drop-shadow-lg bg-white flex items-center`,
    top5: `rounded-xl bg-white ml-5 w-full h-70`,

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

        <div className={styles.bannerBox}>
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
          <div className="w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg">
            <Image
              alt=''
              width={50}
              height={50}
              src={'/images/grocery.png'}
            />
          </div>
          <div className="w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg">
            <Image
              alt=''
              width={100}
              height={100}
              src={'/images/meatlogo.png'}
              className='w-full h-full'
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
            <Link href={'/Components/FarmPage'}>
              <FarmCard />
            </Link>
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
            <FarmCard />
          </div>
        </div>
      </div>
      {/* <Farm />
      <Farm />
    <Farm /> */}
    {/* <Farm /> */}
    </div>
  )
}

export default AllFarms

function showSlides(): () => void {
  throw new Error('Function not implemented.')
}
