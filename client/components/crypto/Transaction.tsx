import { ethers } from "ethers"

export const transaction = (_address: string, _amount: number): string => {
  try {
    console.log("transaction successfull")
    return "success"
  } catch (error) {
    console.log(error)
    return "error"
  }
}