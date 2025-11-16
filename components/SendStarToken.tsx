"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { ethers } from "ethers";
import { useSendPayment } from "@/lib/web3/useSendPayment";

type ErrorType = "wallet" | "address" | "amount" | "transaction" | null;

export default function SendTransaction() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [gasFee, setGasFee] = useState<string | null>(null);

  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [txHash, setTxHash] = useState("");

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const { mutate: sendPayment, isPending: loading } = useSendPayment(
    provider,
    account
  );

  const setError = (type: ErrorType, message: string) => {
    setErrorType(type);
    setErrorMessage(message);
    setSuccessMessage("");
    setTxHash("");
  };

  const loadWalletInfo = async () => {
    try {
      if (!window.ethereum) return;

      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);

      const signer = await prov.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);

      const rawBalance = await prov.getBalance(addr);
      setBalance(ethers.formatEther(rawBalance));

      const gasPrice = await prov.getFeeData();
      if (gasPrice?.gasPrice) {
        const estimated = ethers.formatEther(gasPrice.gasPrice * BigInt(21000));
        setGasFee(estimated);
      }
    } catch (err) {
      console.error("Wallet info error:", err);
    }
  };

  useEffect(() => {
    loadWalletInfo();
  }, []);

  const handleSend = async () => {
    try {
      if (!window.ethereum) {
        return setError("wallet", "Wallet not detected");
      }

      if (!ethers.isAddress(recipient)) {
        return setError("address", "Invalid recipient address");
      }

      if (!amount || Number(amount) <= 0) {
        return setError("amount", "Enter a valid amount");
      }

      setErrorType(null);
      setErrorMessage("");
      setSuccessMessage("");
      setTxHash("");

      sendPayment(
        {
          recipient,
          amount,
          message: message || "No message",
        },
        {
          onSuccess: (receipt: any) => {
            setTxHash(receipt.transactionHash);
            setSuccessMessage("Payment sent successfully!");
            setRecipient("");
            setAmount("");
            setMessage("");
            loadWalletInfo();
          },
          onError: (err: any) => {
            setError("transaction", err?.message || "Transaction failed");
          },
        }
      );
    } catch (err: any) {
      setError("transaction", err?.message || "Transaction failed");
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <Card className='w-full max-w-md'>
        <CardHeader className='pb-4'>
          <CardTitle className='font-bold text-2xl text-center'>
            Send Payment
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Wallet Info */}
          <div className='space-y-2 bg-muted/50 p-4 rounded-lg text-sm'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Balance:</span>
              <span className='font-semibold'>
                {balance ? `${Number(balance).toFixed(5)} ETH` : "Loading..."}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Est. Gas Fee:</span>
              <span className='font-semibold'>
                {gasFee ? `${Number(gasFee).toFixed(6)} ETH` : "—"}
              </span>
            </div>
          </div>

          <div className='space-y-3'>
            <Input
              placeholder='Recipient Address'
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setErrorType(null);
              }}
              className='rounded-lg'
              disabled={loading}
            />

            <Input
              placeholder='Amount (SCT)'
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrorType(null);
              }}
              className='rounded-lg'
              disabled={loading}
              type='number'
              step='0.0001'
            />

            <Input
              placeholder='Message (optional)'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrorType(null);
              }}
              className='rounded-lg'
              disabled={loading}
            />
          </div>

          {/* Error Block */}
          {errorType && (
            <div className='flex gap-3 bg-red-50 dark:bg-red-950/30 p-3 border border-red-200 dark:border-red-800 rounded-lg'>
              <AlertCircle className='mt-0.5 w-5 h-5 text-red-600 dark:text-red-400 shrink-0' />
              <div className='flex-1'>
                <p className='font-medium text-red-900 dark:text-red-200 text-sm'>
                  {errorType === "wallet" && "Wallet Error"}
                  {errorType === "address" && "Invalid Address"}
                  {errorType === "amount" && "Invalid Amount"}
                  {errorType === "transaction" && "Transaction Error"}
                </p>
                <p className='mt-1 text-red-800 dark:text-red-300 text-xs wrap-break-words'>
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className='flex gap-3 bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800 rounded-lg'>
              <CheckCircle className='mt-0.5 w-5 h-5 text-green-600 dark:text-green-400 shrink-0' />
              <div>
                <p className='font-medium text-green-900 dark:text-green-200 text-sm'>
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Pending */}
          {txHash && !successMessage && (
            <div className='flex gap-3 bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <Clock className='mt-0.5 w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='font-medium text-blue-900 dark:text-blue-200 text-sm'>
                  Confirming transaction...
                </p>
                <p className='mt-1 font-mono text-blue-800 dark:text-blue-300 text-xs break-all'>
                  {txHash}
                </p>
              </div>
            </div>
          )}

          {/* Button */}
          <Button
            onClick={handleSend}
            className='rounded-lg w-full h-10 font-medium'
            disabled={loading || !recipient || !amount}
          >
            {loading ? "Sending..." : "Send Payment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
