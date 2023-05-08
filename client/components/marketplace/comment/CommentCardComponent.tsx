import { Box, Typography } from '@mui/material'
import React from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';


function CommentCardComponent() {
  return (
    <div className='w-full flex justify-center items-center mt-5'>
      <Box className="w-11/12 min-h-12 flex">
          <Box className='h-full w-2/12 flex justify-center items-start'>
            <Box className='border-1 w-10 h-10 rounded-full'>

            </Box>
          </Box>
          <Box className='h-full w-10/12 flex flex-col'>
            <Box className='w-full min-h-5 flex justify-start items-center'>
              <span className='text-3sm font-medium text-dark-gray'>Ankush Banik</span>
            </Box>
            <Box className='w-8/12 h-5 flex justify-start items-center'>
              <Box className='flex justify-center items-center'>
                <StarOutlineIcon fontSize='small' />
                <StarOutlineIcon fontSize='small' />
                <StarOutlineIcon fontSize='small' />
                <StarOutlineIcon fontSize='small' />
                <StarOutlineIcon fontSize='small' />
              </Box>
              <Box className='flex justify-center items-center ml-5'>
                <span className='text-2sm font-semibold text-dark-gray'>4 day</span>
              </Box>
            </Box>
            <Box className='w-full min-h-5'>
              <Typography  className='text-2sm tracking-tighter leading-[1rem] font-medium'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam enim sunt animi voluptatibus 
                molestiae odio rem excepturi atque, dolore dolores!
              </Typography>
            </Box>
          </Box>
        </Box>
    </div>
  )
}

export default CommentCardComponent