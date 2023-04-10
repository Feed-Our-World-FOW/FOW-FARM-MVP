import React from 'react'

function FinalItemCard() {

  const styles = {
    card: `w-full flex justify-center items-center mb-5`,
    midSubBox: `w-10/12 border-1 rounded-xl bg-white drop-shadow-1.5lg p-2 flex justify-between items-start `,

  }
  return (
    <div className={styles.card}>
      <div className={styles.midSubBox}>
        <div className="border-1 w-20 h-20"></div>
        <span className='text-2sm ml-5 w-8/12'>{`The best quality long grain Rice The best quality long grain Rice The best quality long grain Rice`}</span>
      </div>
    </div>
  )
}

export default FinalItemCard