import React, { useEffect, useState } from "react";
import { Machine } from "../../types";
import { Box, Typography, Paper } from "@mui/material";
import {
  fetch7DayWeatherForecast,
  WeatherData,
} from "@src/services/weatherService";

interface DashboardProps {
  machines: Machine[];
}

const Dashboard: React.FC<DashboardProps> = ({ machines }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetch7DayWeatherForecast();
        setWeather(data);
        console.log("Weather data fetched:", data); // ทดสอบดูข้อมูล
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  if (loading) return <Paper sx={{ p: 2 }}>Loading weather forecast...</Paper>;
  if (error) return <Paper sx={{ p: 2 }}>{error}</Paper>;

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Forecaster Dashboard
      </Typography>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </Paper>
  );
};

export default Dashboard;
