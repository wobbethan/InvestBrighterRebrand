"use client";
import { Company, $Enums } from "@prisma/client";
import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  companies: Company[];
};

const CompaniesGraph = ({ companies }: Props) => {
  // Step 1: Get all possible enum values
  const industries = Object.values($Enums.Industries);

  // Step 2: Count the occurrences of each industry in the companies list
  const industryCounts = industries.map((industry) => {
    const count = companies.filter(
      (company) => company.industry === industry
    ).length;
    return { industry, count };
  });

  // Step 3: Format the data for the chart
  const chartData = industryCounts.map(({ industry, count }) => ({
    industry,
    count,
  }));

  const chartConfig = {
    desktop: {
      label: "Companies",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Industry Distribution</CardTitle>
        <CardDescription>
          Showing the number of companies in each industry
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="industry" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {companies.length} companies in this section
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompaniesGraph;
