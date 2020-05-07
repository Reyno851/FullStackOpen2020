import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import FilteredCountry from "./components/FilteredCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleInputCountryChange = (event) => {
    console.log(event.target.value);
    setInputCountry(event.target.value);
    if (event.target.value === "") { // If there is no input
      setShowFiltered(false); // Do not show filtered results
    } else {
      setShowFiltered(true); // Else, show filtered results
    }
  };

  var countriesToShow;

  if (showFiltered === false) {
    countriesToShow = ""; // Show nothing if showFiltered state is false
  } else { // Else if there are filtered results to show, 
    var filteredCountries = countries.filter((country) => // Filter out countries based on user input
      country.name.toLowerCase().includes(inputCountry.toLowerCase())
    );

    if (filteredCountries.length > 10) { // If there are more than 10 filtered countries
      countriesToShow = <div> Too many matches, specify another filter </div>; // Prompt user to narrow down search
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) { // Else if there are more than 1 and less than 10 results, show a list of filtered countries
      // Use numericCode as the unique key
      countriesToShow = filteredCountries.map((country) => (
        <div key={country.numericCode}> {country.name} 
        {/* Use setInputCountry() on click to force input field to render selected country.*/}
        <button onClick={ () => {setInputCountry(country.name)}  }> show </button></div>
      ));
    } else if (filteredCountries.length === 1) { // Else if there is only 1 filtered result, show details of that country
      countriesToShow = <FilteredCountry filteredCountryDetails={filteredCountries[0]}/>
    } else { // Else if there is no filtered result, show no results found
      countriesToShow = <div> No results found </div>
    }
  }


  return (
    <div>
      find countries &nbsp;
      <input value={inputCountry} onChange={handleInputCountryChange} />
      {/* Cannot call .map() on countriesToShow here. Possibly because countriesToShow is defined as a blank variable on first rendering */}
      {countriesToShow}
      <button
        onClick={() => {
          console.log(countries);
        }}
      >
        button
      </button>
    </div>
  );
};

export default App;
