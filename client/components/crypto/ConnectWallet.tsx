import { Alert, AlertColor, Box, Paper, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { ethers } from 'ethers';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from "web3modal"
import 'animate.css'
// import { Web3Button } from '@web3modal/react';


function ConnectWallet(props: any) {
  const [open, setOpen] = useState(false)
  const [alertTxt, setAlertTxt] = useState('')
  const [alertStatus, setAlertStatus] = useState<AlertColor>("success" || "warning" || "info" || "error")

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID
      }
    },
    metamask: {
      package: ethers.providers.Web3Provider,
      options: {}
    },
    trust: {
      package: ethers.providers.Web3Provider,
      options: {}
    }
  }

  const connectWallet = async () => {
    try {
      let web3modal = new Web3Modal({
        cacheProvider: false,
        providerOptions
      })
      const web3ModalInstance = await web3modal.connect()
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
      // console.log(web3ModalProvider)
    } catch (error) {
      console.log(error)
    }
  }

  const fetch = async () => {
    try {
      if(typeof window !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        // console.log("Signer: ", await signer.getAddress())
        const address = await signer?.getAddress()
        const bal = await signer?.getBalance()
        const setBal = ethers.utils.formatEther(bal)
        // console.log("Balance: ", await signer?.getBalance())
        props.setBalance(setBal.slice(0, 5))
        props.setWalletAddress(address)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleConnectMetamask = async () => {
    try {
      props.setShowWallet(false)
      // console.log("Metamask")
      if(typeof window !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        // Alfajores -> 0xaef3
        // CELO (Mainnet) -> 0xa4ec
        // if(chainId != '0xaef3') {
        //   await window.ethereum.request({
        //     method: 'wallet_switchEthereumChain',
        //     params: [{ chainId: '0xaef3' }]
        //   })
        // }
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        props.setConnect(true)
        props.setTrigger(false)
        fetch()
      }
    } catch (error: any) {
      console.log(error)
      setOpen(true)
      setAlertStatus("error")
      setAlertTxt(`You don't have Metamask installed into your browser`)
    }
  }

  const handleConnectTrust = async () => {
    try {
      // console.log("Trust")
      props.setShowWallet(false)
      connectWallet()
      props.setConnect(true)
      props.setTrigger(false)
      fetch()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const styles = {
    paper: `w-11/12 h-full mb-3 rounded-2xl flex flex-col justify-center items-center animate__animated animate__zoomIn`,
    container: `w-full h-full flex flex-col justify-start items-center`,
    cancellBox: `w-full flex justify-end items-center mt-2`,
    walletBox: `mt-7 w-11/12 flex justify-start items-center`,
    semiboldTxt: `font-semibold text-2sm`,
    boldTxt: `font-bold text-2sm`,
  }

  return (
    <Paper className={styles.paper}>
      <Box className={styles.container}>
        <Box className={styles.cancellBox}>
          <ClearIcon 
            onClick={() => {props.setTrigger(false);props.setShowWallet(false)}}
            fontSize='small'
            className='mr-2'
          />
        </Box>
        <span className='text-3sm font-bold'>Search for a wallet</span>
        <Box className={styles.walletBox} onClick={handleConnectMetamask}>
          <Image 
            alt="#"
            src={`/images/Metamask.png`}
            width={50}
            height={50}
          />
          <Box className="flex flex-col">
            <span className={styles.boldTxt}>MetaMask</span>
            <span className={styles.semiboldTxt}>Open MetaMask Mobile App</span>
          </Box>
        </Box>

        <Box className={styles.walletBox} onClick={handleConnectTrust}>
          <Image 
            alt="#"
            src={`/images/TWT.png`}
            width={30}
            height={30}
            className='ml-3'
          />
          <Box className="flex flex-col ml-3">
            <span className={styles.boldTxt}>Trust Wallet</span>
            <span className={styles.semiboldTxt}>Open Trust Wallet Mobile App</span>
          </Box>
        </Box>
      </Box>

      <Snackbar open={open} autoHideDuration={4500} className='w-full mt-auto'>
        <Alert variant="filled" onClose={handleClose} severity={alertStatus} className='w-11/12'>
          {alertTxt}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default ConnectWallet