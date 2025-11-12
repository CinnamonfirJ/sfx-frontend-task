import BarChartComponent from "@/components/BarChartComponent";
import MessagesStatsComponent from "@/components/MessagesStatsComponent";
import PaymentIssuesChart from "@/components/PaymentIssuesChart";
import RadialChartComponent from "@/components/RadialChartComponent";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full'>
      <div className='flex lg:flex-row flex-col justify-center gap-4 mx-auto max-w-[1600px]'>
        {/* Main Content Area */}
        <div className='flex flex-col flex-1 gap-4 sm:gap-5 lg:gap-6'>
          {/* Header Section */}
          <div className='space-y-2 sm:space-y-3'>
            <h3 className='font-bold text-[#FFA14E] text-base sm:text-lg'>
              👋 Hey Martins!
            </h3>
            <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl leading-tight'>
              You earned NGN 3,000,000 this month.
            </h1>
          </div>

          <div className='inline-flex items-center gap-3 px-3 py-1.5 font-semibold text-[#828282]'>
            <span>Last 30 days</span>
            <div className='flex justify-center items-center bg-[#FAF2FF] rounded-md w-7 h-7'>
              <ChevronDownIcon className='fill-[#BB6BD9] text-sm' />
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className='w-full'>
            <BarChartComponent />
          </div>

          {/* Two Column Charts Section */}
          <div className='gap-4 sm:gap-6 grid grid-cols-1 xl:grid-cols-2'>
            <div className='bg-white rounded-lg overflow-hidden'>
              <RadialChartComponent />
            </div>
            <div className='bg-white rounded-lg overflow-hidden'>
              <PaymentIssuesChart />
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className='w-full lg:w-80 xl:w-96 shrink-0'>
          <MessagesStatsComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
