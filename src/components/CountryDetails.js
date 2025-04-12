import Flag from './Flag';
import Borders from './Borders';

const CountryDetails = ({ country }) => {
  const {
    name, capital, region, subregion, population, area,
    latlng, borders, timezones, currencies, languages, flags
  } = country;

  return (
    <div className="country-details">
      <h2>{name.common}</h2>
      <Flag flag={flags?.svg} />
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Region:</strong> {region} / {subregion}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
      <p><strong>Coordinates:</strong> {latlng.join(', ')}</p>
      <Borders borders={borders} />
      <p><strong>Timezones:</strong> {timezones.join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.values(currencies || {}).map(c => c.name).join(', ')}</p>
      <p><strong>Languages:</strong> {Object.values(languages || {}).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;