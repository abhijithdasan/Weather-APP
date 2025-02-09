import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import cloud_icon from '../assets/cloud.png';
import sun_icon from '../assets/sun.png';
import moon_icon from '../assets/moon.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snowfall.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const allIcons = {
        "01d": sun_icon,
        "01n": sun_icon,
        "02d": moon_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon 
    };

    const search = async (city) => {
        if (city === "") {
            setAlertMessage('Please enter a city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod !== 200) {
                setAlertMessage(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sun_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
            setAlertMessage("");
        } catch (err) {
            setWeatherData(null);
            setAlertMessage("Error fetching weather data. Please try again.");
            console.error("Error fetching weather data:", err);
        }
    };

    useEffect(() => {
        search('London');
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search(inputRef.current.value);
        }
    };

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search' onKeyPress={handleKeyPress} />
                <FontAwesomeIcon icon={faSearch} className='faSearch' onClick={() => search(inputRef.current.value)} />
            </div>

            {alertMessage && (
                <div className="alert-overlay">
                    <div className="alert-popup">
                        <p>{alertMessage}</p>
                        <button onClick={() => setAlertMessage("")}>Close</button>
                    </div>
                </div>
            )}

            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
                    <p className='temp'>{weatherData.temp}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className='weather-data'>
                        <div className='weather-item'>
                            <img src={humidity_icon} alt='Humidity Icon' className='icon' />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='weather-item'>
                            <img src={wind_icon} alt='Wind Icon' className='icon' />
                            <div>
                                <p>{weatherData.windSpeed} Km/Hr</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className="no-data-message">No weather data available. Please search for a city.</p>
            )}
        </div>
    );
};

export default Weather;