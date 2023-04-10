import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import ImageCard from './ImageCard'
import PeopleIcon from '@mui/icons-material/People'
import Link from 'next/link'

function ProductCard(props: any) {

  const sendData = {
    data: props._id
  }

  const styles = {
    card: `w-full max-w-md h-20 flex justify-around text-black`,
    imgBox: `h-20 w-20`,
    productdesc: `flex flex-col justify-center items-start`
  }
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <ImageCard 
          image={props.image}
          type='products'
        />
      </div>
      <div className={styles.productdesc}>
        <span className='font-bold text-2sm'>{props.name}</span>
        <span className='font-bold text-sm'>{props.weight}</span>
        <span className='font-bold text-sm flex w-full'>
          <Stack spacing={1}>
            <Rating 
              name="read-only" 
              precision={0.1} 
              size='small' 
              value={props.ratingsAverage} 
            />
            {/* <span>12</span> */}
          </Stack>
          {/* <div className="flex justify-center items-center w-10">
            <span className='text-2sm ml-3 mr-2'>({props.ratingsQuantity})</span>
            <PeopleIcon fontSize='small' />
          </div> */}
        </span>
        <div className="flex justify-center items-center w-10">
          <span className='text-2sm ml-3 mr-2'>({props.ratingsQuantity})</span>
          <PeopleIcon fontSize='small' />
        </div>
        <span className='font-bold text-sm'>${props.price}</span>
      </div>
      <div className="flex justify-center items-center">
        {/* <AddShoppingCartIcon fontSize='small' /> */}
      </div>
    </div>
  )
}

export default ProductCard