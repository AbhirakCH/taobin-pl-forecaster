import axios from "axios";

export interface WeatherData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

const API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetch7DayWeatherForecast = async (
  latitude = 13.75,
  longitude = 100.52
): Promise<WeatherData> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        latitude,
        longitude,
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "Asia/Bangkok",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
