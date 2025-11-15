// import { config as dotenvConfig } from "dotenv";
// import "@nomicfoundation/hardhat-toolbox";

// dotenvConfig({ path: ".env.local" });

// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
// const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

// /** @type import('hardhat/config').HardhatUserConfig */
// export default {
//   solidity: {
//     version: "0.8.19",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
//   networks: {
//     sepolia: {
//       url: SEPOLIA_RPC_URL,
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//       chainId: 11155111,
//     },
//   },
//   etherscan: {
//     apiKey: ETHERSCAN_API_KEY,
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts",
//   },
// };
