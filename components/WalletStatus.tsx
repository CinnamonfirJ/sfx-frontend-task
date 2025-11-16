"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import SendTransaction from "./SendStarToken";

export function WalletStatus({ account }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className='p-4'>
        <div className='flex sm:flex-row flex-col justify-between sm:items-center gap-4 sm:gap-0'>
          <div>
            <h3 className='font-semibold'>Wallet Status</h3>
            <p className='text-muted-foreground text-sm'>
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Not Connected"}
            </p>
          </div>

          {account && (
            <div className='flex gap-2'>
              <button
                onClick={() => setShowModal(true)}
                className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-medium text-white transition-colors'
              >
                Send
              </button>
              {/* <button
                onClick={refresh}
                disabled={loading}
                className='bg-green-500 hover:bg-green-600 disabled:opacity-50 px-4 py-2 rounded font-medium text-white transition-colors'
              >
                {loading ? "Loading..." : "Refresh"}
              </button> */}
            </div>
          )}
        </div>
      </Card>

      {showModal && (
        <div className='z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4'>
          <Card className='w-full max-w-md'>
            <div className='space-y-4 p-2'>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-muted-foreground hover:text-foreground text-2xl leading-none'
                >
                  ×
                </button>
              </div>
              <SendTransaction />
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
