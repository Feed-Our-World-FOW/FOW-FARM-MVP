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
import Navbar from '../../components/marketplace/navBar/Navbar'
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeliveryOption from '../../components/marketplace/delivery/DeliveryOption'

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
    page: `w-screen flex flex-col justify-center items-center max-w-md`,
    lowerNav: `w-full h-16 bg-white mt-20 mb-3 flex justify-center items-center`,
    navBox: `w-full px-4 z-50`,
    border: `w-10 border-1 border-dashed border-light-gray`,
    bg: `rounded-full w-8 h-8 flex justify-center items-center`,
    activeBg: `rounded-full bg-green w-8 h-8 flex justify-center items-center`,
  }
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <Box className={styles.page}>
        <Box className={styles.navBox}>
          <Navbar 
            // load={handleReload} 
            order={true}
            arrow={true}
          />
        </Box>

          {/* <Box sx={{ width: '100%', marginTop: '5px' }}>
            <Stepper activeStep={confirm.value} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box> */}


        <Box className={styles.lowerNav}>
          <Box className={styles.activeBg}>
            <WhereToVoteOutlinedIcon fontSize='small' />
          </Box>
          <Box className={styles.border}></Box>
          <Box className={confirm.value > 0 ? styles.activeBg : styles.bg}>
            <LocalShippingOutlinedIcon fontSize='small' />
          </Box>
          <Box className={styles.border}></Box>
          <Box className={confirm.value > 1 ? styles.activeBg : styles.bg}>
            <MonetizationOnOutlinedIcon fontSize='small' />
          </Box>
          <Box className={styles.border}></Box>
          <Box className={confirm.value > 2 ? styles.activeBg : styles.bg}>
            <DescriptionOutlinedIcon fontSize='small' />
          </Box>
        </Box>

        <Box className="w-full">
          {
            !confirm.address && !confirm.payment && !confirm.debitCard && !confirm.order ?
            <ConfirmAddressCard 
              setConfirm={setConfirm}
            />
            : confirm.address && !confirm.payment && !confirm.debitCard && !confirm.order ?
            <DeliveryOption 
              setConfirm={setConfirm}
            />
            : confirm.address && confirm.payment && !confirm.debitCard && !confirm.order ?
            // <DebitCard 
            //   setConfirm={setConfirm}
            // /> 
            <ChoosePaymentOptionCard 
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