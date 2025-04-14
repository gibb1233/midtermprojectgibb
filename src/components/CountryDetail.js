import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderNames, setBorderNames] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);

        if (data[0].borders?.length) {
          fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(",")}`)
            .then((res) => res.json())
            .then((bordersData) => {
              const names = bordersData.map((c) => ({
                code: c.cca3,
                name: c.name.common,
              }));
              setBorderNames(names);
            });
        } else {
          setBorderNames([]);
        }
      })
      .catch((err) => console.error("Failed to fetch country", err));
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div
      className="country-detail-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#1e3a8a",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="country-card"
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#1f2937",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        <Link to="/" style={{ color: "#93c5fd", fontWeight: "bold" }}>← Back</Link>

        <div className="country-flag-container" style={{ marginTop: "20px" }}>
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="country-flag"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>

        <div className="country-info" style={{ marginTop: "15px" }}>
          <h2>{country.name.common}</h2>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Area:</strong> {country.area} km²</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>

          {borderNames.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Borders:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
                {borderNames.map((border) => (
                  <Link
                    key={border.code}
                    to={`/country/${border.code}`}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2563eb",
                      borderRadius: "5px",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
