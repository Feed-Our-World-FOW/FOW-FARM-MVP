import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import ImageCard from './ImageCard'

function ProductCard(props: any) {

  const styles = {
    card: `w-full max-w-md h-20 mb-5 flex justify-around`,
    imgBox: `h-20 w-20`,
    productdesc: `flex flex-col justify-center items-start ml-2 p-2`
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
        </span>
        <span className='font-bold text-sm'>${props.price}</span>
      </div>
      <div className="flex justify-center items-center">
        <AddShoppingCartIcon fontSize='small' />
      </div>
    </div>
  )
}

export default ProductCard