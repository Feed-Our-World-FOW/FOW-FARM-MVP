import { Avatar, Box, Container, IconButton, Paper, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { fetchToken } from '../../components/marketplace/token';
import { getMyBusinessProfile } from '../../components/marketplace/API';
import { PhotoCamera } from '@mui/icons-material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import BottomNav from '../../components/marketplace/navBar/BottomNav';
import LocationCard from '../../components/marketplace/location/LocationCard';


interface User {
  name: string;
  email: string;
  photo?: File | null;
}

function ProducerProfile() {
  const [userEdit, setUserEdit] = useState(false)
  const [detailsEdit, setDetailsEdit] = useState(false)
  const [img, setImg] = useState(false)
  const [userDetails, setUserDetails] = useState<User>({
    name: "",
    email: "",
    photo: null
  })
  const [previewUrl, setPreviewUrl] = useState("")
  const [myProfile, setMyProfile] = useState<any>({})
  



  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyBusinessProfile(token)
      const data = res.data.data.data[0]
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
      console.log("Update profile")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `flex flex-col justify-between items-center mb-10`,
    navBox: `w-screen h-20 flex justify-between items-center bg-white`,
    profileText: `font-bold text-3sm ml-auto mr-auto`,
    bottomBox: `w-full flex justify-center items-center mt-10`,
    profileContainer: `border-1 border-light-gray w-full min-h-24 rounded-2xl flex justify-around items-center`,
    infoContainer: `border-1 border-light-gray w-full rounded-2xl flex justify-around items-center mt-5 flex flex-col justify-around items-center`,
    mapContainer: `border-1 border-light-gray w-full h-52 rounded-2xl flex justify-center items-center mt-5`,
    infoBox: `border-1 border-light-gray h-14 rounded-2xl w-11/12 flex justify-center items-center mt-2 mb-2`,
    subInfoBox: `w-11/12 flex justify-between items-center`
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

        <Box className={styles.profileContainer}>
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
              <span className='text-sm text-light-gray mb-auto mt-3'>Account type: Producer</span>:
              <span></span>
            }
            <Box className="w-full flex flex-col justify-center items-center mt-4">
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

        <Box className={styles.mapContainer}>
          <LocationCard 
            lat={myProfile?.location?.coordinates[1]}
            lng={myProfile?.location?.coordinates[0]}
          />
        </Box>

        <Box className={styles.infoContainer}>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <span className='text-2sm'>Shipping redius</span>
              <span className='text-2sm'>{myProfile.shippingRadius} km</span>
            </Box>
          </Box>
          <Box className="w-10/12 flex justify-start mt-1 mb-1">
            <span className='text-2sm font-semibold'>Stock Product</span>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <Box className="flex flex-col justify-center items-center">
                <span className='text-2sm'>Shipping cost / km</span>
                <span className='text-2sm'>{`(Standard Delivery)`}</span>
              </Box>
              <span className='text-2sm'>$ {myProfile.shippingCostStandard}</span>
            </Box>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <Box className="flex flex-col justify-center items-center">
                <span className='text-2sm'>Shipping time / km</span>
                <span className='text-2sm'>{`(Standard Delivery)`}</span>
              </Box>
              <span className='text-2sm'>{myProfile.shippingTimeStandard}</span>
            </Box>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <Box className="flex flex-col justify-center items-center">
                <span className='text-2sm'>Shipping cost / km</span>
                <span className='text-2sm'>{`(Express Delivery)`}</span>
              </Box>
              <span className='text-2sm'>$ {myProfile.shippingCostExpress}</span>
            </Box>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <Box className="flex flex-col justify-center items-center">
                <span className='text-2sm'>Shipping time / km</span>
                <span className='text-2sm'>{`(Express Delivery)`}</span>
              </Box>
              <span className='text-2sm'>{myProfile.shippingTimeExpress}</span>
            </Box>
          </Box>



          <Box className="w-10/12 flex justify-start mt-1 mb-1">
            <span className='text-2sm font-semibold'>Ondemand Product</span>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <span className='text-2sm'>Shipping cost / km</span>
              <span className='text-2sm'>$ {myProfile.shippingOndemandCost}</span>
            </Box>
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.subInfoBox}>
              <span className='text-2sm'>Shipping time / km</span>
              <span className='text-2sm'>{myProfile.shippingOndemandTime}</span>
            </Box>
          </Box>


          <Box className="w-full h-full flex flex-col justify-center items-center">
            <Box></Box>
            <Box className="w-full flex justify-end items-end">
              {/* <ModeEditOutlineOutlinedIcon fontSize='small' onClick={() => setLocationEdit(true)} /> */}
              <ModeEditOutlineOutlinedIcon fontSize='small' />
            </Box>
          </Box>
        </Box>


        <Box className=""></Box>

      </Container>

      <Box className={styles.bottomBox}>
        <BottomNav 
          produce={true}
        />
      </Box>
    </Box>
  )
}

export default ProducerProfile