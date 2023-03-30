import React from 'react'
import Image from 'next/image'

function CartProductCard() {

  const styles = {
    card: `w-full h-48 flex justify-between items-center mt-5 max-w-md`,
    left: `h-full w-2/5 flex flex-col justify-around items-center`,
    right: `h-full w-3/6 flex flex-col justify-center items-start p-4`,
    imgBox: `w-28 h-28`,
    btnBox: `w-full h-6 rounded-md flex justify-around items-center ml-2`,
    btn: `w-2/6 bg-light-gray h-full rounded-md`,
    about: `text-2sm font-semibold`,
    price: `font-bold text-3sm`
  }

  return (
    <div className="w-screen max-w-md">
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.imgBox}>
            <Image 
              alt="rice"
              src={`/images/normalrice.png`}
              width={100}
              height={100}
              className='w-full h-full'
            />
          </div>
          <div className={styles.btnBox}>
            <button className={styles.btn}>-</button>
            <span className='font-bold'>{`2`}</span>
            <button className={styles.btn}>+</button>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.about}>{`The best quality long grain Rice with a High Quality( 5 kg pack )`}</p>
          <p className={styles.price}>{`$ 12.32`}</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard