import { Machine } from "@src/types";
import { WeatherData } from "@src/services/weatherService";

export interface DailyForecast {
  date: string;
  avgTemp: number;
  totalElectricityCost: number;
  netProfitLoss: number;
}

export const calculate7DayForecast = (
  machines: Machine[],
  weather: WeatherData | null
): DailyForecast[] => {
  if (!weather || machines.length === 0) {
    return [];
  }

  // 1. calculate total daily sales, rent, and gross profit
  const totalDailySales = machines.reduce(
    (sum, m) => sum + m.expectedSalesPerDay,
    0
  );
  const totalDailyRent = machines.reduce((sum, m) => sum + m.rentCostPerDay, 0);
  // calculate total gross profit from all machines
  const totalGrossProfit = machines.reduce(
    (sum, m) => sum + m.expectedSalesPerDay * m.averageProfitMarginPercentage,
    0
  );

  // 2. loop 7 days to calculate weather-dependent values
  const forecastData: DailyForecast[] = weather.daily.time.map(
    (date, index) => {
      const minTemp = weather.daily.temperature_2m_min[index];
      const maxTemp = weather.daily.temperature_2m_max[index];
      const avgTemp = (minTemp + maxTemp) / 2;

      // calculate total electricity cost for all machines in that day
      const totalElectricityCost = machines.reduce(
        (sum, m) => sum + m.electricCostPerTempPerDay * avgTemp,
        0
      );

      // calculate net profit/loss for that day
      const netProfitLoss =
        totalGrossProfit - totalDailyRent - totalElectricityCost;

      return {
        date,
        avgTemp,
        totalElectricityCost,
        netProfitLoss,
      };
    }
  );

  return forecastData;
};
