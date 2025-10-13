/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.20",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      goerli: {
         url: "https://eth-goerli.g.alchemy.com/v2/YH_jk9vLcH5j_Zjz6pGBX", // You'd need to replace this with your actual Goerli URL
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}