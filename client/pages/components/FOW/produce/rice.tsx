import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';


function Rice() {

  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  let totalCount = count1+count2+count3

  const data = {
    totalCount,
    count1,
    count2,
    count3,
    dish1: "Normal Rice",
    dish2: "Brown Rice",
    dish3: "Long grain Basmati Rice",
    price1: 0.28,
    price2: 0.32,
    price3: 0.42,
  }

  const router = useRouter()

  const styles = {
    page: `w-screen h-screen flex flex-col justify-between items-center`,
    nav: `w-full h-1/6 flex justify-between items-center bg-slate-300/[.9] shadow-xl border-white-900/75 max-w-screen-sm`,
    functionality: `w-11/12 h-4/6 rounded-xl flex flex-col justify-around items-center bg-slate-300/[.9] border-white-900/75 max-w-xl`,
    items: `w-10/12 flex justify-between items-center`,
    item: `font-semibold text-gray-500 text-sm pt-1.5`,
    products: `w-full h-3/6 flex justify-center items-center`,
    btn: `p-2 w-10/12 text-xs bg-sky-600`,
    small: ``,
    left: `w-9/12 h-full flex justify-around items-center ml-2`,
    box: `w-24 h-5/6 rounded-xl bg-transparent flex justify-center items-center`,
    right: `w-32 h-10 bg-white rounded-xl mr-2 flex justify-between items-center p-1`,
    bellow: `flex flex-col justify-between items-center mb-2 w-10/12 max-w-screen-sm`,
  }

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        {/* <Link href="/components/FOW/Farm/Farmtopia"> */}
          <div className="ml-2">
            <ArrowBackIcon onClick={() => router.back()} color='primary' fontSize='large' />
          </div>
        {/* </Link> */}
        <div className="w-20 h-20 rounded-full">
          <img src='/images/rice.png' className='w-full h-full rounded-full' />
        </div>
        <div className="">
          <span className='font-semibold'>Rice</span>
        </div>
        <div className="mr-2">
          <SearchIcon color='primary' fontSize='large' />
        </div>
      </div>
      <div className={styles.functionality}>
        <div className={styles.items}>
          <span className={styles.item}>Potato</span>
          <span className={styles.item}>Berries</span>
          <span className="font-semibold text-gray-500 border-b-4 border-sky-500 text-sm pt-1.5">Rice</span>
          <span className={styles.item}>Nuts</span>
        </div>
        <div className={styles.products}>
          <div className={styles.left}>
            <div className={styles.box}>
              <img src="/images/normalrice.png" className='w-full h-full' />
            </div>
            <div className="flex flex-col h-full justify-around items-start ml-1 w-20 max-w-36">
              <span className='text-sm font-semibold'>Normal Rice</span>
              <span className='font-semibold text-gray-500 text-xs'>250gm - 0.28$$</span>
              <span className='font-semibold text-gray-500 text-xs'>gm/kg</span>
            </div>
          </div>


          <div className={styles.right}>
            <RemoveIcon color='primary' fontSize='small' onClick={() => setCount1(prev => prev-0.25)} />
            <span className='text-xs'>{count1} {Number(count1) < 1 ? "gm" : "kg"}</span>
            <AddIcon color='primary' fontSize='small' onClick={() => setCount1(prev => prev+0.25)} />
          </div>
        </div>
        <div className={styles.products}>
        <div className={styles.left}>
          <div className={styles.box}>
            <img src="/images/brownrice.png" className='w-full h-full' />
          </div>
            <div className="flex flex-col h-full justify-around items-start ml-1 w-20 max-w-36">
              <span className='text-sm font-semibold'>Brown Rice</span>
              <span className='font-semibold text-gray-500 text-xs'>250gm - 0.32$$</span>
              <span className='font-semibold text-gray-500 text-xs'>gm/kg</span>
            </div>
          </div>
          <div className={styles.right}>
            <RemoveIcon color='primary' fontSize='small' onClick={() => setCount2(prev => prev-0.25)} />
            <span className='text-xs'>{count2} {Number(count2) < 1 ? "gm" : "kg"}</span>
            <AddIcon color='primary' fontSize='small' onClick={() => setCount2(prev => prev+0.25)} />
          </div>
        </div>
        <div className={styles.products}>
        <div className={styles.left}>
          <div className={styles.box}>
            <img src="/images/basmatirice.png" className='w-full h-full' />
          </div>
            <div className="flex flex-col h-full justify-around items-start ml-1 w-20 max-w-36">
              <span className='text-sm font-semibold'>Long grain Basmati Rice</span>
              <span className='font-semibold text-gray-500 text-xs'>250gm - 0.42$$</span>
              <span className='font-semibold text-gray-500 text-xs'>gm/kg</span>
            </div>
          </div>
          <div className={styles.right}>
            <RemoveIcon color='primary' fontSize='small' onClick={() => setCount3(prev => prev-0.25)} />
            <span className='text-xs'>{count3} {Number(count3) < 1 ? "gm" : "kg"}</span>
            <AddIcon color='primary' fontSize='small' onClick={() => setCount3(prev => prev+0.25)} />
          </div>
        </div>
      </div>
      <div className={styles.bellow}>
        <Button variant="contained" className={styles.btn}>
          <Link 
            href={{
              pathname: "/components/FOW/CheckOutVeggies",
              query: data,
          }}>
            <p className='text-xs'>Checkout ({totalCount}{totalCount < 1 ? <span className='lowercase'>gm</span> : <span className='lowercase'>kg</span>})</p>
          </Link>
        </Button>
        <div className="bg-slate-300/[.9] shadow-xl border-white-900/75 p-0.5 rounded-md mt-1">
          <span className='text-xs'>Minimum Order $$</span>
        </div>
      </div>
    </div>
  )
}

export default Rice