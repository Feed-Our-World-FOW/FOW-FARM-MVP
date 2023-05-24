import { Alert, AlertColor, Box, Snackbar, styled } from '@mui/material'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import ImageCard from '../Img/ImageCard';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors'
import { fetchToken } from '../token';
import { useRouter } from 'next/router';
import { createReviewForFarm } from '../API';

function WriteCommentCardComponent(props: any) {
  const router = useRouter()
  const data = router.query
  const [reviewDetails, setReviewDetails] = useState<any>({
    review: "",
    rating: 0
  })
  const [open, setOpen] = useState(false)
  const [alertTxt, setAlertTxt] = useState('')
  const [alertStatus, setAlertStatus] = useState<AlertColor>("success" || "warning" || "info" || "error")
  

  const handleSendReview = async () => {
    try {
      const token = fetchToken()
      const farmId = data.data as string
      const res = await createReviewForFarm(token, farmId, reviewDetails)
      console.log(reviewDetails)
      console.log(res)

      console.log(farmId)
      setOpen(true)
      setAlertStatus("success")
      setAlertTxt(`Your review got added successfully!!!`)
      props.setLoad((load: boolean) => !load)

    } catch (error: any) {

      console.log(error)
      setOpen(true)
      setAlertStatus("error")
      setAlertTxt(`${error.response.data.message}`)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#000000',
    },
    '& .MuiRating-iconHover': {
      color: '#000000',
    },
  });

  const styles = {
    card: `border-1 border-light-gray w-11/12 flex flex-col justify-between items-center rounded-3xl bottom-0 mb-5`,
    itemsBox: `w-11/12 h-12 flex justify-between items-center mb-2`,
    star: `text-graysh-black`,
    starBox: `w-8/12 flex justify-start items-center mb-1 mt-1`,
    input: `w-full h-full placeholder:text-2sm px-2 outline-none text-2sm`,
    btn: `w-16 h-8 rounded-3xl bg-green text-2sm font-semibold`
  }

  return (
    <Box className={styles.card}>
      <Box className={styles.starBox}>
        <StyledRating
          name="simple-controlled"
          value={reviewDetails.rating}
          onChange={(event, newValue) => {
            // setValue(newValue);
            setReviewDetails({...reviewDetails, rating: newValue})
          }}
          size="small"
          icon={<StarBorderRoundedIcon fontSize='inherit' />}
          precision={0.1}
        />
      </Box>
      <Box className={styles.itemsBox}>
        <Box className="w-9 h-9 rounded-full">
          {
            props.userPhoto ?
            <ImageCard 
              image={props?.userPhoto}
              rounded={true}
            /> :
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt={props?.userName}
              onClick={() => console.log(props.userName)}
              src="/broken-image.jpg"
            />

          }
        </Box>
        <Box className="w-8/12 h-8">
          <input 
            type="text" 
            placeholder='Leave a Rating and Review' 
            className={styles.input} 
            onChange={(e: any) => setReviewDetails({...reviewDetails, review: e.target.value})}
          />
        </Box>
        <button className={styles.btn} onClick={handleSendReview}>Send</button>
      </Box>
      <Snackbar open={open} autoHideDuration={4500} className='w-full mt-auto'>
        <Alert variant="filled" onClose={handleClose} severity={alertStatus} className='w-11/12'>
          {alertTxt}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default WriteCommentCardComponent