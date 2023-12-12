require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/dc49adfb8c0841cd88e1d2db0083e35b",
      }
    }
  }
};
