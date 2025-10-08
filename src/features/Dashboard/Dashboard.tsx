import React, { useEffect, useState, useMemo } from "react";
import { Machine } from "@src/types";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  fetch7DayWeatherForecast,
  WeatherData,
} from "@src/services/weatherService";
import { calculate7DayForecast } from "@src/features/Dashboard/forecast.helper";
import ForecastChart from "@src/features/Dashboard/ForecastChart";

interface DashboardProps {
  machines: Machine[];
}

const Dashboard: React.FC<DashboardProps> = ({ machines }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_LOCATION_TYPE = "N/A";
  const DEFAULT_SALES = 0;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetch7DayWeatherForecast();
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  const bestSellingLocation = useMemo(() => {
    if (machines.length === 0) {
      return { type: DEFAULT_LOCATION_TYPE, sales: DEFAULT_SALES };
    }
    const salesByLocation: { [key: string]: number } = {};
    machines.forEach((machine) => {
      salesByLocation[machine.locationType] =
        (salesByLocation[machine.locationType] || 0) +
        machine.expectedSalesPerDay;
    });

    return Object.entries(salesByLocation).reduce(
      (best, [type, sales]) => {
        return sales > best.sales ? { type, sales } : best;
      },
      { type: DEFAULT_LOCATION_TYPE, sales: DEFAULT_SALES }
    );
  }, [machines]);

  const forecast7Days = useMemo(() => {
    return calculate7DayForecast(machines, weather);
  }, [machines, weather]);

  const weeklySummary = useMemo(() => {
    if (machines.length === 0 || forecast7Days.length === 0) {
      return {
        totalRevenue: 0,
        totalRent: 0,
        totalElectricity: 0,
        netProfit: 0,
      };
    }

    const totalRevenue =
      machines.reduce((sum, m) => sum + m.expectedSalesPerDay, 0) * 7;
    const totalRent =
      machines.reduce((sum, m) => sum + m.rentCostPerDay, 0) * 7;

    const { totalElectricity, netProfit } = forecast7Days.reduce(
      (totals, day) => {
        totals.totalElectricity += day.totalElectricityCost;
        totals.netProfit += day.netProfitLoss;
        return totals;
      },
      { totalElectricity: 0, netProfit: 0 }
    );

    return { totalRevenue, totalRent, totalElectricity, netProfit };
  }, [machines, forecast7Days]);

  if (loading) return <Paper sx={{ p: 2 }}>Loading weather forecast...</Paper>;
  if (error) return <Paper sx={{ p: 2 }}>{error}</Paper>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Forecaster Dashboard
      </Typography>

      <Paper sx={{ padding: 2 }}>
        {machines.length === 0 ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h6">No Data to Display</Typography>
            <Typography color="text.secondary">
              Please add a machine in the Machine Management panel to see the
              forecast.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, backgroundColor: "action.hover" }}>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>Best-Selling Location</strong>
                </Typography>
                <Typography variant="h4" component="p" color="primary">
                  {bestSellingLocation.type}
                </Typography>
                <Typography color="text.secondary">
                  ฿{bestSellingLocation.sales.toLocaleString()} / day
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, backgroundColor: "action.hover" }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  <strong>Cumulative Weekly Forecast</strong>
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Total Revenue:</Typography>
                  <Typography>
                    ฿
                    {weeklySummary.totalRevenue.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Total Rent Cost:</Typography>
                  <Typography>
                    ฿
                    {weeklySummary.totalRent.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Total Electricity Cost:</Typography>
                  <Typography>
                    ฿
                    {weeklySummary.totalElectricity.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                </Box>
                <hr />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="h6">Net Profit/Loss:</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        weeklySummary.netProfit >= 0
                          ? "success.main"
                          : "error.main",
                    }}
                  >
                    ฿
                    {weeklySummary.netProfit.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                <strong>7-Day Forecast</strong>
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <ForecastChart data={forecast7Days} />
              </Paper>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="forecast table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Avg. Temp (°C)</TableCell>
                      <TableCell align="right">Est. Elec. Cost</TableCell>
                      <TableCell align="right">Est. Net P/L</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {forecast7Days.map((day) => (
                      <TableRow key={day.date}>
                        <TableCell component="th" scope="row">
                          {new Date(day.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {day.avgTemp.toFixed(1)}
                        </TableCell>
                        <TableCell align="right">
                          ฿
                          {day.totalElectricityCost.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              day.netProfitLoss >= 0
                                ? "success.main"
                                : "error.main",
                            fontWeight: "bold",
                          }}
                        >
                          ฿
                          {day.netProfitLoss.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
