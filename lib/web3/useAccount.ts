"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const SEPOLIA_CHAIN_ID = "0xaa36a7"; // Hex for 11155111

export function useAccount() {
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const ethereum = window.ethereum;
        if (!ethereum) return;

        // 🔹 1. Switch wallet to Sepolia if not already there
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        });

        // 🔹 2. Create provider locked to Sepolia
        const p = new ethers.BrowserProvider(ethereum, "sepolia");
        setProvider(p);

        // 🔹 3. Request accounts
        const accounts = await p.send("eth_requestAccounts", []);
        setAccount(accounts[0] ?? null);

        // 🔹 4. Update account on change
        ethereum.on("accountsChanged", (acc: string[]) => {
          setAccount(acc[0] || null);
        });
      } catch (error) {
        console.error("Error initializing Sepolia provider:", error);
      }
    };

    init();
  }, []);

  return { provider, account };
}
