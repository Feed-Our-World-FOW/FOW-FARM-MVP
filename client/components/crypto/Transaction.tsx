import { ethers } from "ethers"
import ABI from "../../pages/utils/FOW.json"

export const transaction = async (_address: string, _amount: number): Promise<string> => {
  try {
    const contractAddress = "0x8C50E40E757ccaa02F4Da7bB3b9B5aE17AFf55df"

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, ABI.abi as any, signer)

    const Amount = ethers.utils.parseEther(`${_amount}`)
    const response = await contract.send(_address, Amount, { value: Amount })

    return response.hash
  } catch (error) {
    console.log(error)
    return "error"
  }
}