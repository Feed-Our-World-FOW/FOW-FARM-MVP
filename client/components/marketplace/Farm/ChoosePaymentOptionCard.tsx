import React from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import Link from 'next/link'


function ChoosePaymentOptionCard() {

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-md`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mt-10`,
    subCards: `w-10/12 h-16 rounded-xl p-2 bg-white drop-shadow-1.5lg p-2 flex justify-start items-center mb-5 active:drop-shadow-md`,

  }
  return (
    <div className={styles.card}>
       <span className={styles.bigTxt}>Select a payment method</span>
      <div className="w-full mt-10 flex flex-col justify-center items-center">
        <div className={styles.subCards}>
          <RadioButtonCheckedIcon className='ml-5' />
          <span className='font-semibold ml-5'>UPI/Netbanking</span>
        </div>
        <div className={styles.subCards}>
          <RadioButtonCheckedIcon className='ml-5' />
          <span className='font-semibold ml-5'>Pay with Debit/ATM Cards</span>
        </div>
        <div className={styles.subCards}>
          <RadioButtonCheckedIcon className='ml-5' />
          <span className='font-semibold ml-5'>Cash On Delivery/Pay On Delivery</span>
        </div>
        <div className={styles.subCards}>
          <RadioButtonCheckedIcon className='ml-5' />
          <span className='font-semibold ml-5'>Pay with crypto(CUSD)</span>
        </div>
      </div>
    </div>
  )
}

export default ChoosePaymentOptionCard