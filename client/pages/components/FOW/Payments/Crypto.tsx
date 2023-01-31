import React, { useState, useEffect } from 'react'
import PaymentHead from '../PaymentHead'
import Button from '@mui/material/Button';
import { ethers } from "ethers";
import ABI from '../../../utils/FOW.json';
// import ABI from '../../../../../hardhat/artifacts/contracts/FOW.sol/FOW.json';
import { useRouter } from 'next/router';
import Link from 'next/link';



function Crypto() {

  const deployAddress = '0xb6b8869F2717ee5F5bdFDd03bE7121D0dbc1E6bf'
  const [walletAddress, setWalletAddress] = useState('')
  const [donationAmount, setDonationAmount] = useState(0)
  const [click, setClick] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const getAddress = async () => {
    try {
      if(typeof window != 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        
        setWalletAddress(address)
      }
    } catch (error) {
      console.log("Wallet Address Error: ", error)
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  const router = useRouter()

  const data = router.query

  let UsdAmount = Number(data.finalAmount)

  let usdAmount = UsdAmount


  let celoAmount = usdAmount * 1.25

  const donationInCelo = donationAmount * 1.25

  const donate = () => {

    usdAmount = usdAmount + donationAmount
    celoAmount = donationInCelo + celoAmount

    console.log(usdAmount)
    setClick(true)

  }

  const cancellDonate = () => {
    setClick(false)
    setDonationAmount(0)
  }

  const sendCELO = async () => {
    try {
      if(typeof window != 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const abi = ABI.abi
        const contract = new ethers.Contract(deployAddress, abi, signer)
        const owner = await contract.owner()

        console.log("usd: ", !click ? usdAmount : Number(usdAmount) + donationAmount,
                     "celo: ", !click ? celoAmount : Number(celoAmount) + donationInCelo)

        setDisabled(true)

        await contract.send({ value: ethers.utils.parseEther(`${!click ? celoAmount : Number(celoAmount) + donationInCelo}`) })
        
        await window.location.replace(`/components/FOW/PaymentComplete?finalAmount=${!click ? usdAmount : Number(usdAmount) + donationAmount}`)
      }
    } catch (error) {
      console.log("send CELO error: ", error)
    }
  }

  const styles = {
    page: `w-screen min-h-screen flex flex-col justify-between items-center`,
    body: `w-full h-full flex flex-col justify-between items-center max-w-screen-sm mb-auto`,
    info: `w-11/12 h-max flex flex-col justify-between items-center bg-slate-300/[.9] shadow-xl border-white-900/75`,
    priority: `w-11/12 h-1/5 flex flex-col justify-around items-center bg-slate-300/[.9] shadow-xl border-white-900/75 rounded-md mt-10`,
    btn: `w-11/12 h-1/6 mt-5 mb-1.5`,
    addr: `w-10/12 h-10 bg-white rounded-xl p-2 flex justify-between items-center`,
    smallBox: `bg-white rounded-md w-11/12 h-10 ml-1 text-xs flex justify-center items-center font-semibold text-gray-500`,
    box: `rounded-xl w-20 h-20 bg-transparent flex items-center justify-center focus:border-2 focus:border-sky-700`,
    boxHold: `w-8/12 flex justify-between items-center max-w-11/12 p-1`,
    donateBox: `w-11/12 h-64 mt-2 mb-2 flex flex-col justify-between items-center`,
    donationPlace: `w-full h-28 flex justify-between items-center`,
    place: `w-20 h-full flex-col justify-center items-center`,
    placeImg: `w-full h-20 flex justify-center items-center focus:border-2 focus:border-sky-700 focus:rounded-xl`,
    donationbtn: `w-3/12 h-full rounded-3xl flex justify-center items-center text-white focus:bg-white focus:text-sky-600`,
  }

  return (
    <div className={styles.page}>
      <PaymentHead />
      <div className={styles.body}>
        <div className={styles.info}>
          <div className="flex flex-col justify-around items-start w-10/12 h-3/5">
            <div className={styles.addr}>
              <div className="rounded-full w-16 h-8">
                <img src="/images/Metamask.png" className='w-full h-full rounded-full'/>
              </div>
              <span className='font-semibold text-gray-500 text-sm p-2'>
                {walletAddress.slice(0, 5)}....{walletAddress.slice(38, 42)}
              </span>
              <div className="w-12 h-12">
                <img src="/images/qr-code.png" className='w-full h-full' />
              </div>
            </div>
            <div className={styles.boxHold}>
              <img src="/images/celo-logo.png" className='w-10 h-10'/>
              {/* <div className={styles.smallBox}>{celoAmount} CELO</div> */}
              <div className={styles.smallBox}>
                {!click ? celoAmount : Number(celoAmount) + donationInCelo} CELO
              </div>
            </div>

            <div className={styles.boxHold}>
              <img src="/images/cusd.png" className='w-10 h-10'/>
              <div className={styles.smallBox}>
                {!click ? usdAmount : Number(usdAmount) + donationAmount} CUSD
              </div>
            </div>

            <div className={styles.boxHold}>
              <span className='font-semibold text-gray-500'>USD</span>
              {/* <div className={styles.smallBox}>{usdAmount} USD</div> */}
              <div className={styles.smallBox}>
                {!click ? usdAmount : Number(usdAmount) + donationAmount} USD
              </div>
            </div>
          </div>

          <div className={styles.donateBox}>
            <div className="h-max w-10/12 mr-auto">
              <span className='font-semibold text-sm text-gray-500'>Donate Here</span>
            </div>
            <div className={styles.donationPlace}>
              <div className={styles.place}>
                <button className={styles.placeImg}>
                  <img src='/images/foodbank.png' className='w-full h-full' />
                </button>
                <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>Food Bank</span>
              </div>
              <div className={styles.place}>
                <button className={styles.placeImg}>
                  <img src='/images/meals.png' className='w-full h-full' />
                </button>
                <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>Meals on Wheels</span>
              </div>
              <div className={styles.place}>
                <button className={styles.placeImg}>
                  <img src='/images/underTheBridge.png' className='w-max h-max' />
                </button>
                <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>Under the Bridge</span>
              </div>
            </div>
            <div className="w-full h-12 rounded-3xl flex bg-sky-600 p-0.5 mb-1">
              <button className={styles.donationbtn} onClick={() => setDonationAmount(0.25)}>0.25$</button>
              <button className={styles.donationbtn} onClick={() => setDonationAmount(0.50)}>0.50$</button>
              <button className={styles.donationbtn} onClick={() => setDonationAmount(0.75)}>0.75$</button>
              <button className={styles.donationbtn} onClick={() => setDonationAmount(1)}>1.00$</button>
            </div>
            
            {!click ? <Button variant="contained" className='w-20 bg-sky-600' onClick={donate}><p className='normal-case'>Donate</p></Button> :
            <Button variant="contained" className='w-30' onClick={cancellDonate}><p className='normal-case text-xs'>Cancell Donate</p></Button>}

          </div>

          <div className="h-2/6 w-10/12 p-2">
            <div className="">
              <span className='font-semibold'>Label (Optional)</span>
            </div>
            <div className="w-10/12 bg-white rounded-xl h-10 p-2">
              <span className='font-semibold text-gray-500'>Meat and produce</span>
            </div>
          </div>
        </div>
        <div className={styles.priority}>
          <div className="mr-auto ml-5 font-semibold text-sm">
            <span className='p-1'>Priority</span>
          </div>
          <div className="w-11/12 h-5/6 flex justify-between items-center">
            <div className="flex flex-col w-1/4 h-full items-center justify-center">
              <button className={styles.box}>
                <img src="/images/cycle.png" className='w-full h-full' />
              </button>
              <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>I need it sometime this week</span>
            </div>
            <div className="flex flex-col w-1/4 h-full items-center justify-center">
              <button className={styles.box}>
              <img src="/images/bike.png" className='w-full h-full' />
              </button>
              <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>I need it some time today</span>
            </div>
            <div className="flex flex-col w-1/4 h-full items-center justify-center">
              <button className={styles.box}>
                <img src="/images/car.png" className='w-full h-full' />
              </button>
              <span className='font-semibold text-xs text-gray-500 flex justify-center items-center'>I need it now</span>
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <span className='font-semibold'>Fees: {!click ? usdAmount : Number(usdAmount) + donationAmount}$</span>
          <div className="w-full flex justify-center items-center">
            <Button variant="contained" disabled={disabled} className='p-2 w-11/12 focus:bg-sky-500 bg-sky-600' onClick={sendCELO}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crypto
