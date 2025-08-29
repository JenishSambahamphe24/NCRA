import { Pie, PieChart as RechartsPieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

const chartConfig = {
  Male: {
    label: "Male",
    color: "#022B69",
  },
  Female: {
    label: "Female",
    color: "#EC4899",
  },
  Others: {
    label: "Others",
    color: "#10B981",
  },
} satisfies ChartConfig;

export function MemberDistributionPieChart({ data }: PieChartProps) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
      <RechartsPieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </RechartsPieChart>
    </ChartContainer>
  );
}
