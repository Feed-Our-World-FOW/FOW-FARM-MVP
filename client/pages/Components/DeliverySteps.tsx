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

  const [num, setNum] = useState(4)

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
      <div className={styles.page}>
        <div className={styles.upperNav}>
          <div className="">
            <ArrowBackIosIcon fontSize='small' />
            <span className='text-3sm font-semibold'>cancel</span>
          </div>
          <AccountCircleIcon fontSize='large' className='mt-1' />
        </div>

        <div className={styles.lowerNav}>
          <Box sx={{ width: '100%', marginTop: '5px' }}>
            <Stepper activeStep={num} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>

        <div className="w-full">
          {/* <ConfirmAddressCard /> */}
          {/* <ChoosePaymentOptionCard /> */}
          {/* <DebitCard /> */}
          <PlaceOrderCard />
        </div>
      </div>
    </div>
  )
}

export default DeliverySteps