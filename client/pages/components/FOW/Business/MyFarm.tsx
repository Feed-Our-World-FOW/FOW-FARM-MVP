import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import jwt from 'jwt-decode';
import Meat from './product/Meat';
import Produce from './product/Produce';
import AddMeat from './addProduct/AddMeat';
import AddProduce from './addProduct/AddProduce';


function MyFarm() {
  const URL = `https://fow-api-production.up.railway.app/api/v1/farm`

  const [addmeat, setAddmeat] = useState(false)
  const [addproduce, setAddproduce] = useState(false)
  const [farmData, setFarmData] = useState(
    {
      createdAt: '',
      farmImage: [''],
      farmName: '',
      farmLocation: '',
      meat: false,
      produce: false
    }
  )
  const [allMeat, setAllMeat] = useState<any[]>([])
  const [allProduce, setAllProduce] = useState<any[]>([])

  const fetch = async () => {
    try {
      const token: any = JSON.parse(localStorage.getItem("Token") || '{}').value
      let decodedToken = {} as any
      decodedToken = jwt(token)

      console.log("token: ", token)

      const response = await axios.get(
        URL + "?creatorID=" + decodedToken.id,
        {
          headers: {"Authorization" : `Bearer ${token}`}
        }
      )
      console.log("response: ", response)
      const data = response.data.data.farm[0]
      console.log("data: ", data)
      setFarmData(
        {
          createdAt: data.createdAt,
          farmName: data.farmName,
          farmImage: data.farmImage,
          farmLocation: data.farmLocation,
          meat: data.meat,
          produce: data.produce
        }
      )
      const AllMeatData = await data?.meatDetails?.details
      const AllProduceData = await data?.produceDetails?.details

      setAllMeat(AllMeatData)
      setAllProduce(AllProduceData)

      console.log("AllMeatData: ", AllMeatData)
      console.log("AllProduceData: ", AllProduceData)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddMeat = async () => {
    try {
      setAddmeat(prev => !prev)
      setAddproduce(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddProduce = async () => {
    try {
      setAddproduce(prev => !prev)
      setAddmeat(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen flex flex-col justify-start items-center`,
    navBox: `w-full max-w-sm pt-7 pb-7 bg-slate-300/[.9] shadow-xl border-white-900/75 flex flex-col justify-around items-center max-w-sm`,
    imgBox: `w-28 h-28 rounded-full shadow-2xl`,
    smalltext: `text-xs font-semibold text-gray-600`,
    dot: `w-2 h-2 rounded-full border-4 border-blue-600`,
    farmName: `font-semibold text-gray-700`,
    locationText: `text-xs m-0 p-0.5`,
    productBox: `w-full max-w-sm mt-10 flex flex-col justify-start items-center`,
    meatBox: `w-11/12 mt-2 mb-2 rounded-md `,
    produceBox: `w-11/12 mt-2 mb-2 rounded-md`,
    addBox: `w-full max-w-sm mt-10 flex flex-col justify-center items-center border-2 border-black rounded-md`
  }
  
  return (
    <div className={styles.page}>
      {
        farmData.farmName !== '' ?
        <div>
          <div className={styles.navBox}>
            <div className={styles.imgBox}>
              <img src={`${farmData.farmImage[0]}`} className='w-full h-full rounded-full' />
            </div>
            <div className="w-11/12 mt-2 mb-3 flex justify-center items-center">
              <span className={styles.farmName}>{farmData.farmName}</span>
            </div>
            <div className="p-2 w-11/12 ml-auto flex justify-between mr-5 border-2 border-gray-900/75 rounded-md">
              <div className='w-9/12 border-2 border-gray-900/75 p-1 shadow-2xl rounded-md'>
                <span className='text-sm'>Location: </span>
                <span className={styles.locationText}>{farmData.farmLocation}</span>
              </div>
              <div className='w-3/12 mt-2'>
                {
                  farmData.meat &&
                  <div className='flex w-full justify-between items-center'>
                    <span className={styles.smalltext}>Meat</span>
                    <div className={styles.dot}> </div>
                  </div>
                }
                {
                  farmData.produce &&
                  <div className='flex w-full justify-between items-center'>
                    <span className={styles.smalltext}>Produce</span>
                    <div className={styles.dot}> </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-around w-screen max-w-sm">
            {
              farmData.meat && !farmData.produce ? 
              <Button variant="contained" onClick={handleAddMeat} className='bg-sky-600'>
                <span className='capitalize'>Add Meat</span>
              </Button> :
              !farmData.meat && farmData.produce ?
              <Button variant="contained" className='bg-sky-600'>
                <span className='capitalize' onClick={handleAddProduce}>Add Produce</span>
              </Button> :
              farmData.meat && farmData.produce ?
              <div className="mt-2 flex justify-around w-screen max-w-sm">
                <Button variant="contained" onClick={handleAddMeat} className='bg-sky-600'>
                  <span className='capitalize'>Add Meat</span>
                </Button>
                <Button variant="contained" className='bg-sky-600'>
                  <span className='capitalize' onClick={handleAddProduce}>Add Produce</span>
                </Button>
              </div> :
              <div></div>
            }
          </div>
          {
            farmData.meat &&
            addmeat ?
            <div className={styles.addBox}>
              <AddMeat />
            </div> :
            farmData.produce &&
            addproduce ?
            <div className={styles.addBox}>
              <AddProduce />
            </div> :
            <div></div>
          }

          <div className={styles.productBox}>
            <div className={styles.meatBox}>
              {
                allMeat && allMeat.map(meat => (
                  <Meat
                    key={meat._id}
                    image={meat.image}
                    cuts={meat.cuts}
                    name={meat.name}
                    price={meat.price}
                    weight={meat.weight}
                  />
                ))
              }
            </div>
            <div className={styles.produceBox}>
              {
                allProduce && allProduce.map(produce => (
                  <Produce
                    key={produce._id}
                    image={produce.image}
                    name={produce.name}
                    weight={produce.paksWeight}
                    price={produce.price}
                  />
                ))
              }
            </div>
          </div>
        </div>
        :
        <span className='font-bold text-lg'>You do not have any listed farm yet</span>
      }

    </div>
  )
}

export default MyFarm