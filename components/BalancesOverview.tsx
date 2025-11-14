"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const balanceData = [
  {
    id: 1,
    type: "Available Balance",
    amount: "₦2,500,000",
    currency: "NGN",
    color:
      "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900",
    borderColor: "border-green-200 dark:border-green-700",
    icon: "💰",
  },
  {
    id: 2,
    type: "Pending Balance",
    amount: "₦750,000",
    currency: "NGN",
    color:
      "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900 dark:to-amber-900",
    borderColor: "border-yellow-200 dark:border-yellow-700",
    icon: "⏳",
  },
  {
    id: 3,
    type: "Reserved Balance",
    amount: "₦300,000",
    currency: "NGN",
    color:
      "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900",
    borderColor: "border-blue-200 dark:border-blue-700",
    icon: "🔒",
  },
  {
    id: 4,
    type: "Total Balance",
    amount: "₦3,550,000",
    currency: "NGN",
    color:
      "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900",
    borderColor: "border-purple-200 dark:border-purple-700",
    icon: "📊",
  },
];

export default function BalancesOverview() {
  return (
    <div className='space-y-6'>
      {/* Balance Cards */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {balanceData.map((balance) => (
          <Card
            key={balance.id}
            className={`${balance.color} border-2 ${balance.borderColor} dark:text-gray-100`}
          >
            <CardContent className='p-6'>
              <div className='space-y-2'>
                <p className='font-medium text-gray-600 dark:text-gray-300 text-sm'>
                  {balance.type}
                </p>
                <h2 className='font-bold text-gray-700 dark:text-gray-100 text-2xl'>
                  {balance.amount}
                </h2>
                <p className='text-gray-500 dark:text-gray-400 text-xs'>
                  {balance.currency}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Breakdown */}
      <Card className='bg-white dark:bg-[#1F1F1F] border-gray-200 dark:border-gray-700'>
        <CardHeader>
          <CardTitle className='text-gray-700 dark:text-gray-100'>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[
              {
                label: "Inflow",
                amount: "+₦1,250,000",
                change: "+15.2%",
                positive: true,
              },
              {
                label: "Outflow",
                amount: "-₦450,000",
                change: "-8.3%",
                positive: false,
              },
              {
                label: "Fees",
                amount: "-₦12,500",
                change: "-2.1%",
                positive: false,
              },
              {
                label: "Net",
                amount: "+₦787,500",
                change: "+5.2%",
                positive: true,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className='flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'
              >
                <div>
                  <p className='font-medium text-gray-700 dark:text-gray-100'>
                    {item.label}
                  </p>
                  <p className='text-gray-500 dark:text-gray-400 text-sm'>
                    This Month
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-gray-700 dark:text-gray-100'>
                    {item.amount}
                  </p>
                  <div className='flex justify-end items-center gap-1'>
                    <TrendingUp
                      size={14}
                      className={
                        item.positive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    />
                    <span
                      className={
                        item.positive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                      style={{ fontSize: "12px" }}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
