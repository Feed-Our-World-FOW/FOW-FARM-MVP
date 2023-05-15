import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'

function AddStockProduct() {

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    container: `w-11/12 mt-20 flex flex-col justify-center items-center`
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.navBox}>
        <Navbar 
          arrow={true} 
          addProductInStock={true}
          noCart={true}
        />
      </Box>
      <Box className={styles.container}>
        <span className='text-2sm font-semibold'>Status</span>
        <Box className="w-32 h-8 rounded-2xl bg-light-gray flex justify-center items-center mt-2">
          <span className='text-2sm font-bold text-dark-gray'>{`1. in stock`}</span>
        </Box>
        <Box className="w-10/12 border-1 rounded-xl h-8 ">

        </Box>
      </Box>
    </Box>
  )
}

export default AddStockProduct