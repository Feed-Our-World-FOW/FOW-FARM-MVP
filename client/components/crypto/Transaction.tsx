import { ethers } from "ethers"
import ABI from "../../pages/utils/FOW.json"

export const transaction = async (_address: string, _amount: number): Promise<string> => {
  try {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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