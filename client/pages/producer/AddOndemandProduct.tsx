import { Box, IconButton } from '@mui/material'
import React from 'react'
import Navbar from '../../components/marketplace/navBar/Navbar'
import BottomNav from '../../components/marketplace/navBar/BottomNav';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';


function AddOndemandProduct() {

  const styles = {
    page: `w-screen flex flex-col justify-around items-center max-w-md`,
    navBox: `w-full px-4 z-50`,


    container: `w-11/12 mt-16 flex flex-col justify-center items-center mb-10`,
    subContainer: `w-full flex flex-col justify-center items-center mt-5`,
    verticalSubContainer: `w-11/12 flex justify-between items-center mt-5`,
    smallSubBox: `w-5/12 flex flex-col justify-start items-center`,
    topOption: `w-32 h-8 rounded-2xl bg-light-gray flex justify-center items-center mt-2`,
    txtBox: `w-11/12 flex justify-start items-center`,
    boldTxt: `text-2sm font-bold`,
    inputBox: `w-11/12 border-1 border-light-gray rounded-xl h-8 mt-1 flex justify-end items-center`,
    sminputBox: `w-full border-1 border-light-gray rounded-xl h-8 mt-1 flex justify-end items-center`,
    input: `w-full h-full rounded-xl px-3`,
    button: `w-11/12 rounded-2xl bg-green flex justify-center items-center text-2sm font-semibold h-8 mt-10`,
    bottomBox: `w-full flex justify-center items-center mt-10`,
  }

  return (
    <Box className={styles.page}>
      <Box className={styles.navBox}>
        <Navbar 
          arrow={true} 
          addProductOndemand={true}
          noCart={true}
        />
      </Box>




      <Box className={styles.container}>
        <Box className={styles.subContainer}>
          <span className='text-2sm font-semibold'>Status</span>
          <Box className={styles.topOption}>
            <span className='text-2sm font-bold text-dark-gray'>{`2. on demand`}</span>
          </Box>
        </Box>

        <Box className={styles.subContainer}>
          <Box className={styles.txtBox}>
            <span className={styles.boldTxt}>Product - Food groups</span>
          </Box>
          <Box className={styles.inputBox}>
            <input type="text" className={styles.input} />
          </Box>
        </Box>

        <Box className={styles.subContainer}>
          <Box className={styles.txtBox}>
            <span className={styles.boldTxt}>Product name</span>
          </Box>
          <Box className={styles.inputBox}>
            <input type="text" className={styles.input} />
          </Box>
        </Box>


        <Box className={styles.subContainer}>
          <Box className={styles.txtBox}>
            <span className={styles.boldTxt}>Image</span>
          </Box>
          <Box className={styles.inputBox}>
            <IconButton className='text-black' aria-label="upload picture" component="label">
              <input 
                hidden accept="image/*" 
                type="file" 
                // onChange={handleImgChange}
              />
            <CameraAltOutlinedIcon className='mr-2' />
            </IconButton>
          </Box>
        </Box>

        <Box className={styles.verticalSubContainer}>
          <Box className={styles.smallSubBox}>
            <Box className={styles.txtBox}>
              <span className={styles.boldTxt}>Capicity / month</span>
            </Box>
            <Box className={styles.sminputBox}>
              <input type="number" className={styles.input} />
            </Box>
          </Box>
          <Box className={styles.smallSubBox}>
            <Box className={styles.txtBox}>
              <span className={styles.boldTxt}>Unit</span>
            </Box>
            <Box className={styles.sminputBox}>
              <select name="unit" className={styles.input}>
                <option value={"lb"}>lb</option>
                <option value={"kg"}>kg</option>
                <option value={"gm"}>gm</option>
              </select>
            </Box>
          </Box>
        </Box>

        <Box className={styles.subContainer}>
          <Box className={styles.txtBox}>
            <span className={styles.boldTxt}>{`Price $ / unit`}</span>
          </Box>
          <Box className={styles.inputBox}>
            <input type="number" className={styles.input} />
          </Box>
        </Box>

        <Box className={styles.verticalSubContainer}>
          <Box className={styles.smallSubBox}>
            <Box className={styles.txtBox}>
              <span className={styles.boldTxt}>Organic</span>
            </Box>
            <Box className={styles.sminputBox}>
              {/* <input type="number" className={styles.input} /> */}
              <select name="organic" className={styles.input}>
                <option value={"yes"}>yes</option>
                <option value={"no"}>no</option>
              </select>
            </Box>
          </Box>
          
        </Box>

        <button className={styles.button}>Add</button>

      </Box>





      <Box className={styles.bottomBox}>
        <BottomNav 
          produce={true}
        />
      </Box>
    </Box>
  )
}

export default AddOndemandProduct

