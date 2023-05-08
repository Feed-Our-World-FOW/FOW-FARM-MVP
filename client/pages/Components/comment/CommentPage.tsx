import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../../components/marketplace/navBar/Navbar'
import CommentCardComponent from '../../../components/marketplace/comment/CommentCardComponent';
import WriteCommentCardComponent from '../../../components/marketplace/comment/WriteCommentCardComponent';

function CommentPage() {
  return (
    <div className='w-screen min-h-screen max-w-md flex flex-col justify-between items-center'>
      <Box className="w-full flex flex-col items-center">
        <Navbar 
          arrow={true} 
          rating={true}
        />
        <Box className='w-full flex justify-center items-center h-8 mt-20'>
          <span className='text-3sm font-bold'>4.8</span>
          <span className='text-3sm font-semibold ml-2'>(250)</span>
        </Box>

        <Box className='w-full mb-5'>
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
          <CommentCardComponent />
        </Box>


        
      </Box>
      <Box className="w-full bg-white fixed bottom-0 h-28 mt-10 flex justify-center items-center">
        <WriteCommentCardComponent />
      </Box>
      
    </div>
  )
}

export default CommentPage