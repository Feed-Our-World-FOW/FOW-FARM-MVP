import React from 'react'
import ImageCard from '../Img/ImageCard'
import { Box, Paper } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ProductCardComponent(props: any) {

  const styles = {
    wholeCard: `w-full h-24 bg-white rounded-xl flex justify-between items-center mb-5 border-1 border-light-gray`,
    imgBox: `w-full h-24 rounded-xl border-1`,
    infoBox: `flex flex-col p-2`,
    bigText: `text-sm indent-0 font-semibold`,
    smallText: `text-xs`
  }

  return (
    <Paper elevation={0} className={styles.wholeCard}>
      <Box className="h-full w-3/12 flex justify-center items-center">
        <Box className="w-14 h-14 rounded-full" onClick={() => console.log(props)}>
          <ImageCard 
            image={props.images}
            // type='products'
          />
        </Box>
      </Box>

      <Box className="w-8/12 h-20 flex justify-between items-center">
        <Box className="w-10/12 h-full flex flex-col justify-around items-start">
          <span className='text-2.5sm font-semibold'>{props.name}</span>
          <span className='text-2.5sm font-semibold'>
            {props.stock || props.capacity} {props.unit} {props.capacity && `/month`}
          </span>
          <span className='text-2sm font-bold'>$ {props.price} / {props.unit}</span>
        </Box>
        <Box className="w-2/12 h-full flex justify-center items-center">
          <ArrowForwardIosIcon />
        </Box>
      </Box>
      
    </Paper>
  )
}

export default ProductCardComponent