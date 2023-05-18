import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { ethers } from 'ethers'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ConnectWallet from '../../crypto/ConnectWallet'

function CryptoCard(props: any) {
  const [connect, setConnect] = useState(false)
  const [walletAddress, setWalletAddress] = useState('0x000......000')
  const [balance, setBalance] = useState('0.00')

  const [trigger, setTrigger] = useState(false)

  // const fetch = async () => {
  //   try {
  //     if(typeof window !== 'undefined') {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum)
  //       const signer = provider.getSigner()
  //       console.log("Signer: ", await signer.getAddress())
  //       const address = await signer?.getAddress()
  //       const bal = await signer?.getBalance()
  //       const setBal = ethers.utils.formatEther(bal)
  //       setBalance(setBal.slice(0, 5))
  //       setWalletAddress(address)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleConnectWallet = async () => {
    try {
      setTrigger(prev => !prev)
      // if(typeof window !== 'undefined') {
      //   const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      //   // Alfajores -> 0xaef3
      //   // CELO (Mainnet) -> 0xa4ec
      //   // if(chainId != '0xaef3') {
      //   //   await window.ethereum.request({
      //   //     method: 'wallet_switchEthereumChain',
      //   //     params: [{ chainId: '0xaef3' }]
      //   //   })
      //   // }
      //   await window.ethereum.request({ method: 'eth_requestAccounts' })
      //   setConnect(true)
      //   fetch()
      // }
    } catch (error) {
      console.log(error)
    }
  }

  const handleContinue = () => {
    try {
      props.setConfirm({
        address: true,
        payment: true,
        debitCard: true,
        order: false,
        value: 3
      })
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    // window.ethereum.on('accountsChanged', () => {
    //   window.location.replace(location.pathname)
    // })
    // fetch()
  }, [])

  const styles = {
    page: `w-full flex flex-col justify-center items-center`,
    container: `w-full flex flex-col justify-around items-center border-1 h-60 rounded-2xl border-light-gray mb-5`,
    box: `w-11/12 mb-5 flex flex-col border-1 border-light-gray justify-between items-center rounded-xl p-1 px-3`,
    btn1: `bg-dark-blue text-white w-8/12 rounded-3xl h-8 text-2sm font-semibold`,
    btn: `bg-green w-11/12 rounded-3xl h-8 text-2sm font-semibold mb-5 disabled:bg-light-gray`,
  }
  return (
    <Box className={styles.page}>
        {
          trigger ?
          <Box className="w-full h-72 flex justify-center items-center">
            <ConnectWallet
              trigger={trigger}
              setTrigger={setTrigger}
              setConnect={setConnect}
              setWalletAddress={setWalletAddress}
              setBalance={setBalance}
              className="h-60"
            /> 
          </Box> :

          <Box className="flex flex-col justify-center items-center">

            <Box className={styles.container}>
      
              <Box className="w-10/12 flex">
                <span className='text-2sm font-normal'>
                  <b>Recomended</b> for fast, secure payments with a positive impact on the planet.
                </span>
              </Box>
      
              <Box className={styles.box}>
      
                <Box className="w-full flex justify-between items-center">
                  <Box>
                    <AccountBalanceWalletOutlinedIcon fontSize='small' />
                    <span className="text-2sm ml-2 font-normal">
                      {walletAddress.slice(0, 5)}......{walletAddress.slice(39, 42)}
                    </span>
                  </Box>
                  <span className="text-2sm font-normal">{balance} cUSD</span>
                </Box>
      
              </Box>
              <button className={styles.btn1} onClick={handleConnectWallet}>{connect ? `Connected` : `Connect Wallet`}</button>
            </Box>
            <Box className="w-9/12 mb-5 flex justify-between items-center">
              <input type="checkbox" name="" id="" />
              <span className='text-2sm font-semibold'>I agree to the terms of the payment</span>
            </Box>
            <button className={styles.btn} onClick={handleContinue} disabled={!connect}>Continue</button>
          </Box>
          
        }
    </Box>
  )
}

export default CryptoCard