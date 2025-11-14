import { PageHeader } from "@/components/PageHeader";
import BalancesOverview from "@/components/BalancesOverview";

export default function BalancesPage() {
  return (
    <div className='flex bg-[#F9F9F9] h-screen'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <main className='flex-1 overflow-y-auto'>
          <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
            <PageHeader
              title='Balances'
              description='View your account balances and reserves'
            />
            <BalancesOverview />
          </div>
        </main>
      </div>
    </div>
  );
}
