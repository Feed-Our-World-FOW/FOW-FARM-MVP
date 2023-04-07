import React, { MouseEventHandler } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close';
import { WriteCommentInterface } from '../../../../interface/AllFarmsInterface';

function WriteCommentCard(props: WriteCommentInterface) {

  const styles = {
    commentBox: `w-full flex flex-col h-72 justify-center items-center bg-white drop-shadow-1.5lg rounded-md`,
    btnBox: `w-full flex justify-center items-center`,
    btn: `border-1 bg-pearl drop-shadow-lg active:drop-shadow-0.5lg w-28 h-10 rounded-md ml-auto flex justify-center items-center`,
    bellow_sub_box: `mt-3 w-10/12`,
    top_sub_box: `h-10 border-1 rounded-md w-10/12`
  }
  return (
    <div className={styles.commentBox}>
      <div className="w-11/12 flex justify-end">
        <CloseIcon 
          onClick={() => props.setComment(false)}
        />
      </div>
      <div className={styles.top_sub_box}>
        <input 
          type="text" 
          name="" 
          id="" 
          placeholder='Title goes here...'
          className='w-full h-full rounded-md bg-white drop-shadow-lg p-2'
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
      </div>

      <div className={styles.bellow_sub_box}>
        <textarea 
          name="" 
          id="" 
          placeholder='Leave your comments here...'
          className='bg-white drop-shadow-lg w-full h-28 border-1 p-2 rounded-xl'
          cols={30} 
          rows={10}
          value={props.review}
          onChange={(e) => props.setReview(e.target.value)}
        >
          </textarea>
        <div className={styles.btnBox}>
          <Stack spacing={1}>
            <Rating 
              name="simple-controlled" 
              precision={0.1} 
              size='small' 
              value={props.value}
              onChange={(e: any) => props.setValue(Number(e?.target?.value))}
            />
          </Stack>
          <button 
            className={styles.btn} 
            onClick={props.commentFunction as MouseEventHandler<HTMLButtonElement>}
          >submit</button>
        </div>
      </div>
    </div>
  )
}

export default WriteCommentCard