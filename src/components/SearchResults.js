import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/SearchResults.css";

function searchResults(props) {
  let searchResult = [props.allCarsArray];

  if (props.partId) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Przewody == props.partId;
    });
  }
  if (props.selectedCarMake) {
    searchResult = props.allCarsArray.filter((itemMake) => {
      return itemMake.Marka == props.selectedCarMake;
    });
  }
  if (props.selectedCarModel) {
    searchResult = props.allCarsArray.filter((itemMake) => {
      return itemMake.Typ_model == props.selectedCarModel && itemMake.Marka == props.selectedCarMake;
    });
  }
  if (props.selectedCarEngine) {
    searchResult = props.allCarsArray.filter((itemMake) => {
      return itemMake.Typ_model == props.selectedCarModel && itemMake.Marka == props.selectedCarMake && itemMake.Pojemnosc_silnik == props.selectedCarEngine;
    });
  }

  return (
    <div className='result-grid'>
      <div className={props.selectedCarMake || props.partId ? "result-title row" : "hidden"}>
        <div className='col'>{props.t("Make")}</div>
        <div className='col'>{props.t("Model")}</div>
        <div className='col'>{props.t("Engine")}</div>
        <div className='col'>{props.t("Year")}</div>
        <div className='col'>{props.t("Power")}</div>
        <div className='col'>{props.t("Wires")}</div>
        <div className='col'>{props.t("Copper_Wires")}</div>
        <div className='col'>{props.t("Coils")}</div>
        <div className='col'>{props.t("Repair_Kit")}</div>
        <div className='col'>{props.t("Bar")}</div>
      </div>

      <div>
        {searchResult.map((item, index) => {
          if (item.Rok_od === undefined) item.Rok_od = "";
          if (item.Rok_do === undefined) item.Rok_do = "";

          return (
            <div className={props.selectedCarMake || props.partId ? "result-data row" : "hidden"}>
              <div className={index % 2 === 0 ? "result-data row" : "result-data row even"} key={index.toString()}>
                <div className='col'>{item.Marka}</div>
                <div className='col'>{item.Typ_model}</div>
                <div className='col'>{item.Pojemnosc_silnik}</div>
                <div className='col'>{item.Rok_od + " - " + item.Rok_do}</div>
                <div className='col'>{item.Moc}</div>
                <div className='col'>
                  <span className={item.Przewody ? "result-link" : ""}>
                    <Link to={`/details/wires/${item.Przewody}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.Przewody}</Link>
                  </span>
                </div>
                <div className='col'>
                  <span className={item.PrzewodyMiedziane ? "result-link" : ""}>
                    <Link to={`/details/copperwires/${item.PrzewodyMiedziane}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.PrzewodyMiedziane}</Link>
                  </span>
                </div>
                <div className='col'>
                  <span className={item.Cewka ? "result-link" : ""}>
                    <Link to={`/details/coils/${item.Cewka}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.Cewka}</Link>
                  </span>
                </div>
                <div className='col'>
                  <span className={item.Zestaw_naprawczy ? "result-link" : ""}>
                    <Link to={`/details/repairkit/${item.Zestaw_naprawczy}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.Zestaw_naprawczy}</Link>
                  </span>
                </div>
                <div className='col'>
                  <span className={item.llistwa ? "result-link" : ""}>
                    <Link to={`/details/bar/${item.llistwa}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.llistwa}</Link>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default searchResults;
