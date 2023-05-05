import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';
import Header from './Header';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [flights, setFlights] = useState([]);

  const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kochi", "Hyderabad", "Kolkata", "Jaipur", "Lucknow", "Pune"];

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleAutocomplete = (e, inputType) => {
    const inputValue = e.target.value.toLowerCase();
    let matchedCity = cities.find(city => city.toLowerCase() === inputValue);
    if (matchedCity) {
      if (inputType === 'source') {
        setSource(matchedCity);
      } else {
        setDestination(matchedCity);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      const response = await axios.get(`https://flightbackend11.onrender.com/getflight?source=${source}&destination=${destination}&date=${formattedDate}`);
      setFlights(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="input-box">
        <label className="label">
          Source:
          <div className="input-container">
            <input type="text" className="input-field" value={source} onChange={handleSourceChange} onBlur={(e) => handleAutocomplete(e, 'source')} />
            <ul className="autocomplete">
              {cities
                .filter(city => city.toLowerCase().startsWith(source.toLowerCase()))
                .map(city => (
                  <li key={city} onClick={() => setSource(city)}>
                    {city}
                  </li>
                ))}
            </ul>
          </div>
        </label>
      </div>
      <div className="input-box">
        <label className="label">
          Destination:
          <div className="input-container">
            <input type="text" className="input-field" value={destination} onChange={handleDestinationChange} onBlur={(e) => handleAutocomplete(e, 'destination')} />
            <ul className="autocomplete">
              {cities
                .filter(city => city.toLowerCase().startsWith(destination.toLowerCase()))
                .map(city => (
                  <li key={city} onClick={() => setDestination(city)}>
                    {city}
                  </li>
                ))}
            </ul>
          </div>
        </label>
      </div>
      <div className="input-box">
        <label className="label">
          Date:
          <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <button type="submit" className="search-btn" onClick={handleSubmit}>Search</button>
      <ul>
        {Array.isArray(flights) && flights.map((flight) => (
          <li key={flight._id}>
            {flight.airline} - ₹{flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;














