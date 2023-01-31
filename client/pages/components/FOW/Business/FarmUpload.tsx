import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import CottageIcon from '@mui/icons-material/Cottage';
import PlaceIcon from '@mui/icons-material/Place';
import Slider from '@mui/material/Slider';
import TodayIcon from '@mui/icons-material/Today';
import Button from '@mui/material/Button';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import jwt from 'jwt-decode';


function FarmUpload() {
  const URL = `https://fow-api-production.up.railway.app/api/v1/farm`
  const [farmDetails, setFarmDetails] = useState({
    createAt: '',
    farmName: '',
    farmImg: 'img1',
    farmLocation: '',
    rating: 0,
    produce: false,
    meat: false,
  })

  const handleSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Token") || '{}').value
      let decodedToken = {} as any
      decodedToken = jwt(token)
      const add = {
        creatorID: decodedToken.id,
        createAt: farmDetails.createAt,
        farmName: farmDetails.farmName,
        farmImage: farmDetails.farmImg,
        farmLocation: farmDetails.farmLocation,
        rating: farmDetails.rating,
        produce: farmDetails.produce,
        meat: farmDetails.meat,
        }
      console.log("Add: ", add)

      const response = await axios.post(URL, add)
      
      console.log(response)
      alert("Successfully farm Added")
    } catch (error: any) {
      // if(error.response.data.message === "request entity too large") {
      //   alert("⛔Please upload an Image less then 50kb")
      // }
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen flex flex-col justify-between items-center min-h-screen`,
    navBox: `w-screen pt-7 pb-7 bg-slate-300/[.9] shadow-xl border-white-900/75 flex justify-around items-center max-w-screen-sm mb-5`,
    nameBox: `w-11/12 flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm mb-5 mt-5`,
    subNameBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm mb-5 mt-5`,
    name: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
    uploadBox: `w-11/12 h-10 flex justify-between items-center max-w-sm bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md`,
    dropdownBox: `w-11/12 max-w-sm min-h-96 mounded-xl mb-5`,
    continue: `p-2 w-full`,
    btnBox: ` w-full max-w-sm mt-auto`,
    check: `w-5 h-5`,
    checkbox: `w-11/12 flex justify-between items-center max-w-sm bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 mb-5 rounded-md`,
    smallBtn: `w-28 bg-sky-600`,
    subBox: `w-full flex justify-between items-center bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm mb-1 mt-1`,
    meatname: `text-md font-semibold text-gray-500`,
    subInput: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`
  }
  return (
    <div className={styles.page}>
      <div className={styles.navBox}>
        <Link href="/components/FOW/Option">
          <div>
            <ArrowBackIcon color="primary" fontSize='large' />
          </div>
        </Link>
        <span className="text-sm font-semibold">List your Farm</span>
        <Link href="/components/FOW/Business/MyFarm">
          <Button variant="contained" className={styles.smallBtn}>
            <span className="text-xs">My Farm</span>
          </Button>
        </Link>
      </div>

      <div className={styles.nameBox}>
        <CottageIcon color='primary' fontSize='large' />
        <input 
          type="text" 
          placeholder="John Doe Farm" 
          className={styles.name} 
          onChange={(e) => setFarmDetails({ ...farmDetails, farmName: e.target.value })} 
        />
      </div>

      <div className={styles.uploadBox}>
        <FileBase64 
          type="file" 
          multiple={false} 
          onDone={(el: any) => setFarmDetails({ ...farmDetails, farmImg: `${el.base64}` })}  
        />
      </div>


      <div className={styles.nameBox}>
        <PlaceIcon color='primary' fontSize='large' />
        <input 
          type="text" 
          placeholder="Texas US" 
          className={styles.name} 
          onChange={(e) => setFarmDetails({ ...farmDetails, farmLocation: e.target.value })}
        />
      </div>

      <div className='w-11/12 flex flex-col justify-center max-w-sm'>
        <span className='text-sm'>Farm rating: </span>
        <div className="w-11/12">
          <Slider
            size="small"
            step={0.1}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            defaultValue={3.2}
            onChange={(e: any) => setFarmDetails({ ...farmDetails, rating: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className={styles.nameBox}>
        <TodayIcon color='primary' fontSize='large' />
        <input 
          type="date" 
          placeholder="Texas US" 
          className={styles.name} 
          onChange={(e: any) => setFarmDetails({ ...farmDetails, createAt: e.target.value })}
        />
      </div>

      <div className={styles.checkbox}>
        <span className='text-md font-semibold text-gray-600'>Meat</span>
        <input 
          type="checkbox" 
          className={styles.check} 
          checked={farmDetails.meat}
          onChange={() => setFarmDetails({...farmDetails, meat: !farmDetails.meat})}
        />
      </div>

      <div className={styles.checkbox}>
        <span className='text-md font-semibold text-gray-600'>Produce</span>
        <input 
          type="checkbox" 
          className={styles.check} 
          checked={farmDetails.produce}
          onChange={() => setFarmDetails({...farmDetails, produce: !farmDetails.produce})}
        />
      </div>

      <div className={styles.btnBox}>
        <Link href="/components/FOW/Business/MyFarm">
          <Button variant="contained" onClick={handleSubmit} className={styles.continue}>Save</Button>
        </Link>
      </div>
    </div>
  )
}

export default FarmUpload