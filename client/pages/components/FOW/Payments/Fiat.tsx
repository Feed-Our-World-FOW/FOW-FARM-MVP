import React from 'react'
import PaymentHead from '../PaymentHead'

function Fiat() {
  const styles = {
    page: `w-screen h-screen border-4 `,

  }

  return (
    <div className={styles.page}>
      <PaymentHead />
      Fiat
    </div>
  )
}

export default Fiat