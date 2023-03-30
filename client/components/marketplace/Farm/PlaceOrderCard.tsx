import React from 'react'
import FinalItemCard from './FinalItemCard'

function PlaceOrderCard() {

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-md`,
    bigTxt: `font-bold text-lg mr-auto ml-6 mb-5 mt-5`,
    bigSubBox: `w-10/12 border-1 h-44 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-start items-start`,
    smallSubBox: `w-10/12 border-1 mt-5 h-14 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-between items-start`,
    midSubBox: `w-10/12 border-1 mt-5 h-18 rounded-xl bg-white drop-shadow-1.5lg p-2 flex flex-col justify-between items-start`,
    container: `flex flex-col justify-start items-center w-full max-w-md`,
    subContainer: `w-full h-20 mt-3 flex flex-col justify-center items-center p-2`,
    subBox: `w-full flex justify-between items-center`,
    smallTxt: `text-2sm`,
    boldTxt: `text-3sm font-semibold`
  }

  return (
    <div className={styles.card}>
      <span className={styles.bigTxt}>Order now</span>
      <div className={styles.container}>
        <div className={styles.bigSubBox}>
          <span className='text-2sm'>{`Shopping to: Ankush Banik, Ice cream factory...`}</span>
          <div className="border-b-2 w-full mt-2"></div>
          <div className={styles.subContainer}>
            <div className={styles.subBox}>
              <span className={styles.smallTxt}>Items:</span>
              <span className={styles.smallTxt}>$ 2,499.00</span>
            </div>
            <div className={styles.subBox}>
              <span className={styles.smallTxt}>Delivery:</span>
              <span className={styles.smallTxt}>$ 40.00</span>
            </div>
            <div className={styles.subBox}>
              <span className={styles.smallTxt}>Total:</span>
              <span className={styles.smallTxt}>$ 2,539.00</span>
            </div>
            <div className={styles.subBox}>
              <span className={styles.smallTxt}>Promotion Applied:</span>
              <span className={styles.smallTxt}>-$40.00</span>
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="w-10/12 flex justify-between items-center">
              <span className={styles.boldTxt}>Order Total:</span>
              <span className={styles.boldTxt}>$2,499.00</span>
            </div>
          </div>
        </div>
        <div className={styles.smallSubBox}>
          <span className='font-semibold text-2sm'>Pay With</span>
          <span className='text-3sm font-bold'>{`Pay on delivery (Cash/Card)`}</span>
        </div>

        <div className={styles.midSubBox}>
          <span className='font-semibold text-2sm'>Deliver to</span>
          <span className='text-3sm font-bold'>{`Ankush Banik`}</span>
          <span className='font-semibold text-2sm'>{`Ice cream factory, Pundibari, KOCH BIHAR, WEST BENGAL...`}</span>
        </div>
        <div className="w-full mt-5 mb-10">
          <FinalItemCard />
          <FinalItemCard />
          <FinalItemCard />
        </div>

        <button className='border-1 w-10/12 bg-pearl text-3sm h-10 rounded-xl mb-10'>Place your order</button>
      </div>
    </div>
  )
}

export default PlaceOrderCard