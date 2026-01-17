import { useTransactions } from "@/hooks/budget";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../base/chart";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { formatMoney, formatMoneyShort } from "@/lib/utils";
import { Heading3 } from "../common/heading-3";

export const MonthlySpendLineGraph = () => {
  const { transactions, isError, isLoading, error } = useTransactions();

  const chartData = useMemo(() => {
    const now = new Date();
    const currYear = now.getFullYear();
    const currMonthIndex = now.getMonth();
    const today = now.getDate();

    // prev month calculation
    const prevMonthDate = new Date(currYear, currMonthIndex - 1);
    const prevYear = prevMonthDate.getFullYear();
    const prevMonthIndex = prevMonthDate.getMonth();

    // days in each month
    const daysIncurrMonth = new Date(currYear, currMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(prevYear, prevMonthIndex + 1, 0).getDate();
    const maxDays = Math.max(daysIncurrMonth, daysInPrevMonth);

    const currMonthDaily = new Array(maxDays).fill(0);
    const prevMonthDaily = new Array(maxDays).fill(0);

    if (!transactions || !transactions.length)
      return currMonthDaily.map((_, i) => {
        return { day: i, prev: 0, curr: 0 };
      });

    // aggregate transactions by day
    transactions.forEach((transaction) => {
      const date = new Date(transaction.authorizedDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() - 1;

      if (year === currYear && month === currMonthIndex && day < today)
        currMonthDaily[day] += Math.abs(transaction.amount);
      else if (year === prevYear && month === prevMonthIndex && day < maxDays)
        prevMonthDaily[day] += Math.abs(transaction.amount);
    });

    // build result with cumulative sums
    let prevSum = 0;
    let currSum = 0;

    return Array.from({ length: maxDays }, (_, i) => {
      prevSum += prevMonthDaily[i];
      currSum += currMonthDaily[i];

      return {
        day: i + 1,
        prev: prevSum,
        curr: i >= today ? null : currSum,
      };
    });
  }, [transactions]);

  const chartConfig = {
    prev: {
      label: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
      ).toLocaleString("en-US", { month: "short" }),
      color: "#2563eb",
    },
    curr: {
      label: new Date().toLocaleString("en-US", { month: "short" }),
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <div className="overflow-hidden rounded-md border pl-4 pr-8 pb-4 pt-4">
        <Heading3 content="Monthly Spend" />
        <div className="pt-4 pr-2">
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData}>
              <Line
                dot={false}
                type="monotone"
                dataKey="prev"
                stroke="var(--color-prev)"
                strokeDasharray={2}
                strokeWidth={4}
                isAnimationActive={false}
              />
              <Line
                dot={false}
                type="monotone"
                dataKey="curr"
                stroke="var(--color-curr)"
                strokeWidth={4}
                isAnimationActive={false}
              />
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} interval={1} />
              <YAxis
                dataKey="prev"
                tickFormatter={(val) => formatMoneyShort(val)}
                tickLine={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    valueFormatter={(val) => formatMoney(val)}
                  />
                }
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};
