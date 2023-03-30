import React from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function SignupPage() {


  const styles = {
    page: `w-screen flex justify-center items-center`,
    bgCover: `w-screen h-screen backdrop-blur-sm flex flex-col justify-around items-center`,
    profileImage: `h-20 w-28 flex flex-col items-center mt-10`,
    round: `w-20 h-20 rounded-full`,
    imgBox: `ml-14 block fixed mt-10`,
    signupBtn: `bg-pearl text-black w-full h-full border-4 border-black drop-shadow-2xl active:drop-shadow-xl`,
    inputBox: `border-2`,
    input: `focus:outline-none border-b-2 placeholder:font-semibold placeholder:text-black placeholder:text-center bg-transparent`,
    addBtnBox: `w-7/12 border-2 flex justify-center items-center rounded-xl`,
    btn: `w-full h-full border-b-4 rounded-xl active:border-b-2 text-2sm font-semibold p-1 bg-pearl`,
  }
  return (
    <div id="bg-image" className={styles.page}>
      <div className={styles.bgCover}>
        <div className={styles.profileImage}>
          <div className={styles.round}>
            <AccountCircleIcon className='w-full h-full' />
          </div>
          <div className={styles.imgBox}>
            <label htmlFor="">
              <AddAPhotoIcon color='primary' fontSize='large' />
              <input type="file" className='hidden' />
            </label>
          </div>
        </div>
        <div className={styles.inputBox}>
          <input type="text" placeholder='Name' className={styles.input} />
        </div>
        <div className="flex flex-col justify-around h-20 mt-5 w-48">
          <span className='font-semibold'>Account Type:</span>
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full justify-between">
              <div className="">
                <input type="radio" name='user' value="user" />
                <label htmlFor="user" className='font-semibold mr-2'>User</label>
              </div>
              <div className="">
                <input type="radio" name='business' value="business" />
                <label htmlFor="business" className='font-semibold mr-2'>Business</label>
              </div>
            </div>
          </div>
          
        </div>
        <Link href={'/Auth/AddLocation'} className={styles.addBtnBox}>
          <button className={styles.btn}>Add Location</button>
        </Link>
        <div className={styles.inputBox}>
          <input type="email" placeholder='Email' className={styles.input} />
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder='Password' className={styles.input} />
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder='Confirm Password' className={styles.input} />
        </div>
        <Link href={'/'} className="border-2 h-8 w-36">
          <Button variant="contained" className={styles.signupBtn}>Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignupPage