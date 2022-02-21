import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchResultsDetails from "../src/components/SearchResultsDetails";
import axios from "axios";
import myDataBase from "../src/database.json";
import "./App.css";

let makes = [];
let models = [];
let engines = [];

const apiUrl = "https://api-sentech.herokuapp.com/parts";

function App() {
  const { t } = useTranslation();

  const [carMake, setCarMake] = useState(null);
  const [carModel, setCarModel] = useState(null);
  const [carEngine, setCarEngine] = useState(null);

  const [car, setCar] = useState([]);
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

  const arr = car.map((item, index) => {
    return (
      <p key={item.Id}>
        {item.Marka} - {item.Nazwa} - {item.Moc}
      </p>
    );
  });

  myDataBase.map((post) => {
    makes.push(post.Marka);
    makes = [...new Set(makes)];
  });

  models = [];
  engines = [];
  if (carMake) {
    myDataBase.map((post) => {
      if (post.Marka == carMake) {
        models.push(post.Model);
        models = [...new Set(models)];
      }
    });
  }
  engines = [];
  if (carMake && carModel) {
    myDataBase.map((post) => {
      if (post.Marka == carMake && post.Model == carModel) {
        engines.push(post.Silnik);
        engines = [...new Set(engines)];
      }
    });
  }

  return (
    <>
      <div className='container'>
        <div className='page-title'>
          <h2>{t("Catalogue")}</h2>
        </div>
        <div className='search-form'>
          <div className='first_col'>
            <select name='marka' id='marka' className='car-marka' value={carMake} onChange={(e) => setCarMake(e.target.value)}>
              <option value='undefined' key='undefined' id='makeSelect'>
                {t("Make_Selection_Make")}
              </option>
              {makes.map((markaItem) => {
                return (
                  <option key={markaItem} value={markaItem} id='makeSelect'>
                    {markaItem}
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
            <input name='partno' id='partno' className='partno' placeholder={t("Part number")}></input>
            <input name='replacepartno' id='replacepartno' className='replacepartno' placeholder={t("Replace part number")}></input>
            <button className='search-btn'>{t("Search")}</button>
          </div>
        </div>
        <section className={carEngine !== "null" && carMake !== "null" && carModel !== "null" ? "details-results" : "hidden"}>
          {console.log(carEngine)}
          <SearchResultsDetails carMake={carMake} carModel={carModel} carEngine={carEngine} t={t} />
        </section>
      </div>
      <div>
        <h1>{loading ? "ŁADOWANIE DANYCH..." : ""}</h1>
        <div>{errorMsg}</div>
        <div>{arr}</div>
      </div>
    </>
  );
}

export default App;
