export interface Machine {
  id: number;
  name: string;
  locationType: "SCHOOL" | "SHOPPING MALL" | "HOSPITAL";
  expectedSalesPerDay: number;
  averageProfitMarginPercentage: number;
  rentCostPerDay: number;
  electricCostPerTempPerDay: number;
}
