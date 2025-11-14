import { PageHeader } from "@/components/PageHeader";
import SettingsPanel from "@/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className='flex bg-[#F9F9F9] dark:bg-[#1F1F1F]'>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <main className='flex-1 overflow-y-auto'>
          <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6'>
            <PageHeader
              title='Settings'
              description='Manage your account and preferences'
            />
            <SettingsPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
