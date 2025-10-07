import { Machine } from "@src/types";
import { WeatherData } from "@src/services/weatherService";

// กำหนดหน้าตาของข้อมูลพยากรณ์แต่ละวัน
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

  // 1. คำนวณค่าคงที่รายวันที่ไม่ขึ้นกับอากาศ
  const totalDailySales = machines.reduce(
    (sum, m) => sum + m.expectedSalesPerDay,
    0
  );
  const totalDailyRent = machines.reduce((sum, m) => sum + m.rentCostPerDay, 0);
  // คำนวณ Gross Profit รวมจากทุกเครื่อง
  const totalGrossProfit = machines.reduce(
    (sum, m) => sum + m.expectedSalesPerDay * m.averageProfitMarginPercentage,
    0
  );

  // 2. วนลูป 7 วันเพื่อคำนวณค่าที่ขึ้นกับอากาศ
  const forecastData: DailyForecast[] = weather.daily.time.map(
    (date, index) => {
      const minTemp = weather.daily.temperature_2m_min[index];
      const maxTemp = weather.daily.temperature_2m_max[index];
      const avgTemp = (minTemp + maxTemp) / 2;

      // คำนวณค่าไฟรวมของทุกเครื่องในวันนั้นๆ
      const totalElectricityCost = machines.reduce(
        (sum, m) => sum + m.electricCostPerTempPerDay * avgTemp,
        0
      );

      // คำนวณกำไร/ขาดทุนสุทธิของวันนั้น
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
