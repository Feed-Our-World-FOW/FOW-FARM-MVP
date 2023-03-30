import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

function ProductCard() {

  const styles = {
    card: `w-11/12 max-w-md h-20 mb-5 flex justify-around`,
    imgBox: `border-2 h-20 w-20`,
    productdesc: `flex flex-col justify-center items-start ml-2 p-2`
  }
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}></div>
      <div className={styles.productdesc}>
        <span className='font-bold text-2sm'>Flask extrime basmati Rice</span>
        <span className='font-bold text-sm'>10 Lbs</span>
        <span className='font-bold text-sm'>
          <Stack spacing={1}>
            <Rating 
              name="half-rating" 
              defaultValue={0} 
              precision={0.1} 
              size='small' 
              // value={value} 
              // onChange={(event: any, newValue) => {
              //   setValue(newValue)
              //   console.log(event.target.value)
              // }}
            />
          </Stack>
        </span>
        <span className='font-bold text-sm'>$12.33</span>
      </div>
      <div className="flex justify-center items-center">
        <AddShoppingCartIcon fontSize='small' />
      </div>
    </div>
  )
}

export default ProductCard