"use client";

import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { PAYMENT_PROCESSOR_ABI } from "@/constants/abi";
import { CONTRACT_ADDRESS } from "@/constants/addresses";

interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: string;
  type: string;
}

export function useTransactions(
  provider: ethers.BrowserProvider | null,
  account: string | null
) {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", account],
    queryFn: async () => {
      if (!provider || !account) return [];

      if (!CONTRACT_ADDRESS) throw new Error("Missing contract address.");

      try {
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          PAYMENT_PROCESSOR_ABI,
          signer
        );

        // Fetch transaction IDs for the account
        const idsRaw: readonly ethers.BigNumberish[] =
          await contract.getTransactionIdsForUser(account);

        if (!idsRaw || idsRaw.length === 0) return [];

        const txs = await Promise.all(
          idsRaw.map(async (idRaw) => {
            const id = Number(idRaw); // safe conversion
            const tx = await contract.transactions(id);

            const timestamp = Number(tx.timestamp);
            const sender = tx.sender.toLowerCase();
            const recipient = tx.recipient.toLowerCase();
            const amount = ethers.formatUnits(tx.amount.toString(), 18);

            return {
              id: `TXN${id.toString().padStart(3, "0")}`,
              date: new Date(timestamp * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              customer: sender === account.toLowerCase() ? recipient : sender,
              amount: `₦${amount}`,
              status: "success",
              type: sender === account.toLowerCase() ? "Sent" : "Received",
            };
          })
        );

        // Sort newest first
        return txs.sort((a, b) => b.id.localeCompare(a.id));
      } catch (err) {
        console.error("Failed to load transactions:", err);
        return [];
      }
    },
    enabled: !!provider && !!account,
    staleTime: 1000 * 60, // cache for 1 minute
  });
}
