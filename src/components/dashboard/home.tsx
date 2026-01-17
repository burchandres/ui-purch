import { useTransaction, useTransactions } from "@/hooks/budget";
import type { FC } from "react";
import { MonthlySpendLineGraph } from "../charts/monthly-spend-line-graph";

export const Home: FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <MonthlySpendLineGraph />
    </div>
  );
};
