import { HardhatUserConfig } from "hardhat/config";
require('dotenv').config();
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY: any = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    },
    alfajoresDatahub: {
      url: "https://celo-alfajores--rpc.datahub.figment.io/apikey/<API KEY>",
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [PRIVATE_KEY],
      chainId: 42220,
    }
  }
};

export default config;

//0xB6fb62dbD053fBEA0eb14D854278a13f5570D0A4