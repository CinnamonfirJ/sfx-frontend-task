"use client";

import { motion } from "framer-motion";
import BarChartComponent from "@/components/BarChartComponent";
import MessagesStatsComponent from "@/components/MessagesStatsComponent";
import PaymentIssuesChart from "@/components/PaymentIssuesChart";
import RadialChartComponent from "@/components/RadialChartComponent";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { containerVariants, itemVariants } from "@/lib/framerConstants";

const Home = () => {
  return (
    <motion.div
      className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='flex lg:flex-row flex-col justify-center gap-4 mx-auto max-w-[1600px]'>
        {/* Main Content Area */}
        <div className='flex flex-col flex-1 gap-4 sm:gap-5 lg:gap-6'>
          {/* Header Section */}
          <motion.div
            className='space-y-2 sm:space-y-3'
            variants={itemVariants}
          >
            <motion.h3
              className='font-bold text-[#FFA14E] text-base sm:text-lg'
              variants={itemVariants}
            >
              👋 Hey Martins!
            </motion.h3>
            <motion.h1
              className='font-bold text-xl sm:text-2xl lg:text-3xl leading-tight'
              variants={itemVariants}
            >
              You earned NGN 3,000,000 this month.
            </motion.h1>
          </motion.div>

          <motion.div
            className='inline-flex items-center gap-3 px-3 py-1.5 font-semibold text-[#828282] dark:text-[#BDBDBD]'
            variants={itemVariants}
          >
            <span>Last 30 days</span>
            <div className='flex justify-center items-center bg-[#FAF2FF] dark:bg-[#3B1C44] rounded-md w-7 h-7'>
              <ChevronDownIcon className='fill-[#BB6BD9] text-sm' />
            </div>
          </motion.div>

          {/* Bar Chart Section */}
          <motion.div className='w-full' variants={itemVariants}>
            <BarChartComponent />
          </motion.div>

          <motion.div className='gap-4 sm:gap-6 grid grid-cols-1 xl:grid-cols-2'>
            <motion.div
              className='rounded-lg overflow-hidden'
              variants={itemVariants}
            >
              <RadialChartComponent />
            </motion.div>
            <motion.div
              className='rounded-lg overflow-hidden'
              variants={itemVariants}
            >
              <PaymentIssuesChart />
            </motion.div>
          </motion.div>
        </div>

        {/* Sidebar Section */}
        <motion.div
          className='w-full lg:w-80 xl:w-[500px] shrink-0'
          variants={itemVariants}
        >
          <MessagesStatsComponent />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
