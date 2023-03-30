import React from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';



function PaymentComplete() {

  const router = useRouter()

  const data = router.query

  const back = () => {
    window.location.replace("/components/FOW/ProducerPage")
  }

  const styles = {
    page: `w-screen h-screen flex flex-col justify-around items-center`,
    main: `w-10/12 h-4/6 flex flex-col justify-around items-center`,
    btn: `w-10/12 h-1/6 flex justify-center items-center max-w-screen-sm`,
    one: `h-36 w-36 rounded-full bg-slate-300/[.9] shadow-xl border-white-900/75`,
    two: `h-24 w-9/12 flex flex-col justify-around items-center`,
    three: `h-16 w-9/12 flex flex-col justify-around items-center`,
    button: `h-3/6 w-10/12 bg-sky-600`,
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.one}>
          <img src="/images/tick.png" className='w-full h-full' />
        </div>
        <div className={styles.two}>
          <span className='font-semibold text-3xl'>${data.finalAmount}</span>
          <span className='font-semibold text-gray-500'>Your payment is complete</span>
        </div>
        <div className={styles.three}>
          <span className='font-semibold text-xl'>Verification Code:</span>
          <span className='font-semibold text-gray-500 text-sm'>
            12udb42234yhjfdrf
          </span>
        </div>
      </div>
      <div className={styles.btn}>
        <Button variant="contained" className={styles.button} onClick={back}>Done</Button>
      </div>
    </div>
  )
}

export default PaymentComplete