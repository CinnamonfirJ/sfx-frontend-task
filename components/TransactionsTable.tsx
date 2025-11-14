"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "@/components/DataTable";

const transactionData = [
  {
    id: "TXN001",
    date: "Mar 14, 2024",
    customer: "John Doe",
    amount: "₦50,000",
    status: "success",
    type: "Payment",
  },
  {
    id: "TXN002",
    date: "Mar 14, 2024",
    customer: "Jane Smith",
    amount: "₦75,500",
    status: "success",
    type: "Deposit",
  },
  {
    id: "TXN003",
    date: "Mar 13, 2024",
    customer: "Bob Johnson",
    amount: "₦30,000",
    status: "pending",
    type: "Transfer",
  },
  {
    id: "TXN004",
    date: "Mar 13, 2024",
    customer: "Alice Brown",
    amount: "₦120,000",
    status: "failed",
    type: "Withdrawal",
  },
  {
    id: "TXN005",
    date: "Mar 12, 2024",
    customer: "Charlie Davis",
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

export default function TransactionsTable() {
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
    <Card className='p-6 border-gray-200'>
      <DataTable
        columns={columns}
        data={transactionData}
        searchPlaceholder='Search by ID, customer, or amount...'
        itemsPerPage={8}
      />
    </Card>
  );
}
