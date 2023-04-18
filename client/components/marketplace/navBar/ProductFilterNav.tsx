import { Box } from '@mui/material'
import React from 'react'

function ProductFilterNav(props: any) {

  const handleFarm = () => {
    try {
      // props.setShowFarm(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleProduct = () => {
    try {
      // props.setShowFarm(false)
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    lowerNav: `flex w-full h-11 justify-around items-center bg-white max-w-screen-sm p-2`,
    btn: `w-5/12 h-8 rounded-3xl border-2 border-dark-gray text-dark-gray text-3sm font-bold focus:bg-dark-gray focus:text-white`
  }
  return (
    <Box className={styles.lowerNav}>
      <button className={styles.btn} autoFocus={true} onClick={handleFarm}>Stock</button>
      <button className={styles.btn} onClick={handleProduct}>On demand</button>
    </Box>
  )
}

export default ProductFilterNav