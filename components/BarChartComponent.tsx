"use client";

import React from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#ECCCFF",
  },
} satisfies ChartConfig;

const chartData = [
  { day: "Mar 1-7", earnings: 50000 },
  { day: "Mar 8-14", earnings: 125000 },
  { day: "Mar 15-21", earnings: 125000 },
  { day: "Mar 22-28", earnings: 125000 },
  { day: "Final wk", earnings: 170000 },
];

const BarChartComponent = () => {
  return (
    <ChartContainer config={chartConfig} className='w-full min-h-[200px]'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid
          strokeDasharray={"8 8"}
          stroke='#E0E0E0'
          vertical={false}
        />
        <XAxis
          dataKey='day'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          dataKey='earnings'
          tickLine={true}
          tickMargin={10}
          axisLine={false}
        />
        <Bar
          dataKey={"earnings"}
          fill='var(--color-earnings)'
          radius={[14, 14, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartComponent;
