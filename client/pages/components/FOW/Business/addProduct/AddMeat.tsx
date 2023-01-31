import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import jwt from 'jwt-decode';
import axios from 'axios';
import FileBase64 from 'react-file-base64';


function AddMeat() {
  const URL = `https://fow-api-production.up.railway.app/api/v1/farm`

  const [meatDetails, setMeatDetails] = useState({
    animalName: '',
    cutsName: '',
    image: 'IMG',
    weight: '',
    price: ''
  })

  const handleClick = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Token") || '{}').value
      let decodedToken = {} as any
      decodedToken = jwt(token)
      
      const response = await axios.get(
        URL + "?creatorID=" + decodedToken.id, 
        { 
          headers: {"Authorization" : `Bearer ${token}`}
        }
      )
      const farmId = response.data.data.farm[0]._id
      const meats = response.data.data.farm[0]?.meatDetails?.details

      let add: any

      if(typeof meats === 'undefined') {
        add = {
          meatDetails: {
            details: [
              {
                name: meatDetails.animalName,
                cuts: meatDetails.cutsName,
                image: meatDetails.image,
                weight: meatDetails.weight,
                price: meatDetails.price
              }
            ]
          }
        }
      }else {
        add = {
          meatDetails: {
            details: [
              ...meats,
              {
                name: meatDetails.animalName,
                cuts: meatDetails.cutsName,
                image: meatDetails.image,
                weight: meatDetails.weight,
                price: meatDetails.price
              }
            ]
          }
        }
      }

      const patchURL = URL + "/" + farmId
      const patchRequest = await axios.patch(patchURL, add)

      setMeatDetails({
        animalName: '',
        cutsName: '',
        image: 'IMG',
        weight: '',
        price: ''
      })
      alert("Successfully upload your product😃")
      window.location.reload()

    } catch (error: any) {
      if(error.response.data.message === "request entity too large") {
        alert("⛔Please upload an Image less then 50kb")
      }
      console.log(error)
    }
  }

  const styles = {
    addMeat: `w-full flex flex-col justify-center items-center max-w-sm p-5`,
    subNameBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm mb-10`,
    subInput: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
    smallBtn: `w-10/12 bg-sky-600`
  }
  return (
    <div className={styles.addMeat}>
      <div className={styles.subNameBox}>
        <img src="/images/lamb.png" className='w-10' />
        <input 
          type="text" 
          placeholder="Name of animal" 
          className={styles.subInput} 
          onChange={(e) => setMeatDetails({...meatDetails, animalName:e.target.value})} 
        />
      </div>

      <div className={styles.subNameBox}>
        <img src="/images/chickenleg.png" className='w-10' />
        <input 
          type="text" 
          placeholder="Name of cuts" 
          className={styles.subInput} 
          onChange={(e) => setMeatDetails({...meatDetails, cutsName:e.target.value})} 
        />
      </div>

      <div className={styles.subNameBox}>
        <div className="w-full h-10 flex justify-between items-center max-w-sm bg-slate-300/[.9] border-white-900/75 rounded-md">
          <div className="flex justify-around w-10/12">
            <FileBase64 
              type="file" 
              multiple={false} 
              onDone={(el: any) => setMeatDetails({ ...meatDetails, image: `${el.base64}` })}  
            />
          </div>
        </div>
      </div>

      <div className={styles.subNameBox}>
        <img src="/images/weight.png" className='w-10' />
        <input 
          type="text" 
          placeholder="weight" 
          className={styles.subInput} 
          onChange={(e) => setMeatDetails({...meatDetails, weight:e.target.value})} 
        />
      </div>

      <div className={styles.subNameBox}>
        <AttachMoneyIcon color="primary" fontSize='large' />
        <input 
          type="text" 
          placeholder="price" 
          className={styles.subInput} 
          onChange={(e) => setMeatDetails({...meatDetails, price:e.target.value})} 
        />
      </div>

      <Button variant="contained" className={styles.smallBtn} onClick={handleClick}>Add</Button>
    </div>
  )
}

export default AddMeat