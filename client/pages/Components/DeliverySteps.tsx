import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import ConfirmAddressCard from '../../components/marketplace/Farm/ConfirmAddressCard'
import ChoosePaymentOptionCard from '../../components/marketplace/Payment/ChoosePaymentOptionCard'
import DebitCard from '../../components/marketplace/Payment/DebitCard'
import PlaceOrderCard from '../../components/marketplace/Farm/PlaceOrderCard'

function DeliverySteps() {

  const [confirm, setConfirm] = useState({
    address: false,
    payment: false,
    debitCard: false,
    order: false,
    value: 0
  })
  // const [num, setNum] = useState<number>(confirm.value)
  // const [, setConfirmAddress] = useState<boolean>(false)

  const steps = [
    'Address',
    'Delivery',
    'Payment',
    'Order'
  ];

  const styles = {
    page: `w-screen max-w-md`,
    upperNav: `w-full h-24 p-4 bg-pearl flex justify-between items-center`,
    lowerNav: `w-full h-16 bg-white drop-shadow-lg`,

  }
  return (
    <div className="w-screen flex justify-center items-center">
      <Box className={styles.page}>
        <Box className={styles.upperNav}>
          <Box className="">
            <ArrowBackIosIcon fontSize='small' />
            <span className='text-3sm font-semibold'>cancel</span>
          </Box>
          <AccountCircleIcon fontSize='large' className='mt-1' />
        </Box>

        <Box className={styles.lowerNav}>
          <Box sx={{ width: '100%', marginTop: '5px' }}>
            <Stepper activeStep={confirm.value} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>

        <Box className="w-full">
          {
            !confirm.address && !confirm.payment && !confirm.debitCard && !confirm.order ?
            <ConfirmAddressCard 
            setConfirm={setConfirm}
            />
            : confirm.address && !confirm.payment && !confirm.debitCard && !confirm.order ?
            <ChoosePaymentOptionCard 
              setConfirm={setConfirm}
            />
            : confirm.address && confirm.payment && !confirm.debitCard && !confirm.order ?
            <DebitCard 
              setConfirm={setConfirm}
            /> 
            :
            confirm.address && confirm.payment && confirm.debitCard && !confirm.order ?
            <PlaceOrderCard /> :
            <div className=""></div>
          }
        </Box>
      </Box>
    </div>
  )
}

export default DeliverySteps