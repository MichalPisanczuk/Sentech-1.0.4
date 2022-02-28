import React from "react";
import { Link } from "react-router-dom";
import "../components/SearchResults.css";
import { useTranslation } from "react-i18next";

function SearchResults(props) {
  const { t } = useTranslation();
  let searchResult = [];

  if (props.partId) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Przewody == props.partId;
    });
  }
  if (props.partId && searchResult.length === 0) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Przewody_miedziane == props.partId;
    });
  }
  if (props.partId && searchResult.length === 0) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Cewka == props.partId;
    });
  }
  if (props.partId && searchResult.length === 0) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Zestaw_naprawczy == props.partId;
    });
  }
  if (props.partId && searchResult.length === 0) {
    searchResult = props.allCarsArray.filter((itemOryginalPart) => {
      return itemOryginalPart.Listwa == props.partId;
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
        <div className='col'>{t("Make")}</div>
        <div className='col'>{t("Model")}</div>
        <div className='col'>{t("Engine")}</div>
        <div className='col'>{t("Year")}</div>
        <div className='col'>{t("Power")}</div>
        <div className='col'>{t("Wires")}</div>
        <div className='col'>{t("Copper_Wires")}</div>
        <div className='col'>{t("Coils")}</div>
        <div className='col'>{t("Repair_Kit")}</div>
        <div className='col'>{t("Bar")}</div>
      </div>

      <div>
        {searchResult.map((item, index) => {
          if (item.Rok_od === undefined) item.Rok_od = "";
          if (item.Rok_do === undefined) item.Rok_do = "";

          return (
            <div className={props.selectedCarMake || props.partId ? "" : "hidden"} key={index.toString()}>
              <div className={index % 2 === 0 ? "result-data row" : "result-data row even"}>
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
                  <span className={item.Przewody_miedziane ? "result-link" : ""}>
                    <Link to={`/details/copperwires/${item.Przewody_miedziane}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.Przewody_miedziane}</Link>
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
                  <span className={item.Listwa ? "result-link" : ""}>
                    <Link to={`/details/bar/${item.llistwa}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.Listwa}</Link>
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

export default SearchResults;
