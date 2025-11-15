// import ethers from "hardhat"
// import { config as dotenvConfig } from "dotenv";

// dotenvConfig({ path: ".env.local" });

// async function main() {
//   const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

//   if (!TOKEN_ADDRESS) {
//     throw new Error("TOKEN_ADDRESS not set in .env.local");
//   }

//   console.log("Deploying PaymentProcessor to Sepolia...");
//   console.log("Using token address:", TOKEN_ADDRESS);

//   const [deployer] = await ethers.getSigners();
//   console.log("Deploying with account:", deployer.address);

//   const balance = await ethers.provider.getBalance(deployer.address);
//   console.log("Account balance:", ethers.formatEther(balance), "ETH");

//   // Deploy the contract
//   const PaymentProcessor = await ethers.getContractFactory("PaymentProcessor");
//   const paymentProcessor = await PaymentProcessor.deploy(TOKEN_ADDRESS);

//   await paymentProcessor.waitForDeployment();

//   const contractAddress = await paymentProcessor.getAddress();
//   console.log("✅ PaymentProcessor deployed to:", contractAddress);

//   // Wait for a few block confirmations
//   console.log("Waiting for block confirmations...");
//   await paymentProcessor.deploymentTransaction().wait(5);

//   console.log("\n📝 Save this information:");
//   console.log("Contract Address:", contractAddress);
//   console.log("Token Address:", TOKEN_ADDRESS);
//   console.log("Network: Sepolia");

//   console.log("\n🔍 Verify your contract with:");
//   console.log(`npx hardhat verify --network sepolia ${contractAddress} ${TOKEN_ADDRESS}`);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
