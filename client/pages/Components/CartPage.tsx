import React, { useState } from 'react'
import Navbar from '../../components/marketplace/Navbar'
import CartProductCard from '../../components/marketplace/Farm/CartProductCard'
import Image from 'next/image'

function CartPage() {

  const [empty, setEmpty] = useState(true)

  const styles = {
    page: `w-screen flex flex-col justify-center items-center max-w-md`,
    navBox: `w-full px-4 z-50`,
    totalBox: `mt-36 flex pt-5 pb-5 pl-3 w-11/12`,
    btnBox: `w-full flex justify-center items-center`,
    btn: `w-10/12 rounded-md p-1 bg-pearl font-semibold`
  }

  return (
    <div className={styles.page}>
      <div className={styles.navBox}>
        <Navbar />
      </div>
      {
        empty ?
        <div className='mt-44 flex flex-col justify-center items-center'>
          <Image 
            alt="rice"
            src={`/images/emptycart.png`}
            width={200}
            height={200}
            className='w-full h-full'
          />
          <span className='font-semibold text-lg'>Oops...</span>
          <span className='font-semibold text-lg'>Your FOW Cart is empty</span>
          <span className='font-semibold text-2sm'>Pick up where you left off</span>
        </div>
        :
        <>
          <div className={styles.totalBox}>
            <span className='mr-1 text-3sm'>Subtotal: </span> 
            <span className='font-bold'>$ 1,289</span>
          </div>
          <div className={styles.btnBox}>
            <button className={styles.btn}>{`Proceed to Buy ( 2 items)`}</button>
          </div>
          <div className="flex flex-col justify-center items-center w-screen mb-10">
            <CartProductCard />
            <div className="border-b-2 w-10/12 mt-10 mb-2 max-w-md"></div>
            <CartProductCard />
            <div className="border-b-2 w-10/12 mt-10 mb-2 max-w-md"></div>
            <CartProductCard />
            <div className="border-b-2 w-10/12 mt-10 mb-2 max-w-md"></div>
          </div>
        </>
      }
    </div>
  )
}

export default CartPage