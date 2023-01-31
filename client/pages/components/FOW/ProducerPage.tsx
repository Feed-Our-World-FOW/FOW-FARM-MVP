import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Link from 'next/link';

function ProducerPage() {

  const styles = {
    fullPage: `w-screen h-screen flex flex-col justify-between items-center`,
    nav: `flex w-screen h-1/6 justify-around items-center bg-slate-300/[.9] border-white-900/75 max-w-screen-sm`,
    hamburger: `flex flex-col justify-center items-center`,
    text: `flex flex-col justify-around`,
    bellowNav: `w-full h-18 flex max-w-screen-sm`,
    mid: `w-full h-32 max-w-screen-sm`,
    farm: `w-11/12 h-1/6 flex justify-around items-center bg-slate-300/[.9] shadow-xl border-white-900/75 rounded-xl max-w-screen-sm`,
    opt: `w-1/3 flex justify-center items-center bg-slate-300/[.9] shadow-2xl border-white-900/75`,
    btn_txt: `text-xs p-1 sm:p-3`,
    btn: `bg-slate-300/[.9] border-white-900/75 h-full w-full`,
    round_bg: `w-24 h-24 rounded-full flex justify-center items-center`,
    round: `w-full h-full rounded-full flex justify-center items-center`,
    circle_bg: `w-24 h-full flex flex-col justify-center items-center`,
    left: `w-4/6 h-full flex flex-col justify-center items-start`,

  }


  return (
    <div className={styles.fullPage}>
      <div className={styles.nav}>
        <div className={styles.hamburger}>
          <div className="space-y-1">
            <span className="block w-7 h-1 bg-sky-600 rounded-md"></span>
            <span className="block w-7 h-1 bg-sky-600 rounded-md"></span>
            <span className="block w-4 h-1 bg-sky-600 rounded-md"></span>
          </div>
        </div>
        <div className={styles.text}>
          <span className='text-lg font-semibold text-slate-400'>All Local Producers</span>
          <span className='text-sm font-medium'>1234 ABC dr, Somewhere, CA</span>
        </div>
        <div className='w-8 flex flex-col justify-center items-end'>
          <SearchIcon color='primary' fontSize='large' />
        </div>
      </div>
      <div className={styles.bellowNav}>
        <div className={styles.opt}>
          <Link href="/components/FOW/ProducerPage">  
            <Button variant="outlined" className={styles.btn}>
              <span className={styles.btn_txt}>Home Delivery</span>
            </Button>
          </Link>
        </div>
        <div className={styles.opt}>
          <Link href="/components/FOW/ProducerPage">
            <Button variant="outlined" className={styles.btn}>
              <span className={styles.btn_txt}>Take Away</span>
            </Button>
          </Link>
        </div>
        <div className={styles.opt}>
          <Link href="/components/FOW/ProducerPage">
            <Button variant="outlined" className={styles.btn}>
              <span className={styles.btn_txt}>Curbside Pick up</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.mid}>
        <div className="w-full h-full flex justify-around items-start">
          <div className={styles.circle_bg}>
            <div className={styles.round_bg}>
              <div className={styles.round}>
                <img src="/images/all.png" className='w-full h-full rounded-full' />
              </div>
            </div>
            <span>All</span>
          </div>
          <div className={styles.circle_bg}>
            <div className={styles.round_bg}>
              <div className={styles.round}>
                <img src="/images/produce.png" className='w-full h-full rounded-full' />
              </div>
            </div>
            <span>Produce</span>
          </div>
          <div className={styles.circle_bg}>
            <div className={styles.round_bg}>
              <div className={styles.round}>
                <img src="/images/meat.png" className='w-full rounded-full' />
              </div>
            </div>
            <span>Meat</span>
          </div>
        </div>
      </div>

      <Link
        className={styles.farm} 
        href={{
        pathname: "/components/FOW/Farm/John Doe Farm",
        query: {img: "/images/farm1.png"},
      }}>
        <div className="">
          <div className={styles.round_bg}>
            <div className={styles.round}>
              <img src="/images/farm1.png" className='w-full rounded-full' />
            </div>
          </div>
        </div>
        <div className={styles.left}>
          <span className="font-semibold text-slate-700">John Doe Farm</span>
          <span className="text-xs font-semibold text-slate-400">Meat & produce</span>
          <span className="text-sm font-semibold text-slate-400">1223 Baker Street, Somewhere, CA 12345</span>
          <span className="text-sm font-semibold text-green-500">Order Online</span>
        </div>
      </Link>

      <Link 
        className={styles.farm}
        href={{
        pathname: "/components/FOW/Farm/Web3.0 Farm",
        query: {img: "/images/farm2.png"}
      }}>
        <div className="">
          <div className={styles.round_bg}>
            <div className={styles.round}>
              <img src="/images/farm2.png" className='w-full rounded-full' />
            </div>
          </div>
        </div>
        <div className={styles.left}>
          <span className="font-semibold text-slate-700">Web3.0 Farm</span>
          <span className="text-xs font-semibold text-slate-400">Meat & produce</span>
          <span className="text-sm font-semibold text-slate-400">1255 Baker Street, Somewhere, CA 54321</span>
          <span className="text-sm font-semibold text-green-500">Order Online</span>
        </div>
      </Link>

      <Link 
        className={styles.farm}
        href={{
        pathname: "/components/FOW/Farm/Farmtopia",
        query: {img: "/images/farm3.png"}
      }}>
        <div className="">
          <div className={styles.round_bg}>
            <div className={styles.round}>
              <img src="/images/farm3.png" className='w-full rounded-full' />
            </div>
          </div>
        </div>
        <div className={styles.left}>
          <span className="font-semibold text-slate-700">Farmtopia</span>
          <span className="text-xs font-semibold text-slate-400">Meat & produce</span>
          <span className="text-sm font-semibold text-slate-400">2155 Baking Street, Somewhere, CA 67890</span>
          <span className="text-sm font-semibold text-green-500">Order Online</span>
        </div>
      </Link>
    </div>
  )
}

export default ProducerPage