import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';
import {MarkerF} from '@react-google-maps/api'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function ShowMap() {
  const center = {
    lat: 37.7749,
    lng: -122.4194
  };
  const [currentPosition, setCurrentPosition] = useState(center);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const containerStyle = {
    width: '100%',
    height: '90%'
  };

  const onMarkerDragEnd = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setCurrentPosition({ lat, lng });
  }

  const handleFindMyLocation = () => {
    try {
      setOpen(true)
      console.log("start")
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          if(position.coords.latitude && position.coords.longitude) {
            setOpen(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddMyLocation = async () => {
    try {
      console.log(currentPosition)
    } catch (error) {
      console.log(error)
    }
  }


  const styles = {
    page: `w-screen flex flex-col justify-center items-center`,
    container: `w-screen max-w-md h-screen flex flex-col justify-start items-center`,
    btn: `bg-green px-3 py-1 h-8 rounded-xl text-3sm font-bold text-white`,
    btn_box: `w-full flex justify-around items-center mt-auto mb-auto`
  }
  
  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <LoadScript
          googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={10}
          >
            <MarkerF
              position={currentPosition}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </GoogleMap>
        </LoadScript>

        <Box className={styles.btn_box}>
          <button className={styles.btn} onClick={handleFindMyLocation}>Find my location</button>
          <button className={styles.btn} onClick={handleAddMyLocation}>Add my location</button>
        </Box>
      </Box>
    </Box>
  )
}

export default ShowMap;