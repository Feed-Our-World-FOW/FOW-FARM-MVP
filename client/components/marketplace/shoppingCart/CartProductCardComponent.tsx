import { Box } from '@mui/material'
import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ImageCard from '../Img/ImageCard'

function CartProductCardComponent(props: any) {
  return (
    <div className='w-11/12 border-1 border-light-gray rounded-3xl h-12 flex justify-around items-center'>
      <Box className='w-10 h-10 rounded-full'>
        <ImageCard 
          image={props.image}
          type='products'
        />
      </Box>
      <span className='text-sm'>{props.name}</span>
      <span className='text-sm'>{props.weight}</span>
      <span className='text-sm font-semibold'>$ {props.price}</span>
      <Box className='w-10 h-10 flex justify-center items-center'>
        <DeleteOutlinedIcon fontSize='medium' />
      </Box>
    </div>
  )
}

export default CartProductCardComponent