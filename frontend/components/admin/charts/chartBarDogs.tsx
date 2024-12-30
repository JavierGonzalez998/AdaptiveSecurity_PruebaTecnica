"use client";

import { Bar, BarChart, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  total_dogs_available: {
    label: "perros disponibles",
    color: "#2563eb",
  },
  total_dogs_in_process: {
    label: "perros en proceso de adopcion",
    color: "#2563eb",
  },
  total_dogs_adopted: {
    label: "perros adoptados",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface props {
  chartData: Record<string, string>[];
}

export default function ChartBarDogs({ chartData }: props) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="updated_month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => new Date(new Date(value).setMonth(new Date(value).getMonth() + 1)).toLocaleString('es-CL', {month:"long", year:"numeric"})}
        />
         <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="total_dogs_available"
          fill="var(--color-total_dogs_available)"
          radius={4}
        />
        <Bar
          dataKey="total_dogs_in_process"
          fill="var(--color-total_dogs_in_process)"
          radius={4}
        />
        <Bar
          dataKey="total_dogs_adopted"
          fill="var(--color-total_dogs_adopted)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
