import React from 'react';

const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kochi", "Hyderabad", "Kolkata", "Jaipur", "Lucknow", "Pune"];

function Header() {
  return (
    <div className="header">
      <table>
        <thead>
          <tr>
            <th>Flights are available for the specified cities between 01-05-2023 and 30-06-2023 </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="city-container">
                {cities.map((city) => (
                  <div key={city} className="city">{city}</div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Header;

