require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// Load ABI and contract address
const contract = require("../artifacts/contracts/courseNFT.sol/courseNFT.json");
const contractAddress = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c";  // Must be on Sepolia!
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  try {
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("The hash of your transaction is:", receipt.transactionHash);
    console.log("Check Alchemy's Mempool to view the status of your transaction!");
  } catch (err) {
    console.error("Something went wrong when submitting your transaction:", err);
  }
}

const tokenURI = "ipfs://bafkreihueouopjocpoekqo5bvxyvoe2z7gjj5pmbnmny5nboyb7zp5nem4";

mintNFT(tokenURI);  
