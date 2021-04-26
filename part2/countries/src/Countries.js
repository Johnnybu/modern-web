import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Country from './Country';

const Countries = ({countries, country, setCountry}) => {
  const [weather, setWeather] = useState(undefined);
  
  useEffect(() => {
    if (countries.length === 1) {
      if (country?.alpha3Code !== countries[0].alpha3Code) {
        setCountry(countries[0]);
      }
    }
  }, [country, countries, setCountry]);

  useEffect(() => {
    if (!country) {
      return;
    }

    const api_key = process.env.REACT_APP_API_KEY;
    axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: api_key,
        query: country?.name
      }
    }).then(result => {
      const weatherData = {
        temperature: result.data.current.temperature,
        iconUrl: result.data.current.weather_icons[0],
        wind: `${result.data.current.wind_speed} mph direction ${result.data.current.wind_dir}`
      };
      setWeather(weatherData);
    })
  }, [country]);
  
  const handleShowClick = (index) => {
    setCountry(countries[index]);
  };

  if (Array.isArray(countries) && !countries.length) {
    return <></>;
  }
  
  if (countries.length > 10) {
    return (
      <div>
          Too many matches, specify another filter
      </div>
    );
  } else if (countries.length > 1) {
    return (
      <>
        <ul>
            {countries.map((country, index) => <li key={country.alpha3Code}>{country.name} <button onClick={() => handleShowClick(index)}>show</button> </li>)}
        </ul>
        <Country country={country} weather={weather} />
      </>
    );
  } else {
    return (<Country country={country} weather={weather} />);
  }
};

export default Countries;
