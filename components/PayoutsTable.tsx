"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";

const payoutData = [
  {
    id: "PAYOUT001",
    date: "Mar 14, 2024",
    amount: "₦500,000",
    bank: "First Bank",
    account: "****2847",
    status: "success",
  },
  {
    id: "PAYOUT002",
    date: "Mar 13, 2024",
    amount: "₦750,000",
    bank: "GTBank",
    account: "****5612",
    status: "success",
  },
  {
    id: "PAYOUT003",
    date: "Mar 13, 2024",
    amount: "₦300,000",
    bank: "Access Bank",
    account: "****9823",
    status: "processing",
  },
  {
    id: "PAYOUT004",
    date: "Mar 12, 2024",
    amount: "₦450,000",
    bank: "Zenith Bank",
    account: "****1456",
    status: "success",
  },
  {
    id: "PAYOUT005",
    date: "Mar 11, 2024",
    amount: "₦600,000",
    bank: "First Bank",
    account: "****2847",
    status: "failed",
  },
];

export default function PayoutsTable() {
  const columns = [
    { key: "id", label: "Payout ID" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "bank", label: "Bank" },
    { key: "account", label: "Account" },
    {
      key: "status",
      label: "Status",
      render: (status: string) => <StatusBadge status={status as any} />,
    },
  ];

  return (
    <Card className='p-6 border-gray-200'>
      <DataTable
        columns={columns}
        data={payoutData}
        searchPlaceholder='Search by payout ID, bank, or amount...'
        itemsPerPage={8}
      />
    </Card>
  );
}
