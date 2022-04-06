import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchResults from "./components/SearchResults";
import CrossSearchResult from "./components/CrossSearchResult";
import axios from "axios";
import "./App.css";

let makes = [];
let models = [];
let engines = [];

const apiUrl = "https://api-sentech.herokuapp.com/parts";

function App() {
  const { t } = useTranslation();

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carEngine, setCarEngine] = useState("");
  const [partId, setPartId] = useState("");
  const [crossPartId, setCrossPartId] = useState("");

  const [cars, setCar] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) console.log("API not found");
          setErrorMsg(`API not found ${error.response.status}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  cars.map((item) => {
    makes.push(item.Marka);
    makes = [...new Set(makes)];
    models = [];
    engines = [];
  });

  if (carMake) {
    cars.map((item) => {
      if (item.Marka == carMake) {
        models.push(item.Typ_model);
        models = [...new Set(models)];
        engines = [];
      }
    });
  }

  if (carMake && carModel) {
    cars.map((item) => {
      if (item.Marka == carMake && item.Typ_model == carModel) {
        engines.push(item.Pojemnosc_silnik);
        engines = [...new Set(engines)];
      }
    });
  }

  // useEffect(() => {
  //   if (partId.length > 2) {
  //     const timeOut = setTimeout(() => setPartId(partId), 2000);
  //     return () => clearTimeout(timeOut);
  //   }
  // }, [partId]);

  // useEffect(() => {
  //   if (crossPartId.length > 2) {
  //     const timeOut = setTimeout(() => setCrossPartId(crossPartId), 2000);
  //     return () => clearTimeout(timeOut);
  //   }
  // }, [crossPartId]);

  return (
    <>
      <div className='container'>
        <div className='message'>
          <h1>{loading ? t("loading") : ""}</h1>
          <p>{loading ? t("loading info") : ""}</p>
          <div>{errorMsg}</div>
        </div>
        <div className='page-title'>
          <h2>{t("Catalogue")}</h2>
        </div>
        <div className='search-form'>
          <div className='first_col'>
            <select
              name='marka'
              id='marka'
              className='car-marka'
              value={carMake}
              onChange={(e) => {
                setCarMake(e.target.value);
                setPartId("");
              }}
            >
              <option value='undefined' key='undefined' id='makeSelect'>
                {t("Make_Selection_Make")}
              </option>
              {makes.map((makeItem) => {
                return (
                  <option key={makeItem} value={makeItem} id='makeSelect'>
                    {makeItem}
                  </option>
                );
              })}
            </select>

            <select name='car-marka' id='car-marka' className='car-model' value={carModel} onChange={(e) => setCarModel(e.target.value)}>
              <option value='undefined' key='undefined' id='modelselect'>
                {t("Make_Selection_Model")}
              </option>
              {models.map((modelItem) => {
                return (
                  <option key={modelItem} value={modelItem} id='modelselect'>
                    {modelItem}
                  </option>
                );
              })}
            </select>

            <select name='car-engine' id='car-engine' className='car-engine' value={carEngine} onChange={(e) => setCarEngine(e.target.value)}>
              <option value='undefined' key='undefined' id='engineSelect'>
                {t("Make_Selection_Engine")}
              </option>
              {engines.map((engineItem) => {
                return (
                  <option key={engineItem} value={engineItem} id='engineSelect'>
                    {engineItem}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='second_col'>
            <div>
              <h4>{t("Find a product")}</h4>
            </div>
            <div>
              <input
                name='partno'
                id='partno'
                className='partno'
                placeholder={t("Part number")}
                value={partId}
                onChange={(e) => {
                  setPartId(e.target.value);
                  setCarMake("");
                  setCarModel("");
                  setCarEngine("");
                  setCrossPartId("");
                }}
              />
              <input
                name='replacepartno'
                id='replacepartno'
                className='replacepartno'
                value={crossPartId}
                placeholder={t("Replace part number")}
                onChange={(e) => {
                  setCrossPartId(e.target.value);
                  setPartId("");
                }}
              />
            </div>
          </div>
        </div>
        <section className='details-results'>
          {(partId.length > 2 || carMake || carModel || carEngine) && (
            <SearchResults selectedCarMake={carMake} selectedCarModel={carModel} selectedCarEngine={carEngine} allCarsArray={cars} partId={partId} t={t} />
          )}
          {crossPartId.length > 2 && <CrossSearchResult crossPartId={crossPartId} loading={loading} partsArray={cars} />}
        </section>
      </div>
    </>
  );
}
export default App;
