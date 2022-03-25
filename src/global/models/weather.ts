export type WeatherDayResponse = {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};

export type WeatherForecastData = {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    description: string;
  }[];
};

export type WeatherForecastResponse = {
  daily: WeatherForecastData[];
};
