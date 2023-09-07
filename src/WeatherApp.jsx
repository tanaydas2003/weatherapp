import React, { useState } from 'react';
import './WeatherApp.css';
import Photos from './Images/Photos';
import axios from 'axios';

const WeatherApp = () => {
    const [data, setData] = useState({
        celcius: 10 ,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: `${Photos.drizzle}`
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleClick = () =>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2c98f0af415b6d455ca03b93740bc6f8&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds"){
                    imagePath = `${Photos.cloud}`
                }
                else if(res.data.weather[0].main === "Clear"){
                    imagePath = `${Photos.clear}`
                }
                else if(res.data.weather[0].main === "Rain"){
                    imagePath = `${Photos.rain}`
                }
                else if(res.data.weather[0].main === "Drizzle"){
                    imagePath = `${Photos.drizzle}`
                }
                else if(res.data.weather[0].main === "Snow"){
                    imagePath = `${Photos.snow}`
                }
                else if(res.data.weather[0].main === "Night"){
                    imagePath = `${Photos.night}`
                }
                else if(res.data.weather[0].main === "Haze"){
                    imagePath = `${Photos.haze}`
                }
                setData({...data, celcius: res.data.main.temp, name:res.data.name, humidity: res.data.main.humidity, speed:res.data.wind.speed,image:imagePath})
                setError('');         
            })
            .catch(err => {
                if(err.response.status === 404){
                    setError("Invalid City Name");
                }
                else{
                    setError('');
                }
            });
        }
    };
//     // let api_key= "2c98f0af415b6d455ca03b93740bc6f8";
//     const search = () =>{
//         const element = document.getElementsByClassName("cityInput");
//         if(element[0].value===""){
//             return 0;
//         }
//         // let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
//         // let response = await fetch(url);
//         // let data = await response.json();
//         // const humidity = document.getElementsByClassName("humidity");
//     };
    
  return (
    <div className='container'>
        <div className="row">
            <div className='col-md-8 col-8 col-xxl-8 mx-auto'>
                <div className="top-bar"> 
                    <input type="text" className="cityInput" placeholder='Search' onChange={e => setName(e.target.value)} />
                    <div className="search-icon">
                        <img src={Photos.search} alt="" onClick={handleClick} />
                    </div>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="weather-image">
                    <img src={data.image} alt="" />
                </div>
                <div className="weather-temp">{Math.round(data.celcius)}°C</div>
                <div className="weather-location">{data.name}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={Photos.humidity} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percentage">{Math.round(data.humidity)}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={Photos.wind} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity">{Math.round(data.speed)}km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WeatherApp;
