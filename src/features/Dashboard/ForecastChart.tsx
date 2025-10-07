// src/features/Dashboard/ForecastChart.tsx

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
  // จัดรูปแบบข้อมูลเล็กน้อยเพื่อให้ Recharts อ่านง่ายขึ้น
  const chartData = data.map((day) => ({
    ...day,
    // สร้าง key ใหม่สำหรับแสดงวันที่แบบสั้นๆ ในแกน X
    shortDate: new Date(day.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    // ResponsiveContainer ทำให้กราฟปรับขนาดตามขนาดของ parent container ได้
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
          stroke="#82ca9d" // สีเขียว
          strokeWidth={2}
          name="Net Profit/Loss"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;
