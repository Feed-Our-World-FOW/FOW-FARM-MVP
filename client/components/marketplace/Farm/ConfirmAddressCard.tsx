import React from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import Link from 'next/link'

function ConfirmAddressCard() {

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-md`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mb-5 mt-5`,
    aboutCard: `w-10/12 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-center items-start`,
    smallTxt: `font-semibold text-2sm`,
    upbtn: `text-2sm w-10/12 border-2 rounded-lg bg-pearl h-8 mt-5 ml-auto mr-auto p-1`,
    lowbtn: `text-2sm w-10/12 border-2 rounded-lg bg-white h-8 mt-5 mb-5 ml-auto mr-auto p-1 flex justify-center items-center`
  }

  return (
    <div className={styles.card}>
      <span className={styles.bigTxt}>Delivery Address</span>
      <div className={styles.aboutCard}>
        <div className="flex w-10/12 justify-around items-center">
          <RadioButtonCheckedIcon fontSize='small' />
          <div className="flex flex-col mt-5 ml-5">

            <span className='font-bold text-2sm'>RECENTLY USED</span>
            <span className='font-bold text-sm'>Ankush Banik</span>
            <span className={styles.smallTxt}>Ice cream factory</span>
            <span className={styles.smallTxt}>Ice cream factory</span>
            <span className={styles.smallTxt}>KOCH BEHAR, WEST BENGAL, 736165</span>
            <span className={styles.smallTxt}>India</span>
            <span className={styles.smallTxt}>Phone number: 8637838923</span>
          </div>
        </div>
        <button className={styles.upbtn}>{`Deliver to this address`}</button>
        {/* <Link href={'/Auth/AddLocation'}> */}
          <Link href={'/Auth/AddLocation'} className={styles.lowbtn}>{`Edit Address`}</Link>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default ConfirmAddressCard