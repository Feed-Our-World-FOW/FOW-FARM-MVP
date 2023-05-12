import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import { Alert, AlertColor, Box, Container, IconButton, Snackbar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { updateMe, getMyConsumerProfile } from '../../components/marketplace/API';
import { fetchToken } from '../../components/marketplace/token';
import BottomNav from '../../components/marketplace/navBar/BottomNav';
import MenuIcon from '@mui/icons-material/Menu';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import LocationCard from '../../components/marketplace/location/LocationCard';
import 'animate.css'

interface User {
  name: string;
  email: string;
  photo?: File | null;
}

function UserProfile() {
  const [userEdit, setUserEdit] = useState(false)
  const [locationEdit, setLocationEdit] = useState(false)
  const [myProfile, setMyProfile] = useState<any>({})
  const [img, setImg] = useState(false)
  const [userDetails, setUserDetails] = useState<User>({
    name: "",
    email: "",
    photo: null
  })
  const [alertTxt, setAlertTxt] = useState('')
  const [alertStatus, setAlertStatus] = useState<AlertColor>("success" || "warning" || "info" || "error")
  const [open, setOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  

  const fetch = async () => {
    try {
      const token = fetchToken()
      const myProfile = await getMyConsumerProfile(token)

      const data = myProfile.data.data.data[0]
      setMyProfile(data)
      setUserDetails({
        name: data.user.name,
        email: data.user.email,
        photo: data.user.photo
      })
      
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const handleImgChange = (e: any) => {
    try {
      setImg(true)
      const selectedFile = e.target.files?.[0]

      if(selectedFile) {
        setUserDetails({...userDetails, photo: selectedFile})
        const reader: any = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
          setPreviewUrl(reader.result)
        }
      }


    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      setUserEdit(false)
      const token = fetchToken()
      const formdata = new FormData()
      if(userDetails.photo) {
        formdata.append('photo', userDetails.photo)
      }
      formdata.append('name', userDetails.name)
      formdata.append('email', userDetails.email)

      updateMe(token, formdata)

      setOpen(true)
      setAlertStatus("success")
      setAlertTxt('Successfully updated your profile!!!')
      
      window.location.reload()
    } catch (error: any) {
      console.log(error)
      setOpen(true)
      setAlertStatus("error")
      setAlertTxt(`${error.response.data.message}`)
      window.location.reload()
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const styles = {
    page: `flex flex-col justify-between items-center mb-10`,
    navBox: `w-screen h-20 flex justify-between items-center bg-white`,
    profileText: `font-bold text-3sm ml-auto mr-auto`,
    bottomBox: `w-full flex justify-center items-center mt-10`
  }

  return (
    <Box className='w-screen flex flex-col justify-center items-center'>
      <Container className={styles.page} maxWidth="sm">

        <Paper className={styles.navBox} elevation={0}>
          <Box className="ml-3" >
            <MenuIcon />
          </Box>
          <span className={styles.profileText}>Profile</span>
        </Paper>

        <Box className="border-1 border-light-gray w-full min-h-24 rounded-2xl flex justify-around items-center">
          <Box className="w-3/12 h-full flex justify-center items-center">
            <Avatar 
              alt={myProfile?.user?.name} 
              src={img ? previewUrl : myProfile?.user?.photo} 
              sx={{ width: 56, height: 56 }} 
              className='animate__animated animate__rubberBand'
            />
            {
              userEdit ?
              <IconButton color="primary" aria-label="upload picture" component="label" className='absolute mt-9 ml-12'>
                <input 
                  hidden accept="image/*" 
                  type="file" 
                  onChange={handleImgChange}
                />
                <PhotoCamera />
              </IconButton> :
              <Box></Box>
            }
          </Box>

          <Box className="w-8/12 h-full flex flex-col justify-center items-center">
            {
              !userEdit ?
              <span className='text-sm text-light-gray mb-auto mt-3'>Account type: Consumer</span>:
              <span></span>
            }
            <Box className="w-full flex flex-col justify-center items-center">
              {
                userEdit ?
                <Box className="w-full flex justify-end items-end mt-1 mr-1" onClick={() => setUserEdit(false)}>
                  <ClearIcon fontSize='small' />
                </Box> :
                <Box></Box>
              }
              {
                userEdit ?
                <TextField 
                  id="standard-basic" 
                  label={myProfile?.user?.name} 
                  variant="standard" 
                  onChange={(e: any) => setUserDetails({...userDetails, name: e.target.value})} 
                /> :
                <span className='text-sm font-bold'>{myProfile?.user?.name}</span>
              }
              {
                userEdit ?
                <TextField 
                  id="standard-basic" 
                  label={myProfile?.user?.email} 
                  variant="standard" 
                  onChange={(e: any) => setUserDetails({...userDetails, email: e.target.value})} 
                /> :
                <span className='text-sm font-semibold overflow-hidden'>{(`${myProfile?.user?.email}`).slice(0,35)}</span>
              }
            </Box>
            <Box className="w-full flex justify-end">
              {
                userEdit ?
                <AddCircleOutlineOutlinedIcon fontSize='small' onClick={handleUpdate} className='mt-3' /> :
                <ModeEditOutlineOutlinedIcon fontSize='small' onClick={() => setUserEdit(true)} />
              }
            </Box>
          </Box>
        </Box>


        <Box className='border-1 border-light-gray w-full h-52 rounded-2xl mt-5 flex flex-col justify-center items-center'>

          {
            locationEdit ?
            <Box className="w-full h-full flex flex-col justify-center items-center">
              <Box className="w-full flex justify-end items-start mb-auto mt-2 mr-4">
                <ClearIcon fontSize='small' onClick={() => {setLocationEdit(false); window.location.reload()}} />
              </Box>
              <span></span>
              <Link href={'/location/ShowMap'} className='w-52 h-9 flex justify-center items-center bg-green rounded-2xl mb-10'>
                <span className='text-3sm text-white font-semibold'>Add location</span>
              </Link>
            </Box> 
            :
            myProfile?.location?.coordinates?.length === 2 ?
            <Box className="w-full h-full flex flex-col rounded-2xl">
              <LocationCard 
                lat={myProfile?.location?.coordinates[1]}
                lng={myProfile?.location?.coordinates[0]}
              />
              <Box className="flex justify-end items-end absolute" sx={{marginLeft: '255px'}}>
                <ModeEditOutlineOutlinedIcon fontSize='small' onClick={() => setLocationEdit(true)} />
              </Box>
            </Box> :
            <Box className="w-full h-full flex flex-col justify-center items-center">
              <Box></Box>
              <span className='text-2sm font-semibold mr-auto ml-7'>My Address</span>
              <Box className="w-full h-44 flex justify-end items-end">
                <ModeEditOutlineOutlinedIcon fontSize='small' onClick={() => setLocationEdit(true)} />
              </Box>
            </Box>
          }
        </Box>


        <Box className='border-1 border-light-gray w-full h-48 rounded-2xl mt-5 flex flex-col justify-around items-center'>
          
          <Box className="w-10/12 rounded-2xl h-12 flex justify-around items-center">
            <span className='text-sm font-semibold mr-auto'>Record</span>
          </Box>
          <Box className="border-1 border-light-gray w-10/12 rounded-2xl h-12 flex justify-around items-center">
            <span className='text-sm'>My Orders</span>
            <span className='text-sm'>{myProfile.orders}</span>
            <Box className="ml-7">
              <ArrowForwardIosIcon fontSize='small' />
            </Box>
          </Box>
          <Box className="border-1 border-light-gray w-10/12 rounded-2xl h-12 flex justify-around items-center">
            <span className='text-sm'>My favourite</span>
            <span className='text-sm'>{myProfile.favourite}</span>
            <Box className="ml-7">
              <ArrowForwardIosIcon fontSize='small' />
            </Box>
          </Box>
          
        </Box>

        <button className="w-full h-9 rounded-3xl bg-green flex justify-center items-center mt-5">
          <span className='text-3sm font-bold text-white'>Connect Wallet</span>
        </button>

        <Snackbar open={open} autoHideDuration={4500} className='w-full'>
          <Alert variant="filled" onClose={handleClose} severity={alertStatus} className='w-11/12'>
            {alertTxt}
          </Alert>
        </Snackbar>

        



        
      </Container>
      <Box className={styles.bottomBox}>
        <BottomNav />
      </Box>
    </Box>
  )
}

export default UserProfile