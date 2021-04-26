import React from 'react';

const Country = ({country, weather}) => {
  if (!country || !weather) {
    return (<></>);
  }

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country flag" width="150" height="150"></img>
      <h1>Weather in {country.name}</h1>
      <div><b>temperature: </b>{weather.temperature} Celcius</div>
      <img src={weather.iconUrl} alt="weather icon" />
      <div><b>wind: </b>{weather.wind}</div>
    </>
  );
};

export default Country;
