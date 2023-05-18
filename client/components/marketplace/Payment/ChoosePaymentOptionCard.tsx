import React, { useState } from 'react'
import { Box } from '@mui/material'
import DebitCard from './DebitCard'
import CryptoCard from './CryptoCard'


function ChoosePaymentOptionCard(props: any) {
  const [upi, setUpi] = useState(false)
  const [debit, setDebit] = useState(false)
  const [crypto, setCrypto] = useState(true)

  const handleATM = async () => {
    try {
      props.setConfirm({
        address: true,
        payment: true,
        debitCard: false,
        order: false,
        value: 2
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetPayment = (type: string) => {
    if(type === "upi") {
      setUpi(true)
      setDebit(false)
      setCrypto(false)
      console.log("upi")
    }
    else if(type === "debit") {
      setUpi(false)
      setDebit(true)
      setCrypto(false)
      console.log("debit")
    }
    else if(type === "crypto") {
      setUpi(false)
      setDebit(false)
      setCrypto(true)
      console.log("crypto")
    }
  }

  const styles = {
    card: `w-screen flex flex-col justify-around items-center max-w-md`,
    btn: `border-1 rounded-3xl w-32 h-8 text-2sm font-bold mb-3 focus:bg-dark-gray focus:text-white disabled:text-light-gray`

  }
  return (
    <Box className={styles.card}>
      <Box className="w-full flex justify-center items-center">
        <span className="text-2sm font-normal">Payment</span>
      </Box>
      <Box className="w-full flex flex-col justify-between items-center mt-2">
        <button className={styles.btn} onClick={() => handleSetPayment("upi")} disabled>{`UPI / Netbanking`}</button>
        <button className={styles.btn} onClick={() => handleSetPayment("debit")}>{`Debit / ATM card`}</button>
        <button className={styles.btn} onClick={() => handleSetPayment("crypto")} autoFocus>{`Crypto(CUSD)`}</button>
      </Box>

      <Box className="w-11/12 mt-5">
        {
          crypto ?
          <CryptoCard 
            setConfirm={props.setConfirm}
          /> :
          <DebitCard 
            setConfirm={props.setConfirm}
          />
        }
      </Box>
    </Box>
  )
}

export default ChoosePaymentOptionCard