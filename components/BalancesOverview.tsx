"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

const balanceData = [
  {
    id: 1,
    type: "Available Balance",
    amount: "₦2,500,000",
    currency: "NGN",
    color: "bg-gradient-to-r from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    icon: "💰",
  },
  {
    id: 2,
    type: "Pending Balance",
    amount: "₦750,000",
    currency: "NGN",
    color: "bg-gradient-to-r from-yellow-50 to-amber-50",
    borderColor: "border-yellow-200",
    icon: "⏳",
  },
  {
    id: 3,
    type: "Reserved Balance",
    amount: "₦300,000",
    currency: "NGN",
    color: "bg-gradient-to-r from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    icon: "🔒",
  },
  {
    id: 4,
    type: "Total Balance",
    amount: "₦3,550,000",
    currency: "NGN",
    color: "bg-gradient-to-r from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    icon: "📊",
  },
];

export default function BalancesOverview() {
  return (
    <div className='space-y-6'>
      {/* Balance Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {balanceData.map((balance) => (
          <Card key={balance.id} className={`${balance.color} border-2 ${balance.borderColor}`}>
            <CardContent className='p-6'>
              <div className='space-y-2'>
                <p className='text-gray-600 text-sm font-medium'>{balance.type}</p>
                <h2 className='text-2xl font-bold text-gray-900'>{balance.amount}</h2>
                <p className='text-gray-500 text-xs'>{balance.currency}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Breakdown */}
      <Card className='border-gray-200'>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[
              { label: "Inflow", amount: "+₦1,250,000", change: "+15.2%", positive: true },
              { label: "Outflow", amount: "-₦450,000", change: "-8.3%", positive: false },
              { label: "Fees", amount: "-₦12,500", change: "-2.1%", positive: false },
              { label: "Net", amount: "+₦787,500", change: "+5.2%", positive: true },
            ].map((item, idx) => (
              <div key={idx} className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
                <div>
                  <p className='font-medium text-gray-900'>{item.label}</p>
                  <p className='text-sm text-gray-500'>This Month</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-gray-900'>{item.amount}</p>
                  <div className='flex items-center gap-1 justify-end'>
                    <TrendingUp size={14} className={item.positive ? "text-green-600" : "text-red-600"} />
                    <span className={item.positive ? "text-green-600" : "text-red-600"} style={{ fontSize: "12px" }}>
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
