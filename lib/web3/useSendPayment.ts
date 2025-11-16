"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { PAYMENT_PROCESSOR_ABI, ERC20_ABI } from "@/constants/abi";
import { CONTRACT_ADDRESS, TOKEN_ADDRESS } from "@/constants/addresses";

const SEPOLIA_CHAIN_ID = "0xaa36a7";

export function useSendPayment(provider: any, account: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipient,
      amount,
      message,
    }: {
      recipient: string;
      amount: string;
      message: string;
    }) => {
      if (!provider || !account) throw new Error("Wallet not connected.");

      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (err: any) {
          throw new Error("Please switch your wallet to Sepolia.", err.message);
        }
      }

      const signer = await provider.getSigner();

      if (!CONTRACT_ADDRESS || !TOKEN_ADDRESS)
        throw new Error("Missing addresses.");

      const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
      const amt = ethers.parseUnits(amount, 18);

      const approveTx = await token.approve(CONTRACT_ADDRESS, amt);
      await approveTx.wait();

      const processor = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_PROCESSOR_ABI,
        signer
      );

      const tx = await processor.sendPayment(recipient, amt, message, {
        value: 0,
      });
      const receipt = await tx.wait(); // ✅ Wait for confirmation

      // ✅ Optional: wait a bit for blockchain state to settle
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return receipt;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.refetchQueries({ queryKey: ["transactions"] });
    },
  });
}
