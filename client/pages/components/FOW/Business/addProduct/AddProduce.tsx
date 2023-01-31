import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import jwt from 'jwt-decode';
import axios from 'axios';
import FileBase64 from 'react-file-base64';


function AddProduce() {
  const URL = `https://fow-api-production.up.railway.app/api/v1/farm`

  const [produceDetails, setProduceDetails] = useState({
    name: '',
    image: '',
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
      const produce = response.data.data.farm[0]?.produceDetails?.details

      let add: any
      if(typeof produce === 'undefined') {
        add = {
          produceDetails: {
            details: [
              {
                name: produceDetails.name,
                image: produceDetails.image,
                paksWeight: produceDetails.weight,
                price: produceDetails.price
              }
            ]
          }
        }
      }else {
        add = {
          produceDetails: {
            details: [
              ...produce,
              {
                name: produceDetails.name,
                image: produceDetails.image,
                paksWeight: produceDetails.weight,
                price: produceDetails.price
              }
            ]
          }
        }
      }

      const patchURL = URL + "/" + farmId
      const patchRequest = await axios.patch(patchURL, add, {maxContentLength: Infinity})

      console.log("patchRequest: ", patchRequest)
      console.log(add)

      setProduceDetails({
        name: '',
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
    addProduce: `w-full flex flex-col justify-center items-center max-w-sm p-5`,
    subNameBox: `w-full flex justify-between bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md max-w-sm mb-10`,
    subInput: `focus:outline-none w-full bg-slate-300/[.0] border-white-900/75 ml-5 max-w-sm`,
    smallBtn: `w-10/12 bg-sky-600`
  }
  return (
    <div className={styles.addProduce}>
      <div className={styles.subNameBox}>
        <img src="/images/potato.png" className='w-10' />
        <input 
          type="text" 
          placeholder="Name of Vegitable" 
          className={styles.subInput} 
          onChange={(e) => setProduceDetails({ ...produceDetails, name: e.target.value })} 
        />
      </div>

      <div className={styles.subNameBox}>
        <div className="w-full h-10 flex justify-between items-center max-w-sm bg-slate-300/[.9] border-white-900/75 rounded-md">
          <div className="flex justify-around w-10/12">
            <FileBase64 
              type="file" 
              multiple={false} 
              onDone={(el: any) => setProduceDetails({ ...produceDetails, image: `${el.base64}` })}  
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
          onChange={(e) => setProduceDetails({ ...produceDetails, weight: e.target.value })} 
        />
      </div>

      <div className={styles.subNameBox}>
        <AttachMoneyIcon color="primary" fontSize='large' />
        <input 
          type="text" 
          placeholder="price" 
          className={styles.subInput} 
          onChange={(e) => setProduceDetails({ ...produceDetails, price: e.target.value })} 
        />
      </div>

      <Button variant="contained" className={styles.smallBtn} onClick={handleClick}>Add</Button>
    </div>
  )
}

export default AddProduce