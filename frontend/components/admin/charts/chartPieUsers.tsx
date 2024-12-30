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

const COLORS = ["#0088FE", "#00C49F"];

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

export default function ChartPieUsers({ data }: props) {
  const chartData = data.map((item) => {
    const key = Object.keys(item)[0]; // Obtener la clave (ej. "users_with_role_2")
    const value = item[key]; // Obtener el valor
    return { name: key, value }; // Cambiar el nombre al formato "Role X"
  });
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
