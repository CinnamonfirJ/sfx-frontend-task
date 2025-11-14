"use client";

import { PageHeader } from "@/components/PageHeader";
import TransactionsTable from "@/components/TransactionsTable";
import { containerVariants } from "@/lib/framerConstants";
import { motion } from "framer-motion";

export default function TransactionsPage() {
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
              title='Transactions'
              description='View and manage all your transactions'
            />
            <TransactionsTable />
          </div>
        </main>
      </div>
    </motion.div>
  );
}
