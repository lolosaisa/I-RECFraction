import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-ethers";

require('dotenv').config();
require("typechain/hardhat");

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // Removed invalid 'typechain' property as it is not part of HardhatUserConfig
  typechain: {
    outDir: "src/contracts/typechain",
    target: "ethers-v6",
  },
  networks: {
    // Ethereum Sepolia Testnet with updated Alchemy URL
    sepolia: {
      //url: `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // Alchemy URL
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, 
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      //accounts: [`0x${process.env.PRIVATE_KEY}`], // Private key of the deployer wallet
      gasPrice: 1000000000, // Optional: Set gas price
    },
    // Lisk Sepolia Testnet
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_KEY as string], // Private key of the deployer wallet
      gasPrice: 1000000000, // Optional: Set gas price
    },
  },
  // etherscan: {
  //   apiKey: {
  //     sepolia: process.env.ETHERSCAN_API_KEY as string, // Etherscan API key for Ethereum Sepolia
  //     "lisk-sepolia": "123", // Placeholder API key for Lisk Blockscout
  //   },
  //   // customchains
  // },
  paths: {
    sources: "./contracts",
    tests: "./test",
    // Removed invalid 'scripts' property
  },
};

export default config;