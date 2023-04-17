import React, { useState, useEffect } from 'react'
import { getAllFarms, filterAllFarms, getAllProducts } from '../../components/marketplace/API'
import Navbar from '../../components/marketplace/navBar/Navbar'
import FarmCard from '../../components/marketplace/Farm/FarmCard'
import Image from 'next/image'
import Link from 'next/link'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import TopFarms from '../../components/marketplace/Farm/TopFarms'
import { AllFarmsInterface } from '../../interface/AllFarmsInterface'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import { Box, Container, Paper } from '@mui/material'
import BottomNav from '../../components/marketplace/navBar/BottomNav'
import FarmCardComponent from '../../components/marketplace/Farm/FarmCardComponent'
import AllFarmsCard from '../../components/marketplace/Farm/AllFarmsCard'
import FilterNav from '../../components/marketplace/navBar/FilterNav'
import SearchBar from '../../components/marketplace/navBar/SearchBar'
import AllProducts from '../../components/marketplace/product/AllProducts'
import { fetchToken } from '../../components/marketplace/token'

function AllFarms() {

  const [allFarms, setAllFarms] = useState([{}])
  const [allProducts, setAllProducts] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [showFarm, setShowFarm] = useState(true)
  let array = [1, 2, 3, 4, 5]

  const fetchAllFarms = async () => {
    try {
      const token = fetchToken()
      const x: AllFarmsInterface = await getAllFarms()
      const data = x.data.data.data

      const res: any = await getAllProducts(token)
      const productData = res.data.data.data
      
      setAllFarms(data)
      setAllProducts(productData)
      setLoading(false)
      console.log(productData)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeatFarm = async () => {
    try {
      const x: AllFarmsInterface = await filterAllFarms("meat")
      const data = x.data.data.data
      setAllFarms(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProduceFarm = async () => {
    try {
      const x: AllFarmsInterface = await filterAllFarms("produce")
      const data = x.data.data.data
      setAllFarms(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllFarms()
  }, [])

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    navBox2: `w-full z-50 top-0 mt-20 bg-white fixed`,
    navBox3: `w-full z-50 top-0 bg-white fixed`,

    bannerBox: `w-full h-full border-1 w-11/12 h-44 rounded-xl drop-shadow-lg bg-white flex justify-center items-center`,
    catagorieBox: `w-full h-20 flex items-center`,
    top5: `rounded-xl bg-white ml-5 w-full h-70`,
    catagorieSubImg: `w-16 h-16 ml-3 rounded-lg bg-white drop-shadow-lg active:drop-shadow-0.5lg`,
    // allFarms: `w-full grid grid-cols-2 gap-y-3 gap-x-2 mobile:ml-2 mobileL:ml-4 z-0`,
    filterBox: `border-2 w-full h-20 mb-2 flex justify-start items-center`,
    scrollingBox: `w-full flex flex-col justify-around items-center max-w-md relative z-0 mt-44`,
    allFarms: `w-full flex flex-col justify-center items-center`,
    farmCardBox: `w-full flex justify-center items-center relative z-0 mt-5 mb-10`,
    filter: `w-20 h-20 rounded-full border-2`
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.navBox}>
        <Navbar setShowFarm={setShowFarm} />
      </Box>
      <Box className={styles.navBox2}>
        <FilterNav setShowFarm={setShowFarm} />
      </Box>
      <Box className={styles.navBox3} sx={{marginTop: '124px'}}>
        <SearchBar />
      </Box>
      <Box className={styles.scrollingBox}>
      {
        showFarm ?
        <AllFarmsCard 
          allFarms={allFarms}
          setAllFarms={setAllFarms}
          loading={loading}
          setLoading={setLoading}
          array={array}
        /> :
        <AllProducts 
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          loading={loading}
          setLoading={setLoading}
          array={array}
        />
      }
      </Box>
      <Box className="w-full mt-10">
        <BottomNav />
      </Box>
    </Box>
  )
}

export default AllFarms

function showSlides(): () => void {
  throw new Error('Function not implemented.')
}
