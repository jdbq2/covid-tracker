import React, { useState, useEffect } from "react";
import "./sass/app.scss";
import Header from "./Header";
import StatsSection from "./StatsSection";
import Map from "./Map";
import Graph from "./Graph";
import Chart from "./Chart";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelection, setCountrySelection] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 4.570868,
    lng: -74.297333,
  });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const getCountriesData = async (URL) => {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setMapCountries(data);
        setCountries(countries);
      });
  };

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountrySelection(countryCode);
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    getCountriesData("https://disease.sh/v3/covid-19/countries");
  }, []);

  function changeCasesType(event) {
    setCasesType(event.target.dataset.name);
  }

  return (
    <div className="app">
      <div className="app__left">
        <Header
          list={countries}
          handleFormChange={onCountryChange}
          value={countrySelection}
        />
        <h1 style={{ textAlign: "center" }}>TODAY INFO</h1>
        <StatsSection
          active={casesType}
          onClick={changeCasesType}
          todayCases={countryInfo.todayCases}
          cases={countryInfo.cases}
          todayDeaths={countryInfo.todayDeaths}
          deaths={countryInfo.deaths}
          todayRecovered={countryInfo.todayRecovered}
          recovered={countryInfo.recovered}
        />
        <h1>CASES MAP</h1>
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <div className="app__rigth">
        <h1 style={{ textAlign: "center" }}>Top Active Cases by Country</h1>
        <Chart tableData={tableData} />
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          Worldwide New {casesType.charAt(0).toUpperCase() + casesType.slice(1)}
        </h1>
        <Graph casesType={casesType} />
      </div>
    </div>
  );
}

export default App;
