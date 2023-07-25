import {
	Alert,
	AlertColor,
	Backdrop,
	Box,
	CircularProgress,
	Paper,
	Snackbar,
} from '@mui/material';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import 'animate.css';
import { GetStaticProps } from 'next';

// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// // import { Web3Modal, Web3Button, useWeb3Modal  } from '@web3modal/react'
// import { Web3Button, useWeb3Modal  } from '@web3modal/react'
// import { configureChains, createConfig, WagmiConfig } from 'wagmi'
// import { celo, celoAlfajores } from 'wagmi/chains'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import celoGroups from '@celo/rainbowkit-celo/lists';
import { Alfajores, Celo, Cannoli } from '@celo/rainbowkit-celo/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setBalance: null,
			setWalletAddress: null,
			setShowWallet: null,
			setConnect: null,
			setTrigger: null,
		},
	};
};

function ConnectWallet(props: any) {
	const [open, setOpen] = useState(false);
	const [alertTxt, setAlertTxt] = useState('');
	const [alertStatus, setAlertStatus] = useState<AlertColor>(
		'success' || 'warning' || 'info' || 'error'
	);
	const [openBackdrop, setOpenBackdrop] = useState(false);

	// const chains = [celo, celoAlfajores]
	// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'undefined'

	// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
	// const wagmiConfig = createConfig({
	//   autoConnect: true,
	//   connectors: w3mConnectors({ projectId, version: 1, chains }),
	//   publicClient
	// })
	// const ethereumClient = new EthereumClient(wagmiConfig, chains)

	// const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'undefined' // get one at https://cloud.walletconnect.com/app

	// const { chains, publicClient } = configureChains(
	//   [Alfajores, Celo, Cannoli],
	//   [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
	// );
	// const connectors = celoGroups({chains, projectId, appName: typeof document === "object" && document.title || "FOW_FARM"})

	// const wagmiConfig = createConfig({
	//   autoConnect: true,
	//   connectors,
	//   publicClient: publicClient,
	// });

	// const providerOptions = {
	//   walletconnect: {
	//     package: WalletConnectProvider,
	//     options: {
	//       infuraId: process.env.NEXT_PUBLIC_INFURA_ID
	//     }
	//   },
	//   metamask: {
	//     package: ethers.providers.Web3Provider,
	//     options: {}
	//   },
	//   trust: {
	//     package: ethers.providers.Web3Provider,
	//     options: {}
	//   }
	// }

	const connectWallet = async () => {
		// try {
		//   let web3modal = new Web3Modal({
		//     cacheProvider: false,
		//     providerOptions
		//   })
		//   const web3ModalInstance = await web3modal.connect()
		//   const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
		//   // console.log(web3ModalProvider)
		// } catch (error) {
		//   console.log(error)
		// }
	};

	// const fetch = async () => {
	//   setOpenBackdrop(true)
	//   try {
	//     if(typeof window !== 'undefined') {
	//       const provider = new ethers.providers.Web3Provider(window.ethereum)
	//       console.log("provider: ", provider)
	//       const signer = provider.getSigner()
	//       console.log("signer: ", signer)
	//       // console.log("Signer: ", await signer.getAddress())
	//       const address = await signer?.getAddress()
	//       const bal = await signer?.getBalance()
	//       const setBal = ethers.utils.formatEther(bal)
	//       // console.log("Balance: ", await signer?.getBalance())
	//       props.setBalance(setBal.slice(0, 5))
	//       props.setWalletAddress(address)
	//     }
	//     setOpenBackdrop(false)
	//   } catch (error) {
	//     console.log(error)
	//     setOpenBackdrop(false)
	//   }
	// }

	// const handleConnectMetamask = async () => {
	//   try {
	//     props.setShowWallet(false)
	//     // console.log("Metamask")
	//     if(typeof window !== 'undefined') {
	//       const chainId = await window.ethereum.request({ method: 'eth_chainId' })
	//       // Alfajores -> 0xaef3
	//       // CELO (Mainnet) -> 0xa4ec
	//       if(chainId != '0xaef3') {
	//         await window.ethereum.request({
	//           method: 'wallet_switchEthereumChain',
	//           params: [{ chainId: '0xaef3' }]
	//         })
	//       }
	//       await window.ethereum.request({ method: 'eth_requestAccounts' })
	//       props.setConnect(true)
	//       props.setTrigger(false)
	//       fetch()
	//     }
	//   } catch (error: any) {
	//     console.log(error)
	//     setOpen(true)
	//     setAlertStatus("error")
	//     setAlertTxt(`You don't have Metamask installed into your browser`)
	//   }
	// }

	// const handleConnectTrust = async () => {
	//   try {
	//     // console.log("Trust")
	//     props.setShowWallet(false)
	//     connectWallet()
	//     props.setConnect(true)
	//     props.setTrigger(false)
	//     fetch()
	//   } catch (error) {
	//     console.log(error)
	//   }
	// }

	// const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
	//   if (reason === 'clickaway') {
	//     return;
	//   }

	//   setOpen(false);
	// };

	const styles = {
		paper: `w-11/12 h-full mb-3 rounded-2xl flex flex-col justify-center items-center animate__animated animate__zoomIn`,
		container: `w-full h-full flex flex-col justify-start items-center`,
		cancellBox: `w-full flex justify-end items-center mt-2`,
		walletBox: `mt-7 w-11/12 flex justify-start items-center`,
		semiboldTxt: `font-semibold text-2sm`,
		boldTxt: `font-bold text-2sm`,
	};

	return (
		<Paper className={styles.paper}>
			{/* <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode={true}>
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
        </Box> */}

			{/* <WagmiConfig config={wagmiConfig}>
          <Box className={styles.walletBox} onClick={handleConnectTrust}>
            <Image 
              alt="#"
              src={`/images/TWT.png`}
              width={30}
              height={30}
              className='ml-3'
            />
            <Box className="flex flex-col ml-3">
              <Web3Button />
            </Box>
          </Box>
        </WagmiConfig> */}

			{/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}

			{/* <Box className={styles.walletBox} onClick={handleConnectTrust}>
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

        <Box className="flex flex-col ml-3">
              <ConnectButton />
            </Box>


      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={open} autoHideDuration={4500} className='w-full mt-auto'>
        <Alert variant="filled" onClose={handleClose} severity={alertStatus} className='w-11/12'>
          {alertTxt}
        </Alert>
      </Snackbar>
      </RainbowKitProvider>
    </WagmiConfig> */}
			{/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
		</Paper>
	);
}

export default ConnectWallet;
