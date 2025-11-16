"use client";

import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { useAccount } from "@/lib/web3/useAccount";
import { useTransactions } from "@/lib/web3/useTransactions";
import { WalletStatus } from "@/components/WalletStatus";

export default function TransactionsTable() {
  const { provider, account } = useAccount();
  const { data, isLoading, refetch } = useTransactions(provider, account);

  const fallbackData = [
    {
      id: "TXN001",
      date: "Mar 14, 2024",
      customer: "Peter Japhet",
      amount: "₦50,000",
      status: "success",
      type: "Payment",
    },
    {
      id: "TXN002",
      date: "Mar 14, 2024",
      customer: "Leo Arome",
      amount: "₦75,500",
      status: "success",
      type: "Deposit",
    },
    {
      id: "TXN003",
      date: "Mar 13, 2024",
      customer: "James Robinson",
      amount: "₦30,000",
      status: "pending",
      type: "Transfer",
    },
    {
      id: "TXN004",
      date: "Mar 13, 2024",
      customer: "Lupita Jonah",
      amount: "₦120,000",
      status: "failed",
      type: "Withdrawal",
    },
    {
      id: "TXN005",
      date: "Mar 12, 2024",
      customer: "Sarah Mitchell",
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
    <div className='space-y-4'>
      <WalletStatus account={account} refresh={refetch} loading={isLoading} />

      <Card className='p-6'>
        <DataTable
          columns={columns}
          data={account && data && data.length > 0 ? data : fallbackData}
          itemsPerPage={8}
          searchPlaceholder='Search transactions...'
        />
      </Card>
    </div>
  );
}
