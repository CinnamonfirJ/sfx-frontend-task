// "use client";

// import React from "react";
// import { Card } from "@/components/ui/card";
// import { StatusBadge } from "@/components/StatusBadge";
// import { DataTable } from "@/components/DataTable";

// const transactionData = [
//   {
//     id: "TXN001",
//     date: "Mar 14, 2024",
//     customer: "Peter Japhet",
//     amount: "₦50,000",
//     status: "success",
//     type: "Payment",
//   },
//   {
//     id: "TXN002",
//     date: "Mar 14, 2024",
//     customer: "Leo Arome",
//     amount: "₦75,500",
//     status: "success",
//     type: "Deposit",
//   },
//   {
//     id: "TXN003",
//     date: "Mar 13, 2024",
//     customer: "James Robinson",
//     amount: "₦30,000",
//     status: "pending",
//     type: "Transfer",
//   },
//   {
//     id: "TXN004",
//     date: "Mar 13, 2024",
//     customer: "Lupita Jonah",
//     amount: "₦120,000",
//     status: "failed",
//     type: "Withdrawal",
//   },
//   {
//     id: "TXN005",
//     date: "Mar 12, 2024",
//     customer: "Sarah Mitchell",
//     amount: "₦45,250",
//     status: "success",
//     type: "Payment",
//   },
//   {
//     id: "TXN006",
//     date: "Mar 12, 2024",
//     customer: "Diana Wilson",
//     amount: "₦98,000",
//     status: "processing",
//     type: "Transfer",
//   },
// ];

// export default function TransactionsTable() {
//   const columns = [
//     { key: "id", label: "Transaction ID" },
//     { key: "date", label: "Date" },
//     { key: "customer", label: "Customer" },
//     { key: "amount", label: "Amount" },
//     { key: "type", label: "Type" },
//     {
//       key: "status",
//       label: "Status",
//       render: (status: string) => <StatusBadge status={status as any} />,
//     },
//   ];

//   return (
//     <Card className='p-6 border-gray-200'>
//       <DataTable
//         columns={columns}
//         data={transactionData}
//         searchPlaceholder='Search by ID, customer, or amount...'
//         itemsPerPage={8}
//         extraColumns={[
//           {
//             key: "verify",
//             label: "Verify",
//             render: (_, row) => (
//               <button
//                 className='bg-blue-500 px-3 py-1 rounded text-white text-sm'
//                 onClick={() => alert(`Verify transaction ${row.id}`)}
//               >
//                 Verify
//               </button>
//             ),
//           },
//         ]}
//       />
//     </Card>
//   );
// }

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "@/components/DataTable";

const PAYMENT_PROCESSOR_ABI = [
  "function sendPayment(address _recipient, uint256 _amount, string memory _message) external",
  "function getTransactionIdsForUser(address _user) public view returns (uint256[] memory)",
  "function transactions(uint256) public view returns (uint256 id, uint256 timestamp, address sender, address recipient, uint256 amount, string message)",
  "function transactionCount() public view returns (uint256)",
  "event PaymentSent(uint256 indexed id, address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp)",
];

const CONTRACT_ADDRESS = "0xYourContractAddressHere";
// const TOKEN_ADDRESS = "0xYourTokenAddressHere";

// const ERC20_ABI = [
//   "function approve(address spender, uint256 amount) external returns (bool)",
//   "function allowance(address owner, address spender) external view returns (uint256)",
//   "function balanceOf(address account) external view returns (uint256)",
// ];

interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: string;
  type: string;
  hash?: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Initialize Web3 connection
  useEffect(() => {
    initializeWeb3();
  }, []);

  const initializeWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        // Request account access
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0] || null);
        });
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  };

  const loadUserTransactions = useCallback(async () => {
    if (!provider || !account) return;

    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_PROCESSOR_ABI,
        provider
      );

      // Get transaction IDs for the user
      const txIds = await contract.getTransactionIdsForUser(account);

      // Fetch details for each transaction
      const txPromises = txIds.map(async (id: bigint) => {
        const tx = await contract.transactions(id);
        return {
          id: `TXN${id.toString().padStart(3, "0")}`,
          date: new Date(Number(tx.timestamp) * 1000).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
          customer: tx.sender === account ? tx.recipient : tx.sender,
          amount: `₦${ethers.formatUnits(tx.amount, 18)}`, // Adjust decimals as needed
          status: "success", // Blockchain transactions are always successful once confirmed
          type: tx.sender === account ? "Sent" : "Received",
          hash: id.toString(),
        };
      });

      const loadedTxs = await Promise.all(txPromises);
      setTransactions(loadedTxs);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [account, provider]);

  // Load transactions when account changes
  useEffect(() => {
    if (account && provider) {
      loadUserTransactions();
    }
  }, [account, provider, loadUserTransactions]);

  const verifyTransaction = async (txId: string) => {
    if (!provider) return;

    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_PROCESSOR_ABI,
        provider
      );

      // Extract numeric ID from TXN format
      const numericId = parseInt(txId.replace("TXN", ""));
      const tx = await contract.transactions(numericId);

      alert(`
        Transaction Verified!
        ID: ${tx.id.toString()}
        From: ${tx.sender}
        To: ${tx.recipient}
        Amount: ${ethers.formatUnits(tx.amount, 18)} tokens
        Message: ${tx.message}
        Timestamp: ${new Date(Number(tx.timestamp) * 1000).toLocaleString()}
      `);
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Failed to verify transaction");
    }
  };

  // const sendPayment = async (
  //   recipient: string,
  //   amount: string,
  //   message: string
  // ) => {
  //   if (!provider || !account) {
  //     alert("Please connect your wallet first!");
  //     return;
  //   }

  //   try {
  //     const signer = await provider.getSigner();

  //     // First, approve the token transfer
  //     const tokenContract = new ethers.Contract(
  //       TOKEN_ADDRESS,
  //       ERC20_ABI,
  //       signer
  //     );
  //     const amountInWei = ethers.parseUnits(amount, 18); // Adjust decimals

  //     console.log("Approving tokens...");
  //     const approveTx = await tokenContract.approve(
  //       CONTRACT_ADDRESS,
  //       amountInWei
  //     );
  //     await approveTx.wait();

  //     // Then send the payment
  //     const contract = new ethers.Contract(
  //       CONTRACT_ADDRESS,
  //       PAYMENT_PROCESSOR_ABI,
  //       signer
  //     );

  //     console.log("Sending payment...");
  //     const tx = await contract.sendPayment(recipient, amountInWei, message);
  //     await tx.wait();

  //     alert("Payment sent successfully!");

  //     // Reload transactions
  //     await loadUserTransactions();
  //   } catch (error: any) {
  //     console.error("Payment failed:", error);
  //     alert(`Payment failed: ${error.message}`);
  //   }
  // };

  const transactionData = [
    {
      id: "TXN001",
      date: "Mar 14, 2024",
      customer: "Peter Japhet",
      amount: "₦50,000",
      status: "success",
      type: "Payment",
    },
    {
      id: "TXN002",
      date: "Mar 14, 2024",
      customer: "Leo Arome",
      amount: "₦75,500",
      status: "success",
      type: "Deposit",
    },
    {
      id: "TXN003",
      date: "Mar 13, 2024",
      customer: "James Robinson",
      amount: "₦30,000",
      status: "pending",
      type: "Transfer",
    },
    {
      id: "TXN004",
      date: "Mar 13, 2024",
      customer: "Lupita Jonah",
      amount: "₦120,000",
      status: "failed",
      type: "Withdrawal",
    },
    {
      id: "TXN005",
      date: "Mar 12, 2024",
      customer: "Sarah Mitchell",
      amount: "₦45,250",
      status: "success",
      type: "Payment",
    },
    {
      id: "TXN006",
      date: "Mar 12, 2024",
      customer: "Diana Wilson",
      amount: "₦98,000",
      status: "processing",
      type: "Transfer",
    },
  ];

  const columns = [
    { key: "id", label: "Transaction ID" },
    { key: "date", label: "Date" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (status: string) => <StatusBadge status={status as any} />,
    },
  ];

  return (
    <div className='space-y-4'>
      {/* Wallet Connection Status */}
      <Card className='p-4 border-gray-200'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='font-semibold'>Wallet Status</h3>
            <p className='text-gray-600 text-sm'>
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Not Connected"}
            </p>
          </div>
          {!account && (
            <button
              onClick={initializeWeb3}
              className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm'
            >
              Connect Wallet
            </button>
          )}
          {account && (
            <button
              onClick={loadUserTransactions}
              className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white text-sm'
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className='p-6 border-gray-200'>
        <DataTable
          columns={columns}
          data={account ? transactions : transactionData}
          searchPlaceholder='Search by ID, customer, or amount...'
          itemsPerPage={8}
          extraColumns={[
            {
              key: "verify",
              label: "Verify",
              render: (_, row) => (
                <button
                  className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white text-sm'
                  onClick={() => verifyTransaction(row.id)}
                >
                  Verify
                </button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
