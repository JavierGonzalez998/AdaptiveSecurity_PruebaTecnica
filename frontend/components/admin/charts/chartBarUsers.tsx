"use client";

import { Bar, BarChart, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  users_created: {
    label: "users",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface props {
  chartData: Record<string, string>[];
}

export function ChartBarUsers({ chartData }: props) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="creation_month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => new Date(new Date(value).setMonth(new Date(value).getMonth() + 1)).toLocaleString('es-CL', {month:"long", year:"numeric"})}
        />
         <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="users_created"
          fill="var(--color-users_created)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
