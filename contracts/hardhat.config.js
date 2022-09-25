require("@nomiclabs/hardhat-truffle5");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    hardhat: {
      blockGasLimit: 100000000
    },
    // mumbai: {
    //   url: process.env.STAGING_INFURA_URL,
    //   accounts: [`0x${process.env.STAGING_PRIVATE_KEY}`],
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    // },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 21
  },
};