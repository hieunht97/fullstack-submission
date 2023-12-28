import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Detail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  const api = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    weatherService.getWeather(lat, lon, api).then((initialWeather) => {
      setWeather(initialWeather);
    });
  }, []);

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  var temperature = weather.main.temp - 273.15;
  temperature = temperature.toFixed(2);

  const wind = weather.wind.speed;

  const icon = weather.weather[0].icon;
  const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital} <br />
        area {country.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {country.languages &&
          typeof country.languages === "object" &&
          Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
      </ul>
      <img src={`${country.flags.svg}`} className="flags" />
      <h2>Weather in {country.name.common}</h2>
      <div>temparature {temperature} Celcius</div>
      <img src={imgUrl} />
      <div>wind {wind} m/s</div>
      <br />
    </div>
  );
};

const Country = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    console.log(`Clicked ${country.name.common}`);
    setShowDetail(!showDetail);
  };

  return (
    <div>
      {country.name.common} <button onClick={handleClick}>show</button>
      {showDetail && <Detail country={country} />}
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length >= 10) {
    return <div>Too many matches</div>;
  } else if (countries.length <= 10 && countries.length >= 1) {
    return (
      <div>
        {countries.map((country) => (
          <Country key={country.latlng} country={country} />
        ))}
      </div>
    );
  }
};

const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      find countries{" "}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (countries) {
      countryService.getAll().then((initialCountries) => {
        setCountries(initialCountries);
      });
    }
  }, []);

  const matchCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {matchCountries.length === 1 ? (
        <Detail country={matchCountries[0]} />
      ) : (
        <Countries countries={matchCountries} />
      )}
    </div>
  );
};

export default App;
