import { Box } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from 'react'

function WriteCommentCardComponent() {
  return (
    <div className='border-1 w-11/12 flex flex-col justify-between items-center min-h-20 rounded-3xl fixed bottom-0 mb-5 bg-white'>
      <Box className="w-6/12 flex justify-start items-center ml-1">
        <StarBorderIcon fontSize='small' />
        <StarBorderIcon fontSize='small' />
        <StarBorderIcon fontSize='small' />
        <StarBorderIcon fontSize='small' />
        <StarBorderIcon fontSize='small' />
      </Box>
      <Box className='w-11/12 h-12 flex justify-between items-center'>
        <Box className="w-10 h-10 rounded-full border-1"></Box>
        <Box className="w-8/12 h-8 rounded-3xl border-1"></Box>
        <Box className="w-3/12 h-8 rounded-3xl border-1 bg-green"></Box>
      </Box>
    </div>
  )
}

export default WriteCommentCardComponent