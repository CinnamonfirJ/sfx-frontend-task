"use client";

import { PageHeader } from "@/components/PageHeader";
import CustomersTable from "@/components/CustomersTable";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/framerConstants";

export default function CustomersPage() {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='flex bg-[#F9F9F9] dark:bg-[#1F1F1F]'
    >
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
    </motion.div>
  );
}
