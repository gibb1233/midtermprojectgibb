import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [populationFilter, setPopulationFilter] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Failed to fetch countries", err));
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesContinent = continent ? country.region === continent : true;
    const matchesPopulation = populationFilter
      ? populationFilter === "low"
        ? country.population < 10000000
        : populationFilter === "medium"
        ? country.population >= 10000000 && country.population <= 50000000
        : country.population > 50000000
      : true;

    return matchesSearch && matchesContinent && matchesPopulation;
  });

  return (
    <div className="App">
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1e3a8a",
          color: "white",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1>🌍 Country Info Explorer</h1>
        <p style={{ marginTop: "5px", fontSize: "14px", opacity: 0.9 }}>
          Search and discover details about every country!
        </p>
      </header>

      {/* Search & Filters */}
      <div className="search-wrapper" style={{ marginTop: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          style={{ padding: "10px", margin: "5px" }}
        >
          <option value="">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctic</option>
        </select>

        <select
          value={populationFilter}
          onChange={(e) => setPopulationFilter(e.target.value)}
          style={{ padding: "10px", margin: "5px" }}
        >
          <option value="">All Population Sizes</option>
          <option value="low">Less than 10 million</option>
          <option value="medium">10M - 50M</option>
          <option value="high">More than 50 million</option>
        </select>
      </div>

      {/* Country Cards */}
      <div className="results-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Link
              to={`/country/${country.cca3}`}
              key={country.cca3}
              className="country-card"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="country-flag-container">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="country-flag"
                />
              </div>
              <div className="country-info">
                <h3 className="country-name">{country.name.common}</h3>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-result">No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
