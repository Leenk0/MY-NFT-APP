require('dotenv').config();
const { ethers } = require("ethers");

async function main() {
    const { API_URL, PRIVATE_KEY } = process.env;
    
    // Create provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    console.log("Wallet Address:", wallet.address);
    
    // Get balance
    const balance = await wallet.getBalance();
    console.log("Balance (wei):", balance.toString());
    console.log("Balance (ETH):", ethers.utils.formatEther(balance));
    
    // Check if balance is sufficient for deployment (estimate ~0.004 ETH needed)
    const minRequired = ethers.utils.parseEther("0.004");
    if (balance.lt(minRequired)) {
        console.log("\n❌ Insufficient balance for deployment");
        console.log("Required: ~0.004 ETH");
        console.log("Current:", ethers.utils.formatEther(balance), "ETH");
        console.log("\nPlease fund this address with Sepolia testnet ETH:");
        console.log("🔗 Sepolia Faucet: https://sepoliafaucet.com/");
    } else {
        console.log("\n✅ Sufficient balance for deployment");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });