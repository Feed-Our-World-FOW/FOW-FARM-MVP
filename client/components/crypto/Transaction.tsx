import ABI from "../../pages/utils/FOW.json"
import { createWalletClient, custom, parseEther } from 'viem'
import { celo, celoAlfajores } from 'viem/chains'

export const transaction = async (_address: string, _amount: number): Promise<string> => {

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

    // open the deeplink page 
    window.open(`https://metamask.app.link/send/pay-${_address}?value=${_amount}e18`)
    
    } else {
    
    // install metamask message
    console.log("install Metamask")
    
    }
  const client = createWalletClient({
    chain: celoAlfajores,
    transport: custom(window.ethereum)
  })

  const [address] = await client.getAddresses() 
  
  try {
    const contractAddress = "0x8C50E40E757ccaa02F4Da7bB3b9B5aE17AFf55df"

    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    const walletClient = createWalletClient({
      account,
      chain: celoAlfajores,
      transport: custom(window.ethereum)
    })

    let addr = _address.slice(2)

    const res = await walletClient.writeContract({
      address: `0x${addr}`,
      abi: ABI.abi,
      functionName: "send",
      account: address,
      args: [_address, 0],
      value: parseEther(`${_amount}`) as never
    })

    return res
  } catch (error) {
    console.log(error)
    return "error"
  }
}