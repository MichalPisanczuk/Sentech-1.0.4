import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchResultsDetails from "../src/components/SearchResultsDetails";
import myDataBase from "../src/database.json";
import "./App.css";

let makes = [];
let models = [];
let engines = [];

let localStorageMake = localStorage.getItem("make");
let localStorageModel = localStorage.getItem("model");
let localStorageEngine = localStorage.getItem("engine");

function App() {
  const { t } = useTranslation();

  const [carMake, setCarMake] = useState(localStorageMake);
  const [carModel, setCarModel] = useState(localStorageModel);
  const [carEngine, setCarEngine] = useState(localStorageEngine);

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

  localStorage.setItem("make", carMake);
  localStorage.setItem("model", carModel);
  localStorage.setItem("engine", carEngine);

  return (
    <>
      <div className='container'>
        <div className='page-title'>
          <h2>{t("Catalogue")}</h2>
        </div>
        <div className='search-form'>
          <label htmlFor='makeSelect'>{t("Choice_Make")}:</label>
          <select name='marka' id='marka' className='marka' value={carMake} onChange={(e) => setCarMake(e.target.value)}>
            <option value='undefined' key='undefined' id='makeSelect'>
              {t("Make_Selection")}
            </option>
            {makes.map((markaItem) => {
              return (
                <option key={markaItem} value={markaItem} id='makeSelect'>
                  {markaItem}
                </option>
              );
            })}
          </select>

          <label htmlFor='modelSelect'>{t("Choice_Model")}:</label>
          <select name='car-marka' id='car-marka' className='car-marka' value={carModel} onChange={(e) => setCarModel(e.target.value)}>
            <option value='undefined' key='undefined' id='modelselect'>
              {t("Make_Selection")}
            </option>
            {models.map((modelItem) => {
              return (
                <option key={modelItem} value={modelItem} id='modelselect'>
                  {modelItem}
                </option>
              );
            })}
          </select>

          <label htmlFor='engineSelect'>{t("Choice_Engine")}:</label>
          <select name='car-engine' id='car-engine' className='car-engine' value={carEngine} onChange={(e) => setCarEngine(e.target.value)}>
            <option value='undefined' key='undefined' id='engineSelect'>
              {t("Make_Selection")}
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
        <section className={carEngine !== "null" && carMake !== "null" && carModel !== "null" ? "details-results" : "hidden"}>
          {console.log(carEngine)}
          <SearchResultsDetails carMake={carMake} carModel={carModel} carEngine={carEngine} t={t} />
        </section>
      </div>
    </>
  );
}

export default App;
