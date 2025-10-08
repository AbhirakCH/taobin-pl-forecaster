import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DailyForecast } from "@src/features/Dashboard/forecast.helper";

interface ForecastChartProps {
  data: DailyForecast[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  // format data for Recharts
  const chartData = data.map((day) => ({
    ...day,
    // create a new key for the short date on the X axis
    shortDate: new Date(day.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    // ResponsiveContainer makes the chart responsive to the parent container
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="shortDate" />
        <YAxis />
        <Tooltip
          formatter={(value: number) =>
            `฿${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          }
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="netProfitLoss"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Net Profit/Loss"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
