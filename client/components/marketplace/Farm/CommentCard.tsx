import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

function CommentCard(props:any) {

  const styles = {
    card: `mb-5`
  }

  return (
    <div className={styles.card}>
      <div className="">
        <AccountCircleIcon color='primary' />
        <span className='font-bold text-2sm ml-2'>{props.userName}</span>
      </div>
      <div className="">
        <Stack spacing={1}>
          <Rating 
            name="read-only" 
            precision={0.1} 
            size='small' 
            value={props.rating}
          />
        </Stack>
      </div>
      <span className="font-bold ">{`Good but Can Be Better`}</span>
      <div className="mt-1">
        <p className='font-semibold text-2sm'>{`Reviewed on 18 February 2023`}</p>
        <p className='text-sm'>{props.review}</p>
      </div>
      {/* <div className="border-b-2 w-10/12"></div> */}
    </div>
  )
}

export default CommentCard