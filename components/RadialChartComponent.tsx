"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartConfig = {
  successRate: {
    label: "Success Rate",
    color: "#A6D997", // light green for success
  },
  successful: {
    label: "Successful",
    color: "#6FCF97",
  },
  unsuccessful: {
    label: "Unsuccessful",
    color: "#EB5757",
  },
} satisfies ChartConfig;

const chartData = [
  { period: "Mar", successRate: 98, successful: 150, unsuccessful: 1 },
];

const RadialChartComponent = () => {
  return (
    <Card className='flex flex-col rounded-3xl w-full h-full'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-base sm:text-lg'>Success Rate</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col flex-1 px-4 sm:px-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto w-full max-w-[200px] sm:max-w-[250px] aspect-square'
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-250}
            innerRadius={80}
            outerRadius={125}
          >
            <PolarGrid
              gridType='circle'
              radialLines={false}
              stroke='none'
              className='first:fill-[#DFEEDB] last:fill-background'
              polarRadius={[86, 74]}
            />

            <RadialBar
              dataKey='successRate'
              background
              cornerRadius={10}
              fill='var(--color-successRate)'
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-[#89B27C] font-bold text-lg sm:text-xl'
                        >
                          {chartData[0].successRate.toLocaleString()}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        <div className='flex justify-center gap-6 sm:gap-8 mt-6 sm:mt-8 pb-4 w-full text-xs sm:text-sm'>
          <div className='flex flex-col items-center gap-1.5 sm:gap-2'>
            <div className='flex justify-center items-center gap-2 w-full'>
              <span className='bg-[#DFEEDB] rounded-lg w-6 h-6 shrink-0' />
              <span className='font-semibold text-3xl'>
                {chartData[0].unsuccessful}
              </span>
            </div>
            <span className='font-semibold text-[#828282]'>Unsuccessful</span>
          </div>
          <div className='flex flex-col items-center gap-1.5 sm:gap-2'>
            <div className='flex justify-center items-center gap-2 w-full'>
              <span className='bg-[#A6D997] rounded-lg w-6 h-6 shrink-0' />
              <span className='font-semibold text-3xl'>
                {chartData[0].successful}
              </span>
            </div>
            <span className='font-semibold text-[#828282]'>Successful</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadialChartComponent;
