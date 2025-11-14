import { PageHeader } from "@/components/PageHeader";
import TransactionsTable from "@/components/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className='flex bg-[#F9F9F9]'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <main className='flex-1 overflow-y-auto'>
          <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
            <PageHeader
              title='Transactions'
              description='View and manage all your transactions'
            />
            <TransactionsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
