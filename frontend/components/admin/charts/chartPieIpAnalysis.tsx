"use client";

import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface props {
  data: Record<string, string | number>[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#A28FFF"];

const chartConfig = {
  users_with_role_2: {
    label: "Usuarios",
    color: "#2563eb",
  },
  users_with_role_3: {
    label: "Voluntarios",
    color: "#000000",
  },
} satisfies ChartConfig;

export default function ChartPieIpAnalysis({ data }: props) {
    const chartData = data.map((item) => ({
        name: item.countryCode || "Unknown", // Si countryCode es null, se usa "Unknown"
        value: item.total_ips, // Usar total_ips como valor para el gráfico
      }));
  return (
    <ChartContainer config={chartConfig}>
      <PieChart width={400} height={400}>
        <ChartTooltip content={<ChartTooltipContent/>}></ChartTooltip>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
