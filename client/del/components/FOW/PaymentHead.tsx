import Link from 'next/link'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'


function PaymentHead() {

  const route = useRouter()

  const styles = {
    page: `w-screen h-36 flex flex-col items-center`,
    nav: `w-full h-full bg-slate-300/[.9] shadow-xl border-white-900/75 flex justify-around items-center max-w-screen-sm`,
    bottom: `w-11/12 bg-slate-300/[.9] flex justify-around items-center mt-4 max-w-xl`,

  }

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        {/* <Link href="/components/FOW/CheckOut"> */}
          <div className="mr-3">
            <ArrowBackIcon onClick={() => route.back()} color='primary' fontSize='large' />
          </div>
        {/* </Link> */}
        <div className="">
          <span>Payment</span>
        </div>
        <div className="ml-3">
          <SearchIcon color='primary' fontSize='large' />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="active:border-transparent active:border-b-sky-600 active:border-4 rounded-md">
          <span>Fiat</span>
        </div>
        <div className="active:border-transparent active:border-b-sky-600 active:border-4 rounded-md">
          <span>Crypto</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentHead