import React, { useState } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import './App.css';
import Weather from './components/Weather';
import { FaMoon, FaSun } from 'react-icons/fa';

const API_KEY = "2fc14697d1bdc3a76fadcf336e1be37a"; // Substitua pela sua chave API real do OpenWeatherMap

// Componente ThemeSwitcher
const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    document.documentElement.setAttribute('data-theme', nextChecked ? 'dark' : 'light');
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {checked ? <FaMoon /> : <FaSun />}
      <Switch 
        onChange={handleChange} 
        checked={checked} 
        id="theme-switcher"
        offColor="#bbb"
        onColor="#000"
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
      />
    </div>
  );
};

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (query.length > 2) { // Comece a buscar sugestões após 3 caracteres
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
      try {
        const response = await axios.get(url);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setLocation(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.name);
    fetchWeatherData(suggestion.name);
    setSuggestions([]);
  };

  const fetchWeatherData = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}&lang=pt_br`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(location);
      setLocation("");
      setSuggestions([]);
    }
  };

  return (
    <div className='w-full h-full relative'>
      <div className='text-center p-4'>
        <input 
          type="text" 
          className='py-3 px-6 w-full max-w-md md:w-[700px] text-lg rounded-3xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none bg-white dark:bg-gray-800 shadow-md input-class-name' 
          placeholder='Insira sua localização'
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className='suggestions'>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className='suggestion-item'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}, {suggestion.state}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
        <ThemeSwitcher />
      </div>
      <Weather weatherData={data}/>
    </div>
  );
}

export default App;
