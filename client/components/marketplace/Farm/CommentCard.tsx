import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

function CommentCard() {

  const styles = {
    card: `mb-5`
  }

  return (
    <div className={styles.card}>
      <div className="">
        <AccountCircleIcon color='primary' />
        <span className='font-bold text-2sm ml-2'>ABC Koholi</span>
      </div>
      <div className="">
        <Stack spacing={1}>
          <Rating 
            name="read-only" 
            value={3.3}
            size='small' 
          />
        </Stack>
      </div>
      <span className="font-bold ">{`Good but Can Be Better`}</span>
      <div className="mt-1">
        <p className='font-semibold text-2sm'>{`Reviewed on 18 February 2023`}</p>
        <p className='text-sm'>{`Overall product is good, good quality good smell and color is 
          white but the rice is not long enough, most of them are 
          broken, So next time I’ll wish some more quality.`}</p>
      </div>
      {/* <div className="border-b-2 w-10/12"></div> */}
    </div>
  )
}

export default CommentCard