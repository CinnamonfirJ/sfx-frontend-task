"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const customerData = [
  {
    id: "CUST001",
    name: "Peter Japhet",
    email: "peter@example.com",
    phone: "+234 801 234 5678",
    totalVolume: "₦2,500,000",
    transactions: 45,
  },
  {
    id: "CUST002",
    name: "Leo Arome",
    email: "leo@example.com",
    phone: "+234 802 345 6789",
    totalVolume: "₦1,850,000",
    transactions: 32,
  },
  {
    id: "CUST003",
    name: "James Robinson",
    email: "james@example.com",
    phone: "+234 803 456 7890",
    totalVolume: "₦3,200,000",
    transactions: 58,
  },
  {
    id: "CUST004",
    name: "Lupita Jonah",
    email: "lupita@example.com",
    phone: "+234 804 567 8901",
    totalVolume: "₦950,000",
    transactions: 18,
  },
  {
    id: "CUST005",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    phone: "+234 805 678 9012",
    totalVolume: "₦1,450,000",
    transactions: 28,
  },
];

export default function CustomersTable() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const columns = [
    {
      key: "name",
      label: "Customer",
      render: (name: string) => (
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarFallback className='bg-purple-400 text-white'>
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='font-semibold text-gray-900'>{name}</p>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "totalVolume", label: "Total Volume" },
    {
      key: "transactions",
      label: "Transactions",
      render: (count: number) => (
        <span className='font-semibold text-blue-600'>{count}</span>
      ),
    },
  ];

  return (
    <Card className='p-6 border-gray-200'>
      <DataTable
        columns={columns}
        data={customerData}
        searchPlaceholder='Search by name, email, or phone...'
        itemsPerPage={8}
      />
    </Card>
  );
}
