import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({
  allDonorsBloodGroup,
}: {
  allDonorsBloodGroup: { bloodGroup: string; count: number }[] | [];
}) {
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>All Donors Blood Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={allDonorsBloodGroup}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="bloodGroup"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <p>Blood Group Distribution of all Registered Donors</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Donors Blood Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={allDonorsBloodGroup}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="bloodGroup"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <p>Blood Group Distribution of all Registered Donors</p>
        </CardFooter>
      </Card>
    </div>
  );
}
