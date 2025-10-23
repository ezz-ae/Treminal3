require('dotenv').config()
require('@nomicfoundation/hardhat-viem')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.24',
  networks: {
    basesepolia: {
      url: process.env.BASE_SEPOLIA_RPC,
      accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : []
    }
  }
}
