import React from 'react';

const Weather = ({ weatherData }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      {weatherData.weather ? (
        <div className='w-[500px] h-[250px] bg-gray-300 shadow-lg rounded-xl p-6 flex flex-col justify-between'>
          <div className="flex justify-between">
            <div>
              <p className='text-xl font-semibold'>
                {weatherData.name}, {weatherData.sys.country}
              </p>
              <p className='text-sm capitalize'>
                {weatherData.weather[0].description}
              </p>
            </div>
            <div>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" 
              className='w-[80px]' />
            </div>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <h1 className='text-6xl font-semibold'>
              {weatherData.main.temp.toFixed()} °C
            </h1>
            <div className='text-right text-sm space-y-1'>
              <p>Sensação Térmica: <span className='font-semibold'>{weatherData.main.feels_like.toFixed()}°C</span></p>
              <p>Umidade: <span className='font-semibold'>{weatherData.main.humidity} %</span></p>
              <p>Velocidade do Vento: <span className='font-semibold'>{weatherData.wind.speed} KPH</span></p>
              <p>Pressão: <span className='font-semibold'>{weatherData.main.pressure} hPa</span></p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
