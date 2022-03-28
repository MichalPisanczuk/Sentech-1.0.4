import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../components/SearchResults.css";

const crossApiUrl = "https://api-sentech.herokuapp.com/crosses";

let crossQueryExist = false;
let productGroupURL = "";

function CrossSearchResult(props) {
  const { t } = useTranslation();
  const [crossLoaded, setCrossLoaded] = useState(false);
  const [crossesArray, setCrossesArray] = useState([]);
  let match = false;

  if (props.loading === false && crossLoaded === false) {
    axios
      .get(crossApiUrl)
      .then((response) => {
        setCrossesArray(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) console.log("API not found");
        }
      })
      .finally(() => {
        setCrossLoaded(true);
      });
  }

  if (props.crossPartId !== "") {
    crossQueryExist = true;
  } else {
    crossQueryExist = false;
  }

  return (
    <div>
      <h4>
        {crossQueryExist ? t("Search results") : ""} {props.crossPartId}
      </h4>
      {crossQueryExist
        ? crossesArray.map((item, index) => {
            // if (JSON.stringify(item).includes(props.crossPartId)) {
            console.log(JSON.stringify(item).toLowerCase().trim());
            if (JSON.stringify(item).toLowerCase().replaceAll("-", "").replaceAll(" ", "").includes(props.crossPartId.toLowerCase().replaceAll("-", "").replaceAll(" ", ""))) {
              switch (item.SENTECH.toString().substring(0, 1)) {
                case "8":
                  productGroupURL = "wires";
                  break;
                case "9":
                  productGroupURL = "copperwires";
                  break;
                case "S":
                  productGroupURL = "coils";
                  break;
                case "T":
                  productGroupURL = "wires";
                  break;
                case "W":
                  productGroupURL = "wires";
                  break;
                case "L":
                  productGroupURL = "bar";
                  break;
              }
              match = true;
              return (
                <div key={index}>
                  <div className='cross-result'>
                    Sentech:
                    <span className='result-link'>
                      <Link to={`/details/${productGroupURL}/${item.SENTECH}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>{item.SENTECH}</Link>
                    </span>
                  </div>
                </div>
              );
            } else {
            }
          })
        : ""}
      <div className={match || !props.crossPartId ? "hidden" : ""}>
        <p>{t("No results")}</p>
      </div>
    </div>
  );
}
export default CrossSearchResult;
