"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from "recharts";

const chartConfig = {
  a: {
    label: "Customer errors",
    color: "#FFBB4F",
  },
  x: {
    label: "Fraud blocks",
    color: "#FFDA93",
  },
  o: {
    label: "Bank errors",
    color: "#FF7576",
  },
  n: {
    label: "System errors",
    color: "#80E0E5",
  },
} satisfies ChartConfig;

const chartData = [
  { category: "a", value: 1, label: "Customer errors", color: "#FFBB4F" },
  { category: "x", value: 5, label: "Fraud blocks", color: "#FFDA93" },
  { category: "o", value: 3, label: "Bank errors", color: "#FF7576" },
  { category: "n", value: 10, label: "System errors", color: "#80E0E5" },
];

const PaymentIssuesChart = () => {
  const totalErrors = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className='flex flex-col rounded-3xl w-full h-full'>
      <CardHeader className='pb-4'>
        <CardTitle className='font-semibold text-gray-900 text-base sm:text-lg'>
          Payment issues
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 px-4 sm:px-6 pb-6'>
        <ChartContainer
          config={chartConfig}
          className='w-full h-[120px] sm:h-[150px]'
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 5, bottom: 0 }}
          >
            <XAxis
              dataKey='category'
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis hide />

            <Bar
              dataKey='value'
              radius={[8, 8, 0, 0]}
              barSize={50}
              maxBarSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey='value'
                position='top'
                formatter={(value: string) => value.toLocaleString()}
                style={{ fill: "#111827", fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>

        <div className='mt-4 mb-2'>
          <p className='text-xs sm:text-sm'>
            <span className='font-medium text-orange-500'>
              Total number of errors:
            </span>{" "}
            <span className='font-bold text-orange-500'>{totalErrors}</span>
          </p>
        </div>

        <div className='space-y-2 mt-4'>
          {chartData.map((item, index) => (
            <div key={index} className='flex items-center gap-2 sm:gap-3'>
              <div
                className='flex justify-center items-center rounded w-5 sm:w-6 h-5 sm:h-6 font-medium text-white text-xs shrink-0'
                style={{ backgroundColor: item.color }}
              >
                {item.category}
              </div>
              <span className='text-gray-600 text-xs sm:text-sm'>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIssuesChart;
