import React from 'react'
import Navbar from '../../components/marketplace/Navbar'
import Image from 'next/image'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CommentCard from '../../components/marketplace/Farm/CommentCard'
import Link from 'next/link'

function ProductPage() {

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    about: `w-10/12 flex flex-col items-center mb-5`,
    imgBox: `w-full h-72 mt-36 flex justify-center items-center`
  }

  return (
    <div className={styles.page}>
      <div className={styles.navBox}>
        <Navbar />
      </div>
      <div className={styles.imgBox}>
        <Image 
          alt="rice"
          src={`/images/normalrice.png`}
          width={100}
          height={100}
          className='w-full h-full'
        />
      </div>

      <div className="border-b-2 w-11/12 mt-5 mb-5"></div>

      <div className={styles.about}>
        <div className="flex w-full justify-between items-center">
          <span className='font-semibold text-lg'>{`$12.33`}</span>
          <Stack spacing={1}>
            <Rating 
              name="read-only" 
              value={3.3}
              size='small' 
            />
          </Stack>
        </div>
        
        <span className='text-3sm mb-5 font-semibold'>{`The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice`}</span>
        <span className='text-3sm mb-5 font-semibold'>{`The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice`}</span>
        <span className='text-3sm mb-5 font-semibold'>{`The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice`}</span>
        <button className='w-7/12 rounded-2xl mb-1 bg-light-pearl text-2sm p-1'>Add To Cart</button>
        <Link href={'/Components/DeliverySteps'} className='w-7/12 rounded-2xl'>
          <button className='w-full rounded-2xl bg-pearl text-2sm p-1'>Buy Now</button>
        </Link>
      </div>

      <div className="border-b-2 w-11/12 mt-3 mb-5"></div>

      <div className="w-full mb-5 p-3">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
    </div>
  )
}

export default ProductPage