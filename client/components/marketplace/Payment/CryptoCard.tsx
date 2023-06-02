import React, { useState } from 'react'
import { Box } from '@mui/material'
import { GetStaticProps } from 'next'
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import celoGroups from "@celo/rainbowkit-celo/lists"
import { Alfajores, Celo, Cannoli } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from 'wagmi'


export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 5,
    props: {
      setConfirm: null,
      setWalletAddress: null,
      setShowTerms: null, 
      setShowWallet: null, 
    }
  }
}

function CryptoCard(props: any) {
  const [connect, setConnect] = useState(false)
  const [walletAddress, setWalletAddress] = useState<any>('0x000......000')


  const handleContinue = () => {
    try {
      props.setConfirm({
        address: true,
        payment: true,
        debitCard: true,
        order: false,
        value: 3
      })
      props.setWalletAddress(walletAddress)
    } catch (error) {
      console.log(error)
    }
  }

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "undefined"

  const { chains, publicClient } = configureChains(
    [Alfajores, Celo, Cannoli],
    [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
    );

  const connectors = celoGroups({chains, projectId, appName: typeof document === "object" && document.title || "FOW FARM"})

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient: publicClient,
  });

  const { address } = useAccount()
  

  const handleCheck = async () => {
    props.setShowWallet(false)
    setConnect(prev => !prev)
    setWalletAddress(address)
  }

  const styles = {
    page: `w-full flex flex-col justify-center items-center`,
    container: `w-full flex flex-col justify-around items-center border-1 h-60 rounded-2xl border-light-gray mb-5`,
    box: `w-11/12 mb-5 flex flex-col border-1 border-light-gray justify-between items-center rounded-xl p-1 px-3`,
    btn1: `bg-dark-blue text-white w-8/12 rounded-3xl h-8 text-2sm font-semibold`,
    btn: `bg-green w-11/12 rounded-3xl h-8 text-2sm font-semibold mb-5 disabled:bg-light-gray`,
  }
  return (
    <Box className={styles.page}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode={true}>
          <Box className="flex flex-col justify-center items-center">
            <Box className={styles.container}>
              <Box className="w-10/12 flex">
                <span className='text-2sm font-normal'>
                  <b>Recomended</b> for fast, secure payments with a positive impact on the planet.
                </span>
              </Box>

              <Box className="w-full h-11/12 flex justify-center items-center">
                <ConnectButton />
              </Box>


            </Box>
            <Box className="w-9/12 mb-5 flex justify-between items-center">
              <input type="checkbox" name="" id="" onClick={handleCheck} />
              <span className='text-2sm font-semibold'>
                I agree to the <span className='underline' onClick={() => props.setShowTerms(true)}>terms of the payment</span>
              </span>
            </Box>
            <button className={styles.btn} onClick={handleContinue} disabled={!connect}>Continue</button>
          </Box>
        </RainbowKitProvider>
      </WagmiConfig>
    </Box>
  )
}

export default CryptoCard
