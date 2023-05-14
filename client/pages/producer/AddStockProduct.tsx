import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'

function AddStockProduct() {

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
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
    </Box>
  )
}

export default AddStockProduct