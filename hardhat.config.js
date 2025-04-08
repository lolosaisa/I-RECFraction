require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const config = {
  solidity: "0.8.28", // Updated from 0.8.18 to match your version
  typechain: {
    outDir: "src/contracts/typechain",
    target: "ethers-v6",
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 1000000000, // Optional
    },
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_KEY],
      gasPrice: 1000000000, // Optional
    },
  },
  // Uncomment and configure if you want Etherscan verification
  // etherscan: {
  //   apiKey: {
  //     sepolia: process.env.ETHERSCAN_API_KEY,
  //     "lisk-sepolia": "123", // Placeholder
  //   },
  // },
  paths: {
    sources: "./contracts",
    tests: "./test",
  },
};

module.exports = config;