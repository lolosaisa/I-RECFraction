require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");
require("@nomicfoundation/hardhat-ethers"); // Still needed for ethers compatibility
require("dotenv").config();

console.log("Private Key:", process.env.PRIVATE_KEY);
console.log("Private Key Length:", process.env.PRIVATE_KEY?.length);
console.log("Wallet Key:", process.env.WALLET_KEY);

const config = {
  solidity: "0.8.28",
  typechain: {
    outDir: "src/contracts/typechain",
    target: "ethers-v6",
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
   // "lisk-sepolia": {
      //url: "https://rpc.sepolia-api.lisk.com",
      //accounts: [process.env.WALLET_KEY],
      //gasPrice: 1000000000,
   // },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
  },
};

module.exports = config;