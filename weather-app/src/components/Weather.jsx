import React from 'react';
import './Weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import cloud_icon from '../assets/cloud.png'
import sun_icon from '../assets/sun.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snowfall.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const weather = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`;
        } catch (err) {
        }
    }

    return (
        <div className='weather'>
            <h1>Weather</h1>
            <div className='search-bar'>
                <input type="text" placeholder='Search' />
                <FontAwesomeIcon icon={faSearch} className='faSearch' />
            </div>
            <img src={sun_icon} alt='' className='weather-icon'/>
            <p className='temp'>16*C</p>
            <p className='location'>London</p>
            <div className='weather-data'>
                <div className='weather-item'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className=''>
                        <p>91 %</p>
                        <span className=''>Humidity</span>
                    </div>
                </div>
                <div className='weather-item'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className=''>
                        <p>3.3 Km/Hr</p>
                        <span className=''>Wind Speed</span>
                    </div>
                </div>
            </div>    
        </div>
    );
};

export default Weather;
