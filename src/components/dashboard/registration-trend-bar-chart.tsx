import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface BarChartData {
  year: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const chartConfig = {
  value: {
    label: "Registrations",
    color: "#022B69",
  },
} satisfies ChartConfig;

export function RegistrationTrendBarChart({ data }: BarChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}
