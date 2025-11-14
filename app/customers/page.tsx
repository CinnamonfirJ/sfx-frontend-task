import { PageHeader } from "@/components/PageHeader";
import CustomersTable from "@/components/CustomersTable";

export default function CustomersPage() {
  return (
    <div className='flex bg-[#F9F9F9]'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <main className='flex-1 overflow-y-auto'>
          <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
            <PageHeader
              title='Customers'
              description='Manage and view customer information'
            />
            <CustomersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
