import React from 'react'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';


function Option() {

  const styles = {
    page: `w-screen h-screen flex flex-col justify-between items-center`,
    logoBox: `w-32 h-32 rounded-full bg-slate-300/[.9] shadow-xl border-white-900/75 mt-10`,
    btnBox: `h-1/5 w-10/12 flex flex-col justify-around items-center bg-slate-300/[.9] shadow-xl border-white-900/75 rounded-xl mb-20 max-w-screen-sm`,
    aro: `mr-auto`,
  }

  return (
    <div className={styles.page}>
      <div className={styles.aro}>
        <Link href="/components/FOW/Additional">
          <ArrowBackIcon color="primary" fontSize='large' />
        </Link>
      </div>
      <div className={styles.logoBox}>
        <img src="/images/fow.png" className='w-full h-full rounded-full' />
      </div>
      <div className={styles.btnBox}>
        <div className="flex flex-col">
        <Link href="/components/FOW/Business/FarmUpload">
          <Button className='mb-5 bg-sky-600' variant="contained">
            <span className='text-xs'>FOW Business</span>
          </Button>
        </Link>
        </div>
        <Link href="/components/FOW/ProducerPage">
          <Button className='bg-sky-600' variant="contained">
            <span className='text-xs'>Continue with Market</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Option