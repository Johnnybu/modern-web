import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [country, setCountry] = useState(undefined);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === '') {
      setCountry(undefined);
    }
  };
  
  return(
    <>
      <div>
        find countries <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <Countries 
        countries={countries.filter(country => filter === '' ? true : country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)}
        country={country}
        setCountry={setCountry}
      />
    </>
  );
};

export default App;
