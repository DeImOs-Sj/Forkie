require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 31337,

      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/yD4VXYMOtG8_WYYKPyCGbCHpRVJmLf0G",
      }
    }
  }
};
