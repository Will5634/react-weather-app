import React, { useState } from "react";


const api = {
  key :"42089a8e0aa948cae36c07098e7a6b7b",
  base :"https://api.openweathermap.org/data/2.5/"
}


function App() {

  let date = String(new window.Date())
  date = date.slice(0,15)
  
  const[query, setQuery] = useState('');
  const [weather, setWeather]=useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then (res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)

      });
    }
  } 
  



  return (
    <div className={(typeof weather.main != "undefined") ?
     ((weather.main.temp > 16) ? 'app warm' : 'app') 
     : 'app'}>
      <main>
     <div className="search-box">
      <input type="text"  
      placeholder="Search..."
       className="search-bar"
       onChange={e => setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
       />

     </div>

     {(typeof weather.main != "undefined") ? (
        <div>
     <div className="location-box">
      <div className="location">{weather.name}, {weather.sys.country}</div>
      <div className="date">{date}</div>
     </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°c  </div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
      </div>
      ) : ('')}
     </main>
    </div>
    
  );
}

export default App;



